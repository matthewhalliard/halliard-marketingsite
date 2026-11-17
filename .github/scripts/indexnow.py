#!/usr/bin/env python3
"""Submit this site's sitemap URLs to IndexNow (Bing, Yandex, Seznam, Naver).

Run by .github/workflows/indexnow.yml after each push to main. It:
  1. finds the key file in public/ (a 32-character hex name, <key>.txt),
  2. waits until that file is served on the live site, which proves ownership,
  3. reads the sitemap (following sitemap indexes) and submits every URL on
     this host, in batches of up to 10,000.

The key is public by design: IndexNow checks it against the file on the site.
Settings come from the environment: SITE_HOST (e.g. www.example.com) and
SITEMAP_URL. WAIT_SECONDS gives Vercel time to finish deploying first.
"""
import glob
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request

HOST = os.environ["SITE_HOST"]
SITEMAP_URL = os.environ["SITEMAP_URL"]
WAIT_SECONDS = int(os.environ.get("WAIT_SECONDS", "0"))
UA = {"User-Agent": "indexnow-submit (GitHub Actions)"}


def get(url, timeout=30):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.status, r.read().decode("utf-8", "replace")


def find_key():
    files = [f for f in glob.glob("public/*.txt") if re.fullmatch(r"[0-9a-f]{32}\.txt", os.path.basename(f))]
    if len(files) != 1:
        sys.exit(f"Expected exactly one IndexNow key file in public/, found {len(files)}.")
    key = os.path.basename(files[0])[:-4]
    with open(files[0]) as f:
        if f.read().strip() != key:
            sys.exit("The key file must contain only its own key.")
    return key


def wait_for_key(key):
    url = f"https://{HOST}/{key}.txt"
    for attempt in range(20):  # up to 10 minutes
        try:
            status, body = get(url)
            if status == 200 and body.strip() == key:
                return url
        except urllib.error.URLError:
            pass
        time.sleep(30)
    sys.exit(f"{url} never served the key, so IndexNow would reject the submission.")


def sitemap_urls(url, depth=0):
    _, xml = get(url)
    locs = re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", xml)
    if "<sitemapindex" in xml and depth < 3:
        out = []
        for child in locs:
            out += sitemap_urls(child, depth + 1)
        return out
    return locs


def main():
    key = find_key()
    if WAIT_SECONDS:
        print(f"Waiting {WAIT_SECONDS}s for the deploy to finish.")
        time.sleep(WAIT_SECONDS)
    key_location = wait_for_key(key)
    urls = sorted({u for u in sitemap_urls(SITEMAP_URL) if u.split("/")[2] == HOST})
    if not urls:
        sys.exit(f"No URLs for {HOST} found in {SITEMAP_URL}.")
    print(f"Submitting {len(urls)} URLs for {HOST}.")
    for i in range(0, len(urls), 10000):
        body = json.dumps({"host": HOST, "key": key, "keyLocation": key_location, "urlList": urls[i:i + 10000]}).encode()
        req = urllib.request.Request(
            "https://api.indexnow.org/indexnow",
            data=body,
            method="POST",
            headers={**UA, "Content-Type": "application/json; charset=utf-8"},
        )
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                print(f"IndexNow answered HTTP {r.status} for {len(urls[i:i + 10000])} URLs.")
        except urllib.error.HTTPError as e:
            # 200 and 202 are success; anything else is worth failing the run for.
            sys.exit(f"IndexNow refused the submission: HTTP {e.code} {e.read().decode()[:200]}")


if __name__ == "__main__":
    main()
