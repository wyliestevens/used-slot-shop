export type MachineType = "reel" | "video" | "video-poker" | "vintage";

export type Machine = {
  slug: string;
  name: string;
  brand: "igt" | "bally" | "aristocrat" | "williams" | "konami" | "ainsworth" | "aruze";
  brandLabel: string;
  type: MachineType;
  year?: number;
  price: number;
  compareAtPrice?: number;
  denomination: string;
  reels: number;
  cabinet?: string;
  condition: "Professionally Refurbished" | "Collector Grade" | "Like New";
  inStock: number;
  image: string;
  gallery?: string[];
  tagline: string;
  description: string;
  highlights: string[];
  specs: Record<string, string>;
};

const img = (q: string) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=1200&q=80`;

export const machines: Machine[] = [
  {
    slug: "igt-s2000-double-diamond",
    name: "IGT S2000 Double Diamond",
    brand: "igt",
    brandLabel: "IGT",
    type: "reel",
    year: 2003,
    price: 2195,
    compareAtPrice: 2495,
    denomination: "$0.25",
    reels: 3,
    cabinet: "S2000 Upright",
    condition: "Professionally Refurbished",
    inStock: 4,
    image: img("photo-1606167668584-78701c57f13d"),
    tagline: "The all-time best-selling home game-room reel slot.",
    description:
      "The IGT S2000 Double Diamond is the gold standard for home slot machine ownership. Fully refurbished by certified technicians, tested against casino-grade compliance specs, and dialed in for bill acceptance, coin hopper reliability, and flawless reel timing. A classic mechanical feel with rock-solid IGT engineering.",
    highlights: [
      "Accepts $1, $5, $10, $20, $50, $100 bills",
      "Ticket printer optional",
      "LED lighting upgrade included",
      "One-year home-use warranty",
    ],
    specs: {
      Manufacturer: "IGT (International Game Technology)",
      Platform: "S2000",
      Game: "Double Diamond",
      Reels: "3-reel mechanical",
      Denomination: "$0.25 (adjustable)",
      "Bill Validator": "IGT Smart System",
      Dimensions: '27"W x 22"D x 42"H',
      Weight: "~230 lbs",
      Power: "110V standard outlet",
    },
  },
  {
    slug: "igt-gameking-multi-game-video-poker",
    name: "IGT Game King Multi-Game Video Poker",
    brand: "igt",
    brandLabel: "IGT",
    type: "video-poker",
    year: 2008,
    price: 2695,
    denomination: "$0.25",
    reels: 0,
    cabinet: "Game King 17\" Upright",
    condition: "Professionally Refurbished",
    inStock: 3,
    image: img("photo-1518895949257-7621c3c786d7"),
    tagline: "31-game multi-game poker — Jacks or Better to Deuces Wild.",
    description:
      "The Game King is the undisputed king of video poker. This multi-game version ships with 31 classic poker variants pre-loaded and passes full Nevada-compliant payback testing. Crystal-clear CRT or LCD display depending on cabinet.",
    highlights: [
      "31 poker games: Jacks or Better, Deuces Wild, Bonus Poker, and more",
      "Industry-leading paytables",
      "Bill validator with $100 acceptance",
      "Free lifetime tech support",
    ],
    specs: {
      Manufacturer: "IGT",
      Platform: "Game King",
      Games: "31 multi-game poker suite",
      Display: '17" LCD or CRT',
      Denomination: "$0.25 (adjustable)",
      Dimensions: '24"W x 24"D x 48"H',
      Weight: "~260 lbs",
      Power: "110V",
    },
  },
  {
    slug: "bally-s9000-blazing-7s",
    name: "Bally S9000 Blazing 7s",
    brand: "bally",
    brandLabel: "Bally",
    type: "reel",
    year: 2004,
    price: 2295,
    denomination: "$0.25",
    reels: 3,
    cabinet: "S9000 Slant",
    condition: "Professionally Refurbished",
    inStock: 2,
    image: img("photo-1551038247-3d9af20df552"),
    tagline: "Iconic Blazing 7s on the legendary Bally S9000 platform.",
    description:
      "A true casino floor veteran. The S9000 cabinet delivers rock-solid mechanicals and the Blazing 7s paytable is one of the most recognized symbols in slot machine history. Every unit is stripped, cleaned, electronics tested, and reassembled to spec.",
    highlights: [
      "Classic 3-reel experience",
      "Bally Alpha-ready main board",
      "Fresh reel strips and bezel lighting",
      "Home-use warranty",
    ],
    specs: {
      Manufacturer: "Bally Technologies",
      Platform: "S9000",
      Game: "Blazing 7s",
      Reels: "3-reel mechanical",
      Denomination: "$0.25 (adjustable)",
      Dimensions: '25"W x 22"D x 40"H',
      Weight: "~220 lbs",
      Power: "110V",
    },
  },
  {
    slug: "bally-alpha-2-pro-v32",
    name: "Bally Alpha 2 Pro V32",
    brand: "bally",
    brandLabel: "Bally",
    type: "video",
    year: 2012,
    price: 3195,
    denomination: "$0.01",
    reels: 5,
    cabinet: "Alpha 2 Pro V32",
    condition: "Like New",
    inStock: 2,
    image: img("photo-1578662996442-48f60103fc96"),
    tagline: "Massive dual 23-inch screens. Modern casino floor feel at home.",
    description:
      "The Alpha 2 Pro V32 is one of Bally's most advanced platforms. Dual HD displays, crisp surround sound, and access to the entire Bally video slot library. A statement piece for any serious game room.",
    highlights: [
      "Dual 23\" HD LCD displays",
      "Premium surround audio",
      "Bill validator with ticket printer",
      "Casino-grade build quality",
    ],
    specs: {
      Manufacturer: "Bally Technologies",
      Platform: "Alpha 2 Pro V32",
      Display: "Dual 23\" HD",
      Denomination: "Penny (configurable)",
      Dimensions: '27"W x 26"D x 70"H',
      Weight: "~320 lbs",
      Power: "110V",
    },
  },
  {
    slug: "aristocrat-buffalo-gold-mk6",
    name: "Aristocrat Buffalo Gold MK6",
    brand: "aristocrat",
    brandLabel: "Aristocrat",
    type: "video",
    year: 2013,
    price: 3495,
    compareAtPrice: 3795,
    denomination: "$0.01",
    reels: 5,
    cabinet: "MK6",
    condition: "Professionally Refurbished",
    inStock: 3,
    image: img("photo-1596838132731-31a9c3c3e4ee"),
    tagline: "The most-requested video slot in home game rooms — period.",
    description:
      "If you've played in any US casino in the last decade, you've seen Buffalo. Now bring the roar home. 4-level progressive jackpots, xtra reel power bonus triggers, and iconic buffalo stampede wilds. MK6 cabinet with widescreen LCD.",
    highlights: [
      "Xtra Reel Power bonus feature",
      "Mini, Minor, Major, Grand progressive jackpots",
      "Iconic Buffalo roar sound package",
      "MK6 cabinet — full service-ready",
    ],
    specs: {
      Manufacturer: "Aristocrat",
      Platform: "MK6",
      Game: "Buffalo Gold",
      Display: '22" widescreen LCD',
      Denomination: "Penny",
      Dimensions: '25"W x 24"D x 52"H',
      Weight: "~275 lbs",
      Power: "110V",
    },
  },
  {
    slug: "wms-bluebird-2-zeus",
    name: "WMS Bluebird 2 Zeus",
    brand: "williams",
    brandLabel: "WMS",
    type: "video",
    year: 2010,
    price: 2895,
    denomination: "$0.01",
    reels: 5,
    cabinet: "Bluebird 2",
    condition: "Professionally Refurbished",
    inStock: 2,
    image: img("photo-1520250497591-112f2f40a3f4"),
    tagline: "Mythic bonus rounds on WMS's reliable Bluebird 2 platform.",
    description:
      "Zeus made WMS a household name. This Bluebird 2 cabinet ships with the original Zeus theme — free spins with multipliers, mythic sound design, and the 40-line core game. Rebuilt to spec with new bezels and reel strips.",
    highlights: [
      "40-line configurable bets",
      "Free spins bonus with stacked wilds",
      "Premium top-box lighting",
      "Home-use warranty",
    ],
    specs: {
      Manufacturer: "WMS Gaming",
      Platform: "Bluebird 2",
      Game: "Zeus",
      Display: '22" LCD main + top-box',
      Denomination: "Penny",
      Dimensions: '25"W x 24"D x 56"H',
      Weight: "~270 lbs",
      Power: "110V",
    },
  },
  {
    slug: "konami-podium-china-shores",
    name: "Konami Podium China Shores",
    brand: "konami",
    brandLabel: "Konami",
    type: "video",
    year: 2011,
    price: 2795,
    denomination: "$0.01",
    reels: 5,
    cabinet: "Podium",
    condition: "Professionally Refurbished",
    inStock: 2,
    image: img("photo-1493962853295-0fd70327578a"),
    tagline: "Cult-favorite Konami classic with massive retrigger potential.",
    description:
      "China Shores is famous for one reason: retriggers that never seem to end. A cult favorite among slot enthusiasts. Podium cabinet with Konami's crisp display and punchy sound.",
    highlights: [
      "Unlimited free-spin retrigger potential",
      "Konami's proprietary 'Xtra Reward' system",
      "Bill acceptor with $100 support",
      "Top-box signage included",
    ],
    specs: {
      Manufacturer: "Konami",
      Platform: "Podium",
      Game: "China Shores",
      Display: '22" LCD',
      Denomination: "Penny",
      Dimensions: '24"W x 24"D x 54"H',
      Weight: "~265 lbs",
      Power: "110V",
    },
  },
  {
    slug: "igt-s2000-wheel-of-fortune",
    name: "IGT S2000 Wheel of Fortune",
    brand: "igt",
    brandLabel: "IGT",
    type: "reel",
    year: 2005,
    price: 2895,
    denomination: "$0.25",
    reels: 3,
    cabinet: "S2000 with Wheel Top",
    condition: "Professionally Refurbished",
    inStock: 1,
    image: img("photo-1542751371-adc38448a05e"),
    tagline: "The wheel you know, spinning in your own game room.",
    description:
      "The most recognized slot machine brand on the planet. This S2000 Wheel of Fortune includes the animated spinning wheel top, original sound chip, and full 3-reel base game. A genuine conversation piece.",
    highlights: [
      "Working animated wheel top",
      "Original WoF sound package",
      "Pat Sajak voiceovers on bonus hits",
      "Includes extra reel strip set",
    ],
    specs: {
      Manufacturer: "IGT",
      Platform: "S2000",
      Game: "Wheel of Fortune",
      Reels: "3-reel + wheel top",
      Denomination: "$0.25",
      Dimensions: '27"W x 22"D x 54"H',
      Weight: "~260 lbs",
      Power: "110V",
    },
  },
  {
    slug: "ainsworth-a560-king-of-africa",
    name: "Ainsworth A560 King of Africa",
    brand: "ainsworth",
    brandLabel: "Ainsworth",
    type: "video",
    year: 2012,
    price: 2995,
    denomination: "$0.01",
    reels: 5,
    cabinet: "A560",
    condition: "Professionally Refurbished",
    inStock: 1,
    image: img("photo-1518544801976-3e159e50e5bb"),
    tagline: "Australian-built quality with explosive bonus rounds.",
    description:
      "Ainsworth's A560 cabinet pairs rugged build quality with some of the industry's best bonus math. King of Africa is a perennial casino favorite with re-trigger free-spin bonuses and stacked wilds.",
    highlights: [
      "Stacked wild feature",
      "Free-spin retriggers",
      "Ainsworth build reliability",
      "Home-use warranty",
    ],
    specs: {
      Manufacturer: "Ainsworth",
      Platform: "A560",
      Game: "King of Africa",
      Display: '22" LCD',
      Denomination: "Penny",
      Dimensions: '25"W x 24"D x 54"H',
      Weight: "~270 lbs",
      Power: "110V",
    },
  },
  {
    slug: "aruze-innovator-paradise-fishing",
    name: "Aruze Innovator Paradise Fishing",
    brand: "aruze",
    brandLabel: "Aruze",
    type: "video",
    year: 2014,
    price: 3195,
    denomination: "$0.01",
    reels: 5,
    cabinet: "Innovator",
    condition: "Like New",
    inStock: 2,
    image: img("photo-1621075160523-b936ad96132a"),
    tagline: "Skill-shot bonus fishing round unlike anything else on the floor.",
    description:
      "Aruze's Innovator cabinet is a modern showpiece. Paradise Fishing features a skill-based fishing bonus that's unlike any other slot on the market — cast, reel, and pull in payouts. Crystal clear displays and punchy sound.",
    highlights: [
      "Skill-shot fishing bonus",
      "Dual display Innovator cabinet",
      "Premium audio",
      "Near-showroom condition",
    ],
    specs: {
      Manufacturer: "Aruze",
      Platform: "Innovator",
      Game: "Paradise Fishing",
      Display: "Dual LCD",
      Denomination: "Penny",
      Dimensions: '27"W x 26"D x 70"H',
      Weight: "~310 lbs",
      Power: "110V",
    },
  },
  {
    slug: "bally-v32-lightning-zap",
    name: "Bally V32 Lightning Zap",
    brand: "bally",
    brandLabel: "Bally",
    type: "video",
    year: 2011,
    price: 2995,
    denomination: "$0.01",
    reels: 5,
    cabinet: "V32 Widescreen",
    condition: "Professionally Refurbished",
    inStock: 1,
    image: img("photo-1611095973763-414019e72400"),
    tagline: "Widescreen Bally video slot with stacked wild frenzy.",
    description:
      "The V32 cabinet's widescreen LCD makes Lightning Zap pop. A five-reel, forty-line video slot with stacked wild bonuses and bright lightning-themed audio. Fully service-ready.",
    highlights: [
      "Widescreen 32\" primary display",
      "Stacked wild bonus",
      "Bill validator + ticket printer",
      "Full refurb",
    ],
    specs: {
      Manufacturer: "Bally",
      Platform: "V32",
      Display: '32" widescreen',
      Denomination: "Penny",
      Dimensions: '27"W x 26"D x 70"H',
      Weight: "~315 lbs",
      Power: "110V",
    },
  },
  {
    slug: "igt-game-king-slant-top",
    name: "IGT Game King Slant Top",
    brand: "igt",
    brandLabel: "IGT",
    type: "video-poker",
    year: 2007,
    price: 2395,
    denomination: "$0.25",
    reels: 0,
    cabinet: "Game King Slant",
    condition: "Professionally Refurbished",
    inStock: 2,
    image: img("photo-1609743522471-83c84ce23e8e"),
    tagline: "Slant-top Game King — bar-style cabinet, full 31-game poker.",
    description:
      "A slant-top cabinet is perfect for home bars and lounges. Same 31-game Game King suite in a lower-profile cabinet. Ideal where a full upright is too tall.",
    highlights: [
      "31-game poker suite",
      "Slant cabinet — great for bar tops",
      "$100 bill validator",
      "Spare key set included",
    ],
    specs: {
      Manufacturer: "IGT",
      Platform: "Game King Slant",
      Display: '17" LCD',
      Denomination: "$0.25",
      Dimensions: '24"W x 24"D x 36"H',
      Weight: "~210 lbs",
      Power: "110V",
    },
  },
];

export function machinesByBrand(brand: string) {
  return machines.filter((m) => m.brand === brand);
}

export function machinesByType(type: MachineType) {
  return machines.filter((m) => m.type === type);
}

export function getMachine(slug: string) {
  return machines.find((m) => m.slug === slug);
}

export function relatedMachines(slug: string, limit = 3) {
  const current = getMachine(slug);
  if (!current) return [];
  return machines
    .filter((m) => m.slug !== slug && (m.brand === current.brand || m.type === current.type))
    .slice(0, limit);
}
