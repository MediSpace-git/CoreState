import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3100", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

// Measure the pin start from the stable wrapper while unpinned at top.
const pinStart = await page.evaluate(() => {
  const el = document.querySelector("[data-eco-pinned]");
  return el.getBoundingClientRect().top + window.scrollY;
});

for (const [label, offset] of [
  ["p1", 150],
  ["p2", 1150],
  ["p3", 1950],
  ["p4", 2750],
]) {
  await page.evaluate((v) => window.scrollTo(0, v), pinStart + offset);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `shots/eco-${label}.png` });
}

await browser.close();
console.log("done");
