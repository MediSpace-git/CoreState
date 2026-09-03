import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync("shots", { recursive: true });

const browser = await chromium.launch();
const errors = [];

async function run(name, viewport) {
  const page = await browser.newPage({ viewport });
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`[${name}] ${msg.text()}`);
  });
  page.on("pageerror", (err) => errors.push(`[${name}] ${err.message}`));

  await page.goto("http://localhost:3100", { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);
  await page.screenshot({ path: `shots/${name}-01-hero.png` });

  // Scroll gradually so ScrollTriggers fire naturally.
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 300) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(60);
  }
  await page.waitForTimeout(800);

  const anchors = [
    ["02-company", "#company"],
    ["03-products", "#products"],
    ["04-solutions", "#solutions"],
    ["05-industries", "#industries"],
    ["06-technology", "#technology"],
    ["08-process", 'section[aria-label="Process"]'],
    ["09-why-cta", "#contact"],
  ];
  for (const [label, sel] of anchors) {
    await page.evaluate((s) => {
      document.querySelector(s)?.scrollIntoView({ behavior: "instant", block: "start" });
      window.scrollBy(0, -60);
    }, sel);
    await page.waitForTimeout(900);
    await page.screenshot({ path: `shots/${name}-${label}.png` });
  }

  // Pinned ecosystem section: scroll to its pin and step through phases.
  if (viewport.width >= 1024) {
    const pinTop = await page.evaluate(() => {
      const el = document.querySelector("[data-pin]");
      return el ? el.getBoundingClientRect().top + window.scrollY : null;
    });
    if (pinTop !== null) {
      for (const [label, offset] of [
        ["07a", 100],
        ["07b", 1000],
        ["07c", 1900],
        ["07d", 2700],
      ]) {
        await page.evaluate((v) => window.scrollTo(0, v), pinTop + offset);
        await page.waitForTimeout(900);
        await page.screenshot({ path: `shots/${name}-${label}-ecosystem.png` });
      }
    }
  }

  await page.close();
}

await run("desktop", { width: 1440, height: 900 });
await run("mobile", { width: 390, height: 844 });

// Mobile menu open state
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto("http://localhost:3100", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
await page.click('button[aria-controls="mobile-menu"]');
await page.waitForTimeout(900);
await page.screenshot({ path: "shots/mobile-menu.png" });
await page.close();

await browser.close();

if (errors.length) {
  console.log("CONSOLE ERRORS:\n" + errors.join("\n"));
} else {
  console.log("No console errors.");
}
