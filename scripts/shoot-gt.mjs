// Visual QA for the Grand Traverse page + tours hub band.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "scripts/shots";
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();

const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
await page.goto("http://localhost:3000/tours/the-grand-traverse", { waitUntil: "load", timeout: 90000 });
await page.waitForTimeout(3000);
const h = await page.evaluate(() => document.body.scrollHeight);
console.log("gt scrollHeight:", h);
for (const y of [0, 900, 1800, 3000, 4500, 6500, 8500, 10500, 12500, h - 900]) {
  await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: "auto" }), y);
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${OUT}/gt-${Math.round(y)}.png` });
}

await page.goto("http://localhost:3000/tours", { waitUntil: "load", timeout: 90000 });
await page.waitForTimeout(2500);
const h2 = await page.evaluate(() => document.body.scrollHeight);
await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: "auto" }), h2 - 900);
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/gt-hub-band.png` });

const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mob.goto("http://localhost:3000/tours/the-grand-traverse", { waitUntil: "load", timeout: 90000 });
await mob.waitForTimeout(2500);
for (const y of [0, 1600, 5000, 9000]) {
  await mob.evaluate((yy) => window.scrollTo({ top: yy, behavior: "auto" }), y);
  await mob.waitForTimeout(1200);
  await mob.screenshot({ path: `${OUT}/m-gt-${y}.png` });
}

await browser.close();
console.log("done");
