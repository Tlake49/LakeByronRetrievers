import { copyFile, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const outputDirectory = join(process.cwd(), "dist", "client");
const routes = ["about", "contact", "merch", "training"];

await writeFile(join(outputDirectory, ".nojekyll"), "");

for (const route of routes) {
  const routeDirectory = join(outputDirectory, route);
  await mkdir(routeDirectory, { recursive: true });
  await copyFile(join(outputDirectory, `${route}.html`), join(routeDirectory, "index.html"));
}

const repository = process.env.GITHUB_REPOSITORY;

if (repository) {
  const [owner, name] = repository.split("/");
  const basePath = name === `${owner}.github.io` ? "" : `/${name}`;

  if (basePath) {
    const replacements = ["/_next", "/images", "/og.png", "/favicon.svg", "/training", "/about", "/contact", "/merch"];

    async function prefixPaths(directory) {
      for (const entry of await readdir(directory, { withFileTypes: true })) {
        const path = join(directory, entry.name);
        if (entry.isDirectory()) {
          await prefixPaths(path);
        } else if (/\.(?:html|rsc)$/.test(entry.name)) {
          let contents = await readFile(path, "utf8");
          for (const rootPath of replacements) {
            contents = contents.replaceAll(rootPath, `${basePath}${rootPath}`);
          }
          await writeFile(path, contents);
        }
      }
    }

    await prefixPaths(outputDirectory);
  }
}
