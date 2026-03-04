#!/usr/bin/env python3
"""Render an HTML infographic to PNG using Playwright + Chromium."""
import argparse
from playwright.sync_api import sync_playwright

def main():
    parser = argparse.ArgumentParser(description="Render HTML infographic to PNG")
    parser.add_argument("html_path", help="Path to the HTML file")
    parser.add_argument("output_path", help="Path for the output PNG")
    parser.add_argument("--width", type=int, default=1080, help="Viewport width (default: 1080)")
    parser.add_argument("--height", type=int, default=3600, help="Viewport height (default: 3600)")
    parser.add_argument("--wait", type=int, default=3000, help="Wait ms for fonts (default: 3000)")
    args = parser.parse_args()

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": args.width, "height": args.height})
        page.goto(f"file://{args.html_path}")
        page.wait_for_timeout(args.wait)
        page.screenshot(path=args.output_path, full_page=False)
        browser.close()
        print(args.output_path)

if __name__ == "__main__":
    main()
