import { copyFile, mkdir, rename, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const outputDirectory = join(process.cwd(), "dist", "client");
const routes = ["about", "contact", "legacy-sires", "merch", "training"];
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/^\/+|\/+$/g, "");

if (basePath) {
  const prefixedOutput = join(outputDirectory, basePath);
  await rename(join(prefixedOutput, "_next"), join(outputDirectory, "_next"));
  await rm(prefixedOutput, { recursive: true, force: true });
}

await writeFile(join(outputDirectory, ".nojekyll"), "");

for (const route of routes) {
  const routeDirectory = join(outputDirectory, route);
  await mkdir(routeDirectory, { recursive: true });
  await copyFile(join(outputDirectory, `${route}.html`), join(routeDirectory, "index.html"));
}
