// Grand Traverse imagery — 12 frames via Higgsfield z_image (~1.8 credits).
// Compositions chosen to be distinct from every existing /public/generated frame.
// Safe to re-run: existing files are skipped.
import { execFile } from "node:child_process";
import { existsSync, writeFileSync, appendFileSync } from "node:fs";
import { promisify } from "node:util";
import sharp from "sharp";

const run = promisify(execFile);
const OUT = "public/generated";
const LOG = "scripts/gen-gt-images.log";

const GRADE =
  "cinematic editorial travel photography, dusk golden-hour light, dark moody warm color grade, sandy amber tones, deep shadows, subtle film grain, anamorphic feel, no text, no watermark";

/** file (without ext) | aspect | subject prompt */
const MANIFEST = [
  ["gt-hero", "16:9", "vast aerial view at dusk of Morocco's landscapes layered in one frame, High Atlas ridgelines dissolving toward distant Sahara dunes, a thin ancient caravan track winding across the entire scene, epic continental scale, sense of a twelve-day journey"],
  ["gt-rabat", "16:9", "Kasbah of the Udayas in Rabat Morocco at dusk, blue and white painted lane descending toward the mouth of the Bou Regreg river, ochre Almohad fortress gate, potted plants, warm lamplight beginning to glow"],
  ["gt-chefchaouen", "16:9", "ornate carved blue wooden door in Chefchaouen Morocco framed by cascading potted flowers on worn indigo steps, a cat sleeping in evening lamplight, hand-woven blankets hanging nearby, intimate quiet"],
  ["gt-volubilis", "16:9", "intact ancient Roman floor mosaic at Volubilis Morocco in raking evening light, geometric patterns and mythological figures in the tiles, fallen columns and triumphal arch soft in the background, wildflowers between the stones"],
  ["gt-fes", "16:9", "courtyard of the Bou Inania Madrasa in Fes Morocco, intricately carved cedar and stucco above green zellige tilework, marble ablution fountain, single warm shaft of late light across the marble floor, no people"],
  ["gt-ziz", "16:9", "inside the Ziz Valley palm grove Morocco at dusk, dense date palms heavy with fruit along ancient irrigation channels, glowing red canyon wall rising behind the oasis, deep green against burning ochre"],
  ["gt-erg-chebbi", "16:9", "elegant white canvas tents of a luxury Sahara camp nestled among towering Erg Chebbi dunes at last light, brass lanterns just lit, a camel caravan arriving over the crest, apricot and rose colored sand"],
  ["gt-todgha", "16:9", "inside the narrowest passage of Todgha Gorge Morocco looking along the canyon floor, sheer limestone walls nearly touching overhead, a ribbon of dusk sky above, shallow clear river reflecting warm stone"],
  ["gt-ait-benhaddou", "16:9", "the ksar of Ait Benhaddou Morocco reflected in the shallow Ounila river at blue hour, stepping stones crossing the water, warm lights glowing in the earthen towers, deep indigo sky"],
  ["gt-marrakech", "16:9", "grand courtyard of the Bahia Palace Marrakech, arcades of carved stucco and painted cedar around a marble court with orange trees, warm evening light raking across zellige tiles, no people"],
  ["gt-essaouira", "16:9", "goats standing improbably in the gnarled branches of an argan tree at golden hour on the coastal road to Essaouira Morocco, dry amber landscape, low warm backlight, surreal and charming"],
  ["gt-casablanca", "16:9", "dramatic upward view from the esplanade of the Hassan II Mosque Casablanca, the 210 metre minaret towering into a dusk sky, intricate tilework arches and titanium doors glowing warm, ocean spray in the air"],
];

const WIDTHS = { "16:9": 1920, "3:4": 1200, "1:1": 1400 };

function quote(s) {
  return `"${s.replace(/"/g, "")}"`;
}

async function generate(name, ar, subject) {
  const file = `${OUT}/${name}.jpg`;
  if (existsSync(file)) {
    log(`skip ${name} (exists)`);
    return true;
  }
  const prompt = `${subject}, ${GRADE}`;
  const cmd = [
    "higgsfield", "generate", "create", "z_image",
    "--prompt", quote(prompt),
    "--aspect_ratio", ar,
    "--wait", "--json",
  ].join(" ");

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const { stdout } = await run(cmd, { shell: true, maxBuffer: 16e6, timeout: 600000 });
      const json = JSON.parse(stdout.slice(stdout.indexOf("[")));
      const url = json[0]?.result_url;
      if (!url) throw new Error(`no result_url, status=${json[0]?.status}`);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`download ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await sharp(buf)
        .resize({ width: WIDTHS[ar] ?? 1920, withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(file);
      log(`ok   ${name}`);
      return true;
    } catch (err) {
      log(`fail ${name} attempt ${attempt}: ${String(err).slice(0, 300)}`);
      await new Promise((r) => setTimeout(r, 4000 * attempt));
    }
  }
  return false;
}

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  appendFileSync(LOG, line);
  process.stdout.write(line);
}

writeFileSync(LOG, "");
let failures = 0;
for (const [name, ar, subject] of MANIFEST) {
  const ok = await generate(name, ar, subject);
  if (!ok) failures++;
}
log(`DONE — ${MANIFEST.length - failures}/${MANIFEST.length} succeeded`);
process.exit(failures > 0 ? 1 : 0);
