const fs = require("fs").promises;
const path = require("path");
const axios = require("axios");
const { parse } = require("node-html-parser");
const globbyLib = require("globby");
const globby = globbyLib.globby || globbyLib;

// Absolute path to the public directory (one level up from /scripts)
const PUBLIC_DIR = path.resolve(__dirname, "../public");
const MIRROR_DIR = path.join(PUBLIC_DIR, "_framer");

/**
 * Determines whether a URL points to Framer's CDN (and therefore needs mirroring).
 * @param {string} url
 * @returns {boolean}
 */
function needsMirror(url) {
  return /https:\/\/(framerusercontent\.com|app\.framerstatic\.com)/.test(url);
}

/**
 * Download the remote asset if we haven't already, returning the relative URL
 * that should be written into the HTML.
 *
 * @param {string} url Remote CDN URL
 * @returns {Promise<string>} Relative path (starting with /) for local asset
 */
async function downloadAndStore(url) {
  const urlObj = new URL(url);
  const localPath = path.join(MIRROR_DIR, urlObj.pathname); // preserve folders/filenames
  await fs.mkdir(path.dirname(localPath), { recursive: true });

  // Skip download if file already exists
  try {
    await fs.access(localPath);
  } catch {
    console.log("⇣  ", url);
    const resp = await axios.get(url, { responseType: "arraybuffer" });
    await fs.writeFile(localPath, Buffer.from(resp.data));
  }

  // Return browser path (e.g. /_framer/images/foo.jpg)
  return "/" + path.relative(PUBLIC_DIR, localPath).replace(/\\/g, "/");
}

(async () => {
  await fs.mkdir(MIRROR_DIR, { recursive: true });

  const htmlFiles = await globby(["**/*.html"], { cwd: PUBLIC_DIR, absolute: true });

  for (const file of htmlFiles) {
    let changed = false;
    const raw = await fs.readFile(file, "utf8");
    const root = parse(raw, { comment: true });

    const nodes = root.querySelectorAll("[src],[href]");
    for (const node of nodes) {
      const attr = node.getAttribute("src") ? "src" : "href";
      const value = node.getAttribute(attr);
      if (!value || !needsMirror(value)) continue;

      try {
        const local = await downloadAndStore(value);
        node.setAttribute(attr, local);
        changed = true;
      } catch (err) {
        console.error("⚠️  Failed to mirror", value, "->", err.message);
      }
    }

    if (changed) {
      await fs.writeFile(file, root.toString());
      console.log("✔ Rewrote", path.relative(PUBLIC_DIR, file));
    }
  }

  console.log("\nDone! Commit the \"public/_framer\" folder to make the site fully self-hosted.");
})(); 