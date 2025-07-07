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

// Add helper to extract and replace URLs inside raw text (CSS/inline)
/**
 * Replace all Framer CDN URLs inside the given text with local mirrored paths.
 * Downloads any missing assets on-demand.
 *
 * @param {string} text CSS or HTML attribute value containing URLs
 * @returns {Promise<string>} rewritten text with local URLs
 */
async function rewriteInlineUrls(text) {
  const urlRegex = /(https:\/\/(?:framerusercontent\.com|app\.framerstatic\.com)[^"'()\s]+)(?=["')\s])/g;
  const unique = new Set();
  let match;
  while ((match = urlRegex.exec(text)) !== null) {
    unique.add(match[1]);
  }
  const replacements = new Map();
  for (const remote of unique) {
    try {
      const local = await downloadAndStore(remote);
      replacements.set(remote, local);
    } catch (err) {
      console.error("⚠️  Failed to mirror", remote, "->", err.message);
    }
  }
  if (!replacements.size) return text;
  let output = text;
  for (const [remote, local] of replacements) {
    output = output.split(remote).join(local);
  }
  return output;
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

    // ------------------------------------------------------------------
    // 1. Mirror URLs inside <style> elements (e.g. @font-face src, background-image)
    // ------------------------------------------------------------------
    const styleTags = root.querySelectorAll("style");
    for (const styleTag of styleTags) {
      const original = styleTag.innerHTML;
      const rewritten = await rewriteInlineUrls(original);
      if (rewritten !== original) {
        styleTag.set_content(rewritten);
        changed = true;
      }
    }

    // ------------------------------------------------------------------
    // 2. Mirror framer search index JSON referenced via <meta name="framer-search-index" content="...">
    // ------------------------------------------------------------------
    const metaSearch = root.querySelectorAll("meta[name='framer-search-index']");
    for (const meta of metaSearch) {
      const contentUrl = meta.getAttribute("content");
      if (contentUrl && needsMirror(contentUrl)) {
        try {
          const local = await downloadAndStore(contentUrl);
          meta.setAttribute("content", local);
          changed = true;
        } catch (err) {
          console.error("⚠️  Failed to mirror", contentUrl, "->", err.message);
        }
      }
    }

    if (changed) {
      await fs.writeFile(file, root.toString());
      console.log("✔ Rewrote", path.relative(PUBLIC_DIR, file));
    }
  }

  console.log("\nDone! Commit the \"public/_framer\" folder to make the site fully self-hosted.");
})(); 