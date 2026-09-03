import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync("shots", { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  colorScheme: "light",
});
page.on("console", (msg) => {
  if (msg.type() === "error") console.log("ERR", msg.text());
});

await page.goto("http://localhost:3200", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);
await page.screenshot({ path: "shots/light-hero.png" });

await page.evaluate(() =>
  document.querySelector("#products")?.scrollIntoView({ block: "start" })
);
await page.waitForTimeout(800);
await page.screenshot({ path: "shots/light-products.png" });

await page.evaluate(() =>
  document.querySelector("#contact")?.scrollIntoView({ block: "start" })
);
await page.waitForTimeout(800);
await page.screenshot({ path: "shots/light-cta.png" });

await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
await page.click('button[aria-label*="mode"], button[aria-label*="theme"]');
await page.waitForTimeout(600);
await page.screenshot({ path: "shots/toggle-to-dark.png" });

const htmlClass = await page.evaluate(() => document.documentElement.className);
console.log("after toggle:", htmlClass);

await browser.close();
