import { readdir, readFile, stat, unlink, writeFile } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import sharp from "sharp";

const deployRoot = resolve(process.argv[2] ?? "dist/client");
const imageExtensions = new Set([".avif", ".jpeg", ".jpg", ".png", ".webp"]);
const videoExtensions = new Set([".m4v", ".mov", ".mp4", ".webm"]);
const unsupportedVideoExtensions = new Set([".avi", ".mkv", ".wmv"]);
const maxImageWidth = 2560;
const maxVideoBytes = 250 * 1024 * 1024;

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? listFiles(path) : path;
  }));
  return files.flat();
}

function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function optimizeImage(path, extension) {
  const input = await readFile(path);
  let pipeline = sharp(input, { failOn: "warning" }).rotate();
  const metadata = await pipeline.metadata();

  if (metadata.width && metadata.width > maxImageWidth) {
    pipeline = pipeline.resize({ width: maxImageWidth, withoutEnlargement: true });
  }

  if (extension === ".jpg" || extension === ".jpeg") {
    pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true });
  } else if (extension === ".png") {
    pipeline = pipeline.png({ compressionLevel: 9, effort: 10 });
  } else if (extension === ".webp") {
    pipeline = pipeline.webp({ quality: 82, effort: 6 });
  } else if (extension === ".avif") {
    pipeline = pipeline.avif({ quality: 55, effort: 6 });
  }

  const output = await pipeline.toBuffer();
  if (output.length < input.length) {
    await writeFile(path, output);
    return input.length - output.length;
  }
  return 0;
}

function optimizeVideo(path, extension) {
  const temporaryPath = `${path}.optimized${extension}`;
  const webm = extension === ".webm";
  const codecArguments = webm
    ? ["-c:v", "libvpx-vp9", "-crf", "34", "-b:v", "0", "-c:a", "libopus", "-b:a", "128k"]
    : ["-c:v", "libx264", "-crf", "24", "-preset", "medium", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart"];
  const result = spawnSync("ffmpeg", [
    "-hide_banner", "-loglevel", "error", "-y", "-i", path,
    "-map_metadata", "-1", ...codecArguments, temporaryPath,
  ], { encoding: "utf8" });

  if (result.error?.code === "ENOENT") {
    throw new Error("ffmpeg is required when deployment media includes video files.");
  }
  if (result.status !== 0) {
    throw new Error(`Could not optimize ${path}: ${result.stderr.trim()}`);
  }
  return temporaryPath;
}

const files = await listFiles(deployRoot);
let bytesBefore = 0;
let bytesSaved = 0;
let imageCount = 0;
let videoCount = 0;

for (const path of files) {
  const extension = extname(path).toLowerCase();
  if (unsupportedVideoExtensions.has(extension)) {
    throw new Error(`Unsupported web video format in deployment: ${path}`);
  }

  if (imageExtensions.has(extension)) {
    const before = (await stat(path)).size;
    bytesBefore += before;
    bytesSaved += await optimizeImage(path, extension);
    imageCount += 1;
  }

  if (videoExtensions.has(extension)) {
    const before = (await stat(path)).size;
    if (before > maxVideoBytes) {
      throw new Error(`Video exceeds the 250 MB source limit: ${path}`);
    }

    const optimizedPath = optimizeVideo(path, extension);
    const after = (await stat(optimizedPath)).size;
    if (after < before) {
      const optimized = await readFile(optimizedPath);
      await writeFile(path, optimized);
      bytesSaved += before - after;
    }
    await unlink(optimizedPath);
    bytesBefore += before;
    videoCount += 1;
  }
}

console.log(`Optimized ${imageCount} images and ${videoCount} videos for deployment.`);
console.log(`Deployment media: ${formatBytes(bytesBefore)} before, ${formatBytes(bytesSaved)} saved.`);
