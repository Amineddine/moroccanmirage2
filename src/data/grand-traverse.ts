/**
 * The Grand Traverse — the signature 12-day expedition.
 * Presented hors-série: it spans the whole kingdom rather than departing a
 * single meridian city, so it lives outside the CityId system with its own
 * richer day model and a dedicated route at /tours/the-grand-traverse.
 *
 * Distances are shown in miles (US market) per client direction — km originals
 * in comments. Price $4,800 pp sharing set by the client (2026-07-07).
 * Property names Hotel Cherifa (Chefchaouen) & Villa Quieta (Essaouira)
 * corrected per client.
 *
 * ⚠︎ VERIFY before publishing (kept exactly as briefed, not guessed):
 *   - Total distance (~2,400 km / ~1,490 mi) and all per-day drive figures.
 *   - Property names/spellings: Xaluca Erfoud, Sawadi (and that Skoura is the
 *     intended overnight vs. Ouarzazate).
 *   - Entrance-fee policy ("Monument/site entrance fees unless stated").
 */

export type GrandDay = {
  day: number;
  title: string;
  theme: string;
  route: string;
  drive: string;
  body: string;
  highlights: string[];
  meals: string;
  overnight?: { property: string; city: string };
  image?: { src: string; alt: string };
  note?: string;
};

export type GrandStay = {
  city: string;
  nights: number;
  property: string;
  blurb: string;
};

export const GRAND_TRAVERSE = {
  slug: "the-grand-traverse",
  name: "The Grand Traverse",
  subtitle:
    "Twelve days down the spine of Morocco — coast, imperial cities, Sahara & Atlas.",
  days: 12,
  nights: 11,
  dates: "April 1 – April 12, 2027",
  startDate: "2027-04-01", // machine-readable start; per-day dates derive from this

  style: "Private · Tailor-made · Chauffeured",
  priceFrom: 4800,
  currency: "USD",
  priceNote: "per person — final price",
  difficulty:
    "Moderate — comfortable pace with some long but scenic driving days; light optional walking in medinas, gorges and dunes.",
  idealFor:
    "First-time visitors wanting the full country, culture & landscape lovers, photographers, couples, small private groups.",
  bestSeasons: "March–May · September–November",
  seasonsCopy:
    "March–May and September–November (spring adds the Rose Valley bloom; autumn brings clear desert skies). Summer is viable but hot inland/desert; winter is crisp with possible Atlas snow.",
  start: "CMN",
  end: "CMN",
  distanceMi: 1490, // ~2,400 km — ⚠︎ VERIFY exact figure for the final routing
  hero: "/generated/gt-hero.jpg",
  stays: 9,
  regions: [
    "Atlantic Coast",
    "Rif Mountains",
    "Imperial Cities",
    "Middle & High Atlas",
    "Sahara (Erg Chebbi)",
    "Kasbah Road",
    "Marrakech",
    "Essaouira",
  ],
  mapPins: [
    "Casablanca",
    "Rabat",
    "Chefchaouen",
    "Volubilis",
    "Fez",
    "Ifrane",
    "Erfoud",
    "Merzouga",
    "Todgha Gorge",
    "Dadès Valley",
    "Skoura",
    "Ouarzazate",
    "Aït Benhaddou",
    "Marrakech",
    "Essaouira",
    "Casablanca",
  ],
  marquee: [
    "Wander the indigo labyrinth of Chefchaouen, the Blue Pearl of the Rif.",
    "Stand among the Roman mosaics and arches of Volubilis (UNESCO).",
    "Lose a full day inside Fes el-Bali, the largest living medieval medina on earth.",
    "Cross the cedar forests of the Middle Atlas and the palm-lined Ziz Valley.",
    "Ride camels into the dunes of Erg Chebbi and sleep in a luxury desert camp.",
    "Follow the Road of a Thousand Kasbahs through the Todgha Gorge and Dadès Valley.",
    "Explore the earthen ksar of Aït Benhaddou (UNESCO) and cross the Tizi n'Tichka pass.",
    "Dive into the sensory roar of Jemaa el-Fna and the gardens and palaces of Marrakech.",
    "Breathe Atlantic air on the ramparts of Essaouira (UNESCO).",
    "Marvel at the ocean-side Hassan II Mosque in Casablanca.",
  ],
  // Odynovo-style "Notes for Quotation" — shown under the price on the tour page.
  // ⚠︎ VERIFY: client to confirm the "valid before" date before publishing.
  quotation: {
    validBefore: "August 31, 2026",
    payment:
      "A 30% deposit by bank transfer secures your booking — we email you the transfer details once your itinerary is confirmed.",
    notes: [
      "Prices are subject to availability at the time of confirmation and may vary during peak season, festivals and public holidays.",
    ],
  },
} as const;

export const GRAND_DAYS: GrandDay[] = [
  {
    day: 1,
    title: "Arrival & the Capital on the Atlantic",
    theme: "Atlantic Overture",
    route: "Casablanca (arrival) → Rabat",
    drive: "approx. 55 mi / ~1h", // ~90 km — ⚠︎ VERIFY
    body: "Your odyssey begins the moment you land. A Moroccan Mirage host meets you at Casablanca's Mohammed V Airport and your private, air-conditioned vehicle carries you north along the Atlantic to Rabat — Morocco's calm, green, ocean-facing capital, and the most understated of its four imperial cities. The afternoon eases you into the country's rhythm: the Kasbah of the Udayas, a fortified quarter of blue-and-white lanes tumbling toward the mouth of the Bou Regreg river, with its Andalusian garden and café terrace over the water; the Hassan Tower, the truncated minaret of a mosque begun in the 12th century and never finished, presiding over a field of broken columns; and the marble Mausoleum of Mohammed V, guarded by mounted royal sentries. If time allows, the romantic ruins and storks' nests of the Chellah necropolis make a quiet, atmospheric close to the day.",
    highlights: [
      "Kasbah of the Udayas",
      "Hassan Tower",
      "Mausoleum of Mohammed V",
      "Chellah necropolis",
      "Andalusian Gardens",
    ],
    meals: "— (dinner at leisure)",
    overnight: { property: "Riad Kalaa", city: "Rabat" },
    image: {
      src: "/generated/gt-rabat.jpg",
      alt: "Blue-and-white lane of the Kasbah of the Udayas descending toward the Bou Regreg river in Rabat",
    },
  },
  {
    day: 2,
    title: "Into the Blue: Chefchaouen",
    theme: "The Blue Hour",
    route: "Rabat → Chefchaouen",
    drive: "approx. 125 mi / ~4h", // ~200 km — ⚠︎ VERIFY
    body: "This morning we climb from the coast into the Rif Mountains to reach Chefchaouen, the fabled \"Blue Pearl.\" Founded in 1471 as a fortress town, its medina is famously washed in every conceivable shade of indigo, cobalt and sky — a colour tradition whose origins locals variously trace to Andalusian and Jewish heritage, to keeping cool, or simply to beauty. The point isn't the explanation; it's the wandering. You'll drift up stepped alleys hung with flowerpots and hand-woven blankets, past mountain-spring fountains and artisan doorways, to the shady Plaza Uta el-Hammam beneath the red-earth kasbah and octagonal mosque minaret. As the light softens, we climb to the Spanish Mosque viewpoint on the hillside opposite, where the whole blue town glows gold at sunset against the Rif peaks.",
    highlights: [
      "The Blue Medina",
      "Plaza Uta el-Hammam",
      "The Kasbah",
      "Ras El Maa spring",
      "Spanish Mosque viewpoint",
    ],
    meals: "Breakfast",
    overnight: { property: "Hotel Cherifa", city: "Chefchaouen" },
    image: {
      src: "/generated/gt-chefchaouen.jpg",
      alt: "Carved blue doorway with potted flowers on an indigo stairway in Chefchaouen",
    },
  },
  {
    day: 3,
    title: "Roman Echoes & the Spiritual City",
    theme: "Roman Echoes",
    route: "Chefchaouen → Volubilis → (Moulay Idriss) → Fez",
    drive: "approx. 125 mi / ~4h plus sightseeing", // ~200 km — ⚠︎ VERIFY
    body: "Descending south toward the imperial heartland, we make a landmark stop at Volubilis, the best-preserved Roman city in Morocco and a UNESCO World Heritage Site. Once a prosperous provincial capital at the empire's far southwestern edge, it still stands among rolling wheat fields: a triumphal arch, the columns of the basilica and capitol, olive-oil presses, and — most memorably — a series of astonishingly intact floor mosaics depicting Orpheus, Bacchus, Hercules and the seasons, open to the sky where the villas once stood. Nearby rises the sacred, whitewashed pilgrimage town of Moulay Idriss, cradling the tomb of the founder of Morocco's first dynasty. By late afternoon we enter Fez, the country's spiritual and intellectual soul, ready for a full day inside its walls tomorrow.",
    highlights: [
      "Volubilis (UNESCO)",
      "Roman mosaics",
      "Triumphal arch",
      "Moulay Idriss Zerhoun",
      "Arrival in Fez",
    ],
    meals: "Breakfast",
    overnight: { property: "Riad Ahlam", city: "Fez" },
    image: {
      src: "/generated/gt-volubilis.jpg",
      alt: "Roman floor mosaic among the ruins of Volubilis in raking evening light",
    },
  },
  {
    day: 4,
    title: "Inside the Medieval Medina of Fez",
    theme: "The Labyrinth",
    route: "Fez — full day in the medina (Fes el-Bali)",
    drive: "minimal (on foot within the medina)",
    body: "A full, unhurried day inside Fes el-Bali, founded in the 9th century and the largest car-free urban area on earth — a maze of some nine thousand lanes where donkeys still carry the loads. With a licensed local guide you'll navigate to the landmarks that made Fez a medieval capital of learning and craft: the Al-Qarawiyyin, founded in 859 and recognised as the world's oldest continuously operating university; the exquisitely carved cedar, stucco and zellij tilework of the Bou Inania and Al-Attarine madrasas; and the famous Chouara tanneries, where leather is still cured in stone vats of colour exactly as it has been for centuries (you'll be handed a sprig of mint for the view from the terraces above). Between them lie the sensory souks — coppersmiths, weavers, spice pyramids, the call to prayer echoing off the walls.",
    highlights: [
      "Fes el-Bali (UNESCO)",
      "Chouara Tanneries",
      "Al-Qarawiyyin",
      "Bou Inania Madrasa",
      "Artisan souks",
    ],
    meals: "Breakfast",
    overnight: { property: "Riad Ahlam", city: "Fez" },
    image: {
      src: "/generated/gt-fes.jpg",
      alt: "Carved cedar and zellige courtyard of the Bou Inania Madrasa in Fez",
    },
    note: "Interiors of active religious sites (e.g. Al-Qarawiyyin mosque) are generally viewable from the threshold only for non-Muslims.",
  },
  {
    day: 5,
    title: "Across the Atlas to the Desert's Edge",
    theme: "Across the Atlas",
    route: "Fez → Ifrane → Azrou → Midelt → Ziz Valley → Erfoud",
    drive: "approx. 230 mi / ~6.5–7h incl. breaks (a long, spectacular day)", // ~370 km — ⚠︎ VERIFY
    body: "One of the great driving days in Morocco, unspooling through half a dozen landscapes. We cross the Middle Atlas via Ifrane, an incongruous alpine town of pitched roofs and clipped gardens nicknamed the \"Switzerland of Morocco,\" then the cedar forests of Azrou, home to troops of wild Barbary macaques. The road climbs and falls through Berber plateaus and the mining town of Midelt before the terrain turns ochre and lunar. Then comes the highlight: the Ziz Valley, where a single river conjures an unbroken ribbon of tens of thousands of date palms threading between red canyon walls — the classic gateway image of the Sahara. We overnight in Erfoud, the fossil-and-date town on the desert's threshold.",
    highlights: [
      "Ifrane",
      "Azrou cedar forest & macaques",
      "Ziz Valley oasis",
      "Fossil country",
      "Erfoud",
    ],
    meals: "Breakfast",
    overnight: { property: "Xaluca Erfoud", city: "Erfoud" }, // ⚠︎ VERIFY property name/spelling
    image: {
      src: "/generated/gt-ziz.jpg",
      alt: "Date palms of the Ziz Valley oasis beneath glowing red canyon walls",
    },
  },
  {
    day: 6,
    title: "Into the Sea of Sand: Erg Chebbi",
    theme: "Sahara Gold",
    route: "Erfoud → Merzouga → camel trek into Erg Chebbi",
    drive: "approx. 35 mi / ~1h, then camel trek", // ~55 km
    body: "A short transfer brings us to Merzouga and the first sight of Erg Chebbi — a sea of wind-sculpted dunes rising as high as 150 metres, glowing apricot, rose and deep gold as the sun moves. There's time to rest through the heat of the day before the afternoon's centrepiece: as the light lengthens, you mount a camel and your caravan sets off into the sand to a luxury desert camp tucked among the dunes. You'll climb a ridge to watch the sun melt into the horizon, dine under the open sky, and — if the season obliges — fall asleep beneath a Milky Way undimmed by any city light. (Optional add-ons: 4×4 dune driving, sandboarding, a visit to Khamlia's Gnaoua musicians, sunrise over the crest.)",
    highlights: [
      "Erg Chebbi dunes",
      "Camel trek",
      "Desert sunset",
      "Luxury tented camp",
      "Saharan night sky",
    ],
    meals: "Breakfast · Dinner (at the camp)",
    overnight: { property: "Dihya Desert Camp", city: "Merzouga / Erg Chebbi" },
    image: {
      src: "/generated/gt-erg-chebbi.jpg",
      alt: "Luxury tented camp among the dunes of Erg Chebbi at last light",
    },
  },
  {
    day: 7,
    title: "The Road of a Thousand Kasbahs",
    theme: "The Kasbah Road",
    route: "Merzouga → Tinghir → Todgha Gorge → Dadès Valley → Skoura",
    drive: "approx. 225 mi / ~6.5h with stops", // ~360 km — ⚠︎ VERIFY
    body: "Wake for sunrise over the dunes — the finest light of the whole desert — before we turn west onto the legendary Road of a Thousand Kasbahs, following the old caravan route between palmeries and fortified earthen villages. We pause at the Todgha Gorge, where a cold clear river has cut a slot canyon between sheer limestone cliffs rising up to 300 metres, narrow enough in places to touch both walls. The road then winds through the Dadès Valley, past rose-coloured rock formations and ribbons of green oasis, before we reach the serene palm grove of Skoura, an oasis studded with historic kasbahs — a tranquil place to spend the night away from the crowds.",
    highlights: [
      "Sahara sunrise",
      "Todgha Gorge",
      "Dadès Valley & rock formations",
      "Road of a Thousand Kasbahs",
      "Skoura palmery",
    ],
    meals: "Breakfast",
    overnight: { property: "Sawadi", city: "Skoura" }, // ⚠︎ VERIFY property name & that Skoura is the intended overnight vs. Ouarzazate
    image: {
      src: "/generated/gt-todgha.jpg",
      alt: "Sheer limestone walls of the Todgha Gorge above its shallow clear river",
    },
  },
  {
    day: 8,
    title: "Cinema, Sandcastles & the High Atlas",
    theme: "Cinema & Summits",
    route: "Skoura → Ouarzazate → Aït Benhaddou → Tizi n'Tichka → Marrakech",
    drive: "approx. 125 mi / ~4.5–5h with stops", // ~200 km — ⚠︎ VERIFY
    body: "A short hop brings us to Ouarzazate, the \"door of the desert\" and Morocco's unlikely film capital — home to Atlas Film Studios (where everything from Lawrence of Arabia to Gladiator and Game of Thrones was shot) and the restored Taourirt Kasbah. The day's showpiece is Aït Benhaddou, a UNESCO-listed ksar of packed-earth towers stacked against a hillside above the Ounila river — the most spectacular fortified village in the country, and instantly familiar from the screen. From there the road climbs the High Atlas, cresting the dramatic Tizi n'Tichka pass (2,260 m) with its switchbacks and mountain-Berber villages, before descending into the palm groves and red walls of Marrakech by evening.",
    highlights: [
      "Aït Benhaddou (UNESCO)",
      "Atlas Film Studios",
      "Taourirt Kasbah",
      "Tizi n'Tichka pass",
      "Arrival in Marrakech",
    ],
    meals: "Breakfast",
    overnight: { property: "Palais Andara Riad & Spa", city: "Marrakech" },
    image: {
      src: "/generated/gt-ait-benhaddou.jpg",
      alt: "Aït Benhaddou reflected in the Ounila river at blue hour",
    },
  },
  {
    day: 9,
    title: "The Red City",
    theme: "The Red City",
    route: "Marrakech — full day",
    drive: "minimal (city touring)",
    body: "A full day in the ochre capital of the south, a city of gardens, palaces and controlled chaos. With a local guide you'll take in the Koutoubia minaret (the 12th-century template for Rabat's Hassan Tower and Seville's Giralda); the stucco-and-tile splendour of the Bahia Palace; the intricate Saadian Tombs; and the restored Ben Youssef Madrasa, once the largest Islamic college in North Africa. For contrast, the cobalt-blue Jardin Majorelle — rescued by Yves Saint Laurent — offers a cool, planted refuge. Then, as day tips into night, we step into the beating heart of the city: Jemaa el-Fna, the great square that fills with snake charmers, storytellers, musicians, herbalists and a hundred smoking food stalls — a UNESCO \"Masterpiece of Oral Heritage\" that is pure sensory theatre. Time, too, to lose yourself in the souks for lanterns, leather, carpets and spice.",
    highlights: [
      "Jemaa el-Fna",
      "Jardin Majorelle",
      "Bahia Palace",
      "Ben Youssef Madrasa",
      "Koutoubia",
      "The souks",
    ],
    meals: "Breakfast",
    overnight: { property: "Palais Andara Riad & Spa", city: "Marrakech" },
    image: {
      src: "/generated/gt-marrakech.jpg",
      alt: "Arcaded courtyard of the Bahia Palace in Marrakech in warm evening light",
    },
  },
  {
    day: 10,
    title: "Atlantic Winds: Essaouira",
    theme: "Atlantic Wind",
    route: "Marrakech → (argan country) → Essaouira",
    drive: "approx. 120 mi / ~3h", // ~190 km — ⚠︎ VERIFY
    body: "We trade the heat of the interior for the breeze of the coast, driving west through argan groves — the only place on earth the tree grows, and where you may spot goats improbably perched in the branches. On the coast lies Essaouira, a UNESCO-listed 18th-century port whose personality is pure Atlantic: whitewashed and blue-shuttered, salt-scrubbed and unhurried. You'll walk the Skala de la Ville ramparts with their line of bronze cannons and crashing surf, watch the cobalt fishing boats unload at the working harbour, and browse a relaxed medina known for thuya-wood craft, art galleries and gnaoua music. The wind that made Essaouira a kitesurf capital also keeps it cool and calm — the perfect exhale near the journey's end.",
    highlights: [
      "Argan groves",
      "Skala ramparts",
      "Fishing harbour",
      "Essaouira medina (UNESCO)",
      "Thuya-wood artisans",
    ],
    meals: "Breakfast",
    overnight: { property: "Villa Quieta", city: "Essaouira" },
    image: {
      src: "/generated/gt-essaouira.jpg",
      alt: "Goats perched in the branches of an argan tree on the road to Essaouira",
    },
  },
  {
    day: 11,
    title: "Modern Morocco by the Ocean",
    theme: "Ocean Finale",
    route: "Essaouira → Casablanca",
    drive: "approx. 215 mi / ~5h", // ~350 km — ⚠︎ VERIFY
    body: "The coast road carries us north to Casablanca, Morocco's largest city and its economic and modern heart — an Art-Deco-meets-Mauresque metropolis far from the medinas of the interior. The centrepiece is the colossal Hassan II Mosque, one of the largest in the world, rising directly over the Atlantic on a promontory where the waves break beneath its glass floor; its minaret climbs to 210 metres, and it is one of the few mosques in Morocco non-Muslims may enter (by guided visit). We'll walk the Corniche seafront and, if time allows, the old medina, before a farewell dinner to toast the eleven days and the length of a country crossed.",
    highlights: [
      "Hassan II Mosque",
      "The Corniche",
      "Old Medina",
      "Farewell dinner",
    ],
    meals: "Breakfast · Farewell dinner",
    overnight: { property: "Melliber Apart-Hotel", city: "Casablanca" },
    image: {
      src: "/generated/gt-casablanca.jpg",
      alt: "The minaret of the Hassan II Mosque towering over its ocean esplanade at dusk",
    },
  },
  {
    day: 12,
    title: "Departure",
    theme: "Bslama — Farewell",
    route: "Casablanca → Mohammed V Airport (CMN)",
    drive: "to airport per flight time",
    body: "Time at leisure until your private transfer to Mohammed V Airport for your onward flight. You leave with the blue of Chefchaouen, the gold of the Sahara and the red of Marrakech — eleven nights of Morocco carried home. Bslama — until we meet again.",
    highlights: ["Leisure morning", "Private airport transfer", "Departure"],
    meals: "Breakfast",
  },
];

// ⚠︎ VERIFY all property names, spellings & details before publishing;
// blurbs are evocative placeholders — replace with each property's real copy.
export const GRAND_STAYS: GrandStay[] = [
  { city: "Rabat", nights: 1, property: "Riad Kalaa", blurb: "An Andalusian-style riad in the heart of the old medina." },
  { city: "Chefchaouen", nights: 1, property: "Hotel Cherifa", blurb: "A blue-washed hideaway beneath the Rif Mountains." },
  { city: "Fez", nights: 2, property: "Riad Ahlam", blurb: "A traditional riad within the walls of Fes el-Bali." },
  { city: "Erfoud", nights: 1, property: "Xaluca Erfoud", blurb: "A desert-style resort at the gateway to the dunes." },
  { city: "Merzouga / Erg Chebbi", nights: 1, property: "Dihya Desert Camp", blurb: "A luxury tented camp set among the Erg Chebbi dunes." },
  { city: "Skoura", nights: 1, property: "Sawadi", blurb: "A tranquil retreat in the Skoura palm oasis." },
  { city: "Marrakech", nights: 2, property: "Palais Andara Riad & Spa", blurb: "An opulent riad and spa near the medina." },
  { city: "Essaouira", nights: 1, property: "Villa Quieta", blurb: "A serene villa near the Atlantic shore." },
  { city: "Casablanca", nights: 1, property: "Melliber Apart-Hotel", blurb: "A comfortable apart-hotel in the city centre." },
];

export const GRAND_INCLUDED = [
  "11 nights in hand-picked riads, a desert-style resort, a luxury Sahara camp & a city apart-hotel",
  "Daily breakfast; desert dinner (Day 6) and farewell dinner (Day 11)",
  "Private, air-conditioned vehicle with a professional English-speaking driver-guide throughout",
  "Licensed local guides in Fez & Marrakech",
  "Camel trek and overnight in Erg Chebbi",
  "Entrance fees to the monuments and scenic spots listed in the itinerary",
  "All inter-city transfers and airport meet-and-greet (arrival & departure)",
  "Bottled water on board throughout",
  "All applicable local taxes",
] as const;

export const GRAND_EXCLUDED = [
  "International flights to/from Casablanca (CMN)",
  "Lunches and any meals not specified",
  "Travel insurance, gratuities/tips, and personal expenses",
  "Optional activities (4×4 dune driving, sandboarding, hammam, cooking classes, etc.)",
] as const;

export const GRAND_PRACTICAL = [
  { label: "Pace", value: "Moderate. Two long scenic driving days (Day 5 and Day 7); the rest are relaxed." },
  { label: "Group", value: "Private and tailor-made — dates, pace, accommodation tier and add-ons are all adjustable." },
  { label: "Physical level", value: "Easy–moderate; light walking on uneven medina and gorge ground; short camel ride (skippable)." },
  { label: "Languages", value: "Arabic & Darija (local); French widely spoken; your guide/driver speaks English." },
  { label: "Currency", value: "Moroccan Dirham (MAD); cards accepted in cities, cash useful in rural areas & souks." },
  { label: "Climate note", value: "Desert is hot by day / cool at night — layers recommended; Atlas passes can be cold/snowy in winter." },
  { label: "What to pack", value: "Comfortable walking shoes, sun protection, a warm layer for desert nights & mountains, modest dress for religious sites, a scarf." },
  { label: "Connectivity", value: "A local eSIM/SIM gives good coverage in cities and most of the route; expect gaps in remote Atlas/desert stretches." },
  { label: "Visas & entry", value: "Many nationalities enter visa-free for tourism — travellers should check their own requirements." },
] as const;

export const GRAND_FAQ = [
  {
    q: "How long is the tour and where does it start?",
    a: "12 days / 11 nights, starting and ending in Casablanca.",
  },
  {
    q: "Is this a private tour?",
    a: "Yes — a private, chauffeured, tailor-made journey; dates and details flex to you.",
  },
  {
    q: "How much driving is involved?",
    a: "Around 1,500 miles total; two days (to the desert and along the Kasbah Road) are long but among the most scenic.", // ~2,400 km — ⚠︎ VERIFY
  },
  {
    q: "When is the best time to go?",
    a: "Spring (Mar–May) and autumn (Sep–Nov) are ideal for comfortable temperatures.",
  },
  {
    q: "Do I sleep in the Sahara?",
    a: "Yes — one night in a luxury desert camp in Erg Chebbi, reached by camel.",
  },
  {
    q: "Are flights included?",
    a: "No — international flights are separate; all in-country transport is included.",
  },
] as const;
