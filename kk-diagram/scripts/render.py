#!/usr/bin/env python3
"""Render an HTML diagram to PNG using Playwright + Chromium."""
import argparse, sys
from playwright.sync_api import sync_playwright

def main():
    parser = argparse.ArgumentParser(description="Render HTML diagram to PNG")
    parser.add_argument("html_path", help="Path to the HTML file")
    parser.add_argument("output_path", help="Path for the output PNG")
    parser.add_argument("--width", type=int, default=1080, help="Viewport width (default: 1080)")
    parser.add_argument("--height", type=int, default=3200, help="Viewport height (default: 3200)")
    parser.add_argument("--wait", type=int, default=3000, help="Wait ms for fonts/rendering (default: 3000)")
    parser.add_argument("--full-page", action="store_true", help="Capture full scrollable page")
    args = parser.parse_args()

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": args.width, "height": args.height})
        page.goto(f"file://{args.html_path}")
        page.wait_for_timeout(args.wait)
        page.screenshot(path=args.output_path, full_page=args.full_page)
        browser.close()
        print(args.output_path)

if __name__ == "__main__":
    main()
