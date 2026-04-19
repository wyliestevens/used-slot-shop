export type MachineType = "reel" | "video" | "video-poker" | "vintage";
export type BrandSlug =
  | "igt"
  | "bally"
  | "aristocrat"
  | "williams"
  | "konami"
  | "ainsworth"
  | "aruze";

export type Machine = {
  slug: string;
  name: string;
  brand: BrandSlug;
  brandLabel: string;
  type: MachineType;
  price: number;
  compareAtPrice?: number;
  denomination: string;
  reels: number;
  cabinet?: string;
  condition: "Professionally Refurbished" | "Collector Grade" | "Like New";
  inStock: number;
  image: string;
  tagline: string;
  description: string;
  highlights: string[];
  specs: Record<string, string>;
};

const brandLabels: Record<BrandSlug, string> = {
  igt: "IGT",
  bally: "Bally",
  aristocrat: "Aristocrat",
  williams: "WMS",
  konami: "Konami",
  ainsworth: "Ainsworth",
  aruze: "Aruze",
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Compact seed format — each tuple becomes a full Machine via build().
// Order: [baseSlug, name, brand, type, price, image, description, cabinet?]
type Seed = [
  string,
  string,
  BrandSlug,
  MachineType,
  number,
  string,
  string,
  string?
];

const SEEDS: Seed[] = [
  // ─── IGT Barcrest S2000 bonus reels ───
  ["igt-double-top-dollar-barcrest", "IGT Double Top Dollar Barcrest S2000", "igt", "reel", 5000, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879bfc0db7a3ebccaed0222.jpeg", "Premium Barcrest S2000 with bonus features, enhanced sound, and interactive dollar-sign pick bonus. Includes TITO and updated bill validator.", "Barcrest S2000"],
  ["igt-quack-shot-barcrest", "IGT Quack Shot Barcrest S2000", "igt", "reel", 3150, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879c0e257dd60bea48569a9.jpeg", "Barcrest S2000 slot machine with bonus features and enhanced sound system. Available in various colors and top sizes with TITO capability.", "Barcrest S2000"],
  ["igt-money-mad-martians-barcrest", "IGT Money Mad Martians Barcrest S2000", "igt", "reel", 3150, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879c0a5db7a3ea590ed0303.jpeg", "Barcrest S2000 featuring bonus gameplay, enhanced audio, and interactive second-screen elements. Includes modern bill validator and one-year warranty.", "Barcrest S2000"],
  ["igt-triple-double-diamond-deluxe-barcrest", "IGT Triple Double Diamond Deluxe Barcrest S2000", "igt", "reel", 3950, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879c114a64833e8aad25eb2.jpeg", "Premium Barcrest S2000 with advanced bonus mechanics and enhanced sound. Multi-level pick games and TITO support.", "Barcrest S2000"],

  // ─── IGT Video Slots Round Top (I+ 3902 platform) ───
  ["igt-cleopatra-video", "IGT Cleopatra Video Slot", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879c448ce9e185957e88146.jpeg", "IGT I+ 3902 platform with bonus features, multi-line, multi-coin gameplay, 17-inch LCD display, enhanced sound and TITO.", "IGT I+ 3902"],
  ["igt-lucky-larry-lobster-mania", "IGT Lucky Larry Lobster Mania", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879c4e0a64833fce3d26367.jpeg", "Cult-favorite IGT video slot on the I+ 3902 platform. Multi-line bonus gameplay with classic lobster claw bonus trigger. 17-inch LCD and TITO.", "IGT I+ 3902"],
  ["igt-hexbreaker", "IGT Hexbreaker", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879c472ce9e181a57e8815f.jpeg", "IGT I+ 3902 video slot with bonus features, multi-line, multi-coin play, 17-inch LCD and enhanced sound.", "IGT I+ 3902"],
  ["igt-money-storm", "IGT Money Storm", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879c571a648332cc4d263fc.jpeg", "IGT I+ 3902 classic video slot with bonus features and multi-line play. 17-inch LCD display with TITO.", "IGT I+ 3902"],
  ["igt-monster-mansion", "IGT Monster Mansion", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879c5de922709084ac5c627.jpeg", "IGT I+ 3902 video slot with themed bonus round, multi-line, multi-coin play. 17-inch LCD.", "IGT I+ 3902"],
  ["igt-my-rich-uncle", "IGT My Rich Uncle", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879c73a9227093cc0c5c8cb.jpeg", "IGT I+ 3902 video slot with bonus features, multi-line, multi-coin gameplay, 17-inch LCD.", "IGT I+ 3902"],
  ["igt-moolah", "IGT Moolah", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879c64edb7a3e1bc3ed0905.jpeg", "IGT I+ 3902 video slot with bonus features, multi-line play, and enhanced sound. TITO included.", "IGT I+ 3902"],
  ["igt-mystical-mermaid", "IGT Mystical Mermaid", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879c7d5a648339bf0d2672c.jpeg", "IGT I+ 3902 video slot with mermaid-themed bonus rounds. Multi-line, 17-inch LCD, TITO.", "IGT I+ 3902"],
  ["igt-nurse-follies", "IGT Nurse Follies", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879c9c0a6483394c2d2689d.jpeg", "IGT I+ 3902 video slot with bonus features and enhanced sound. 17-inch LCD, TITO.", "IGT I+ 3902"],
  ["igt-super-cherry", "IGT Super Cherry", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879ca419227091c55c5cb34.jpeg", "IGT I+ 3902 fruit-themed video slot. Multi-line, multi-coin play with 17-inch LCD and TITO.", "IGT I+ 3902"],
  ["igt-pharaohs-fortune", "IGT Pharaoh's Fortune", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879c9f457dd601474857328.jpeg", "Classic Egyptian-themed IGT video slot. I+ 3902 platform, bonus features, multi-line play with 17-inch LCD.", "IGT I+ 3902"],
  ["igt-super-sally-shrimp-mania", "IGT Super Sally Shrimp Mania", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879caf19227093f6dc5cc5b.jpeg", "IGT I+ 3902 video slot with bonus gameplay, multi-line, 17-inch LCD, and TITO.", "IGT I+ 3902"],
  ["igt-tailgate-party", "IGT Tailgate Party", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879cc5b57dd6025cf857667.jpeg", "Football-themed IGT video slot. I+ 3902 platform with bonus features, multi-line, 17-inch LCD and TITO.", "IGT I+ 3902"],
  ["igt-totally-puzzled", "IGT Totally Puzzled", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879ccc2db7a3ea130ed0f65.jpeg", "IGT I+ 3902 puzzle-themed video slot with bonus gameplay, multi-line, 17-inch LCD, TITO.", "IGT I+ 3902"],
  ["igt-texas-tea", "IGT Texas Tea", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879cca0db7a3ebc0eed0f42.jpeg", "Classic oil-rush themed IGT video slot. I+ 3902 platform, multi-line, bonus features, 17-inch LCD.", "IGT I+ 3902"],

  // ─── IGT S2000 5-reel ───
  ["igt-s2000-cleopatra-5reel", "IGT S2000 Cleopatra 5-Reel", "igt", "reel", 950, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879cf4ddb7a3e840bed1412.jpeg", "IGT S2000 5-reel mechanical slot with 9 line, 45 coin configuration. Enhanced sound and TITO.", "IGT S2000 5-Reel"],
  ["igt-s2000-double-diamond-run", "IGT S2000 Double Diamond Run 5-Reel", "igt", "reel", 950, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879d18dce9e183411e88fd9.jpeg", "IGT S2000 5-reel with 9 line, 90 coin play. Enhanced sound and modern bill validator.", "IGT S2000 5-Reel"],
  ["igt-s2000-double-diamond-free-spin", "IGT S2000 Double Diamond Free Spin Bonus Game", "igt", "reel", 1150, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879d05b9227094875c5d253.jpeg", "IGT S2000 with free spin bonus feature. 9 line, 180 coin configuration with TITO.", "IGT S2000 5-Reel"],
  ["igt-s2000-double-dollars-free-spin", "IGT S2000 Double Dollars Free Spin Bonus Game", "igt", "reel", 1150, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879daf5922709ef5ec5dc9d.jpeg", "IGT S2000 5-reel with free spin bonus. 9 line, 180 coin play and enhanced audio.", "IGT S2000 5-Reel"],
  ["igt-s2000-leopard-claw", "IGT S2000 Leopard Claw", "igt", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879dbfb922709d4f1c5dd35.jpeg", "IGT S2000 5-reel with 9 line, 90 coin. Modern validators and one-year warranty.", "IGT S2000 5-Reel"],
  ["igt-s2000-five-times-pay-5reel", "IGT S2000 Five Times Pay 5-Reel", "igt", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879dbc9922709a549c5dd28.jpeg", "IGT S2000 5-reel mechanical with 9 line, 90 coin play and TITO option.", "IGT S2000 5-Reel"],
  ["igt-s2000-penny-barn", "IGT S2000 Penny Barn", "igt", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879e01fa648336493d28142.jpeg", "Fully refurbished IGT S2000 5-reel with 9 line, 90 coin and tested components.", "IGT S2000 5-Reel"],
  ["igt-s2000-triple-butterfly-sevens", "IGT S2000 Triple Butterfly Sevens 5-Reel", "igt", "reel", 950, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879e15da6483340ccd282b8.jpeg", "IGT S2000 5-reel with 9 line, 180 coin. Enhanced sound and free play option.", "IGT S2000 5-Reel"],
  ["igt-s2000-triple-red-hot-sevens-5reel", "IGT S2000 Triple Red Hot Sevens 5-Reel", "igt", "reel", 950, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879e48cce9e18dd8ce8a085.jpeg", "IGT S2000 5-reel classic with 9 line, 180 coin and multiple cabinet styles.", "IGT S2000 5-Reel"],
  ["igt-s2000-triple-lucky-sevens-5reel", "IGT S2000 Triple Lucky Sevens 5-Reel", "igt", "reel", 950, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879e38fa648330cb3d283fd.jpeg", "IGT S2000 5-reel with 9 line, 90 coin in three cabinet styles.", "IGT S2000 5-Reel"],
  ["igt-s2000-triple-strike-5reel", "IGT S2000 Triple Strike 5-Reel", "igt", "reel", 950, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879e569ce9e180269e8a0ed.jpeg", "IGT S2000 5-reel with 9 line, 90 coin. Reliable mechanical reels with warranty.", "IGT S2000 5-Reel"],

  // ─── IGT Game King video poker ───
  ["igt-game-king-31-games-9-top", "IGT Game King 31 Games 9-inch Top", "igt", "video-poker", 1350, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687a200ece9e185839e98449.jpeg", "IGT Game King multi-denomination cabinet with 17-inch LCD, red or blue glass. Poker, keno, slots and blackjack with TITO.", "IGT Game King"],
  ["igt-game-king-31-games-17-lcd", "IGT Game King 31 Games Round Top (17\" LCD)", "igt", "video-poker", 1450, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687bc95ae36c15462818b905.jpeg", "Multi-denomination Game King round top. 17-inch LCD, red or blue glass options. Contains poker, keno, slots and blackjack.", "IGT Game King Round Top"],
  ["igt-game-king-31-games-19-lcd", "IGT Game King 31 Games Round Top (19\" LCD)", "igt", "video-poker", 1550, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687bc896e36c15afdc18b872.jpeg", "Multi-denomination Game King with 19-inch LCD. Poker, keno, slots and blackjack with modern bill validation.", "IGT Game King Round Top"],
  ["igt-game-king-31-games-17-alt", "IGT Game King 31 Games Round Top Alt (17\" LCD)", "igt", "video-poker", 1450, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687bca09c96ebb0ff64f9324.jpeg", "Alternate-glass Game King 31-games round top. 17-inch LCD with TITO technology.", "IGT Game King Round Top"],
  ["igt-game-king-118-games", "IGT Game King 118 Games Round Top", "igt", "video-poker", 1850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687bcbcde31a77433a25aaa2.jpeg", "IGT 044 platform expanded library with 118 games: numerous poker variants, 4 Card Keno and many slots. 17-inch LCD.", "IGT Game King 044"],

  // ─── IGT S2000 round top reels (set A) ───
  ["igt-s2000-10-times-pay", "IGT S2000 10 Times Pay", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/68753b135742b18163c5ed43.jpeg", "IGT S2000 round-top 3-reel mechanical slot. 2 coin play with enhanced sound, TITO and optional Free Play.", "IGT S2000 Round Top"],
  ["igt-s2000-butterfly-sevens", "IGT S2000 Butterfly Sevens", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687bda1f8f398f3d8ab482e4.jpeg", "IGT S2000 round-top Butterfly Sevens. Enhanced sound, TITO with optional Free Play.", "IGT S2000 Round Top"],
  ["igt-s2000-double-classic-7s", "IGT S2000 Double Classic 7's", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687bdaafe31a772cf525c081.jpeg", "IGT S2000 round-top. 3 coin play with enhanced sound, TITO, optional Free Play.", "IGT S2000 Round Top"],
  ["igt-s2000-double-strike", "IGT S2000 Double Strike", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687beff0e36c1547df194dee.jpeg", "IGT S2000 round-top 3 coin play. Enhanced sound, TITO, optional Free Play.", "IGT S2000 Round Top"],
  ["igt-s2000-double-diamond-haywire", "IGT S2000 Double Diamond Haywire", "igt", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687be84cda28cf864a78fa1f.jpeg", "IGT S2000 round-top 2 coin Haywire with enhanced sound, TITO, optional Free Play.", "IGT S2000 Round Top"],
  ["igt-s2000-double-times-pay", "IGT S2000 Double Times Pay 3x4x5x", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687bf5468f398f3fa9b51751.jpeg", "IGT S2000 round-top 3 coin Double Times Pay. Enhanced sound, TITO, optional Free Play.", "IGT S2000 Round Top"],
  ["igt-s2000-double-double-diamond", "IGT S2000 Double Double Diamond", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687bec138f398f7616b4f927.jpeg", "IGT S2000 round-top 5 coin play. Enhanced sound, TITO, optional Free Play.", "IGT S2000 Round Top"],
  ["igt-s2000-five-times-pay-wild", "IGT S2000 Five Times Pay Wild", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687bf654e31a77a9612662f5.jpeg", "IGT S2000 round-top 2 coin Five Times Pay Wild. Enhanced sound, TITO, Free Play option.", "IGT S2000 Round Top"],
  ["igt-s2000-double-rwb", "IGT S2000 Double R/W/B", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687bed76e36c151f43194b58.jpeg", "IGT S2000 round-top Red White Blue 2 coin. Enhanced sound, TITO, Free Play option.", "IGT S2000 Round Top"],
  ["igt-s2000-haywire", "IGT S2000 Haywire", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687bfc8bc96ebb76a0504650.jpeg", "IGT S2000 round-top Haywire 2 coin. Enhanced sound, TITO, optional Free Play.", "IGT S2000 Round Top"],
  ["igt-s2000-five-times-pay-deluxe", "IGT S2000 Five Times Pay Deluxe", "igt", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687bf59dc96ebbb7f8504005.jpeg", "IGT S2000 round-top Deluxe 2 coin Five Times Pay. Enhanced sound, TITO, Free Play.", "IGT S2000 Round Top"],
  ["igt-s2000-sevens-and-stars-rwb", "IGT S2000 Sevens & Stars R/W/B", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687bfdafda28cfe5fd794aed.jpeg", "IGT S2000 round-top Red White Blue Sevens & Stars 2 coin. Enhanced sound, TITO, Free Play.", "IGT S2000 Round Top"],
  ["igt-s2000-four-times-pay", "IGT S2000 Four Times Pay", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687bf6f4da28cf55de794472.jpeg", "IGT S2000 round-top 3 coin Four Times Pay. Enhanced sound, TITO, Free Play option.", "IGT S2000 Round Top"],
  ["igt-s2000-sizzling-sevens", "IGT S2000 Sizzling Sevens", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687bff19da28cf6240795592.jpeg", "IGT S2000 round-top Sizzling Sevens 3 coin. Enhanced sound, TITO, Free Play option.", "IGT S2000 Round Top"],
  ["igt-s2000-haywire-deluxe", "IGT S2000 Haywire Deluxe", "igt", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687bfcd3c96ebb24e050468a.jpeg", "IGT S2000 round-top Haywire Deluxe 3 coin. Enhanced sound, TITO, optional Free Play.", "IGT S2000 Round Top"],
  ["igt-s2000-top-10", "IGT S2000 Top 10", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687bffd38f398f3af8b52940.jpeg", "IGT S2000 round-top Top 10 with 3 coin play. Enhanced sound, TITO, Free Play.", "IGT S2000 Round Top"],
  ["igt-s2000-sizzling-sevens-2coin", "IGT S2000 Sizzling Sevens (2 Coin)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687bfe5ee36c158445196501.jpeg", "IGT S2000 round-top Sizzling Sevens 2 coin variant. Enhanced sound, TITO, optional Free Play.", "IGT S2000 Round Top"],
  ["igt-s2000-triple-diamond", "IGT S2000 Triple Diamond", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687c0205e31a771ec42677f5.jpeg", "IGT S2000 round-top Triple Diamond 2 coin. Enhanced sound, TITO, Free Play option.", "IGT S2000 Round Top"],
  ["igt-s2000-triple-diamond-strike", "IGT S2000 Triple Diamond Strike", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687c0348da28cf7fd57958b2.jpeg", "IGT S2000 round-top Triple Diamond Strike. Enhanced sound, TITO, optional Free Play.", "IGT S2000 Round Top"],
  ["igt-s2000-triple-black-tie", "IGT S2000 Triple Black Tie", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687c00cde31a77cb1f2675f5.jpeg", "IGT S2000 round-top Triple Black Tie 2 coin. Enhanced sound, TITO, Free Play.", "IGT S2000 Round Top"],
  ["igt-s2000-triple-double-stars", "IGT S2000 Triple Double Stars", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687c048cc96ebb14c0505833.jpeg", "IGT S2000 round-top Triple Double Stars. Enhanced sound, TITO, optional Free Play.", "IGT S2000 Round Top"],
  ["igt-s2000-triple-diamond-9-line", "IGT S2000 Triple Diamond 9 Line 9 Coin", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687c02eeda28cfe554795879.jpeg", "IGT S2000 round-top Triple Diamond 9 line 9 coin. Enhanced sound, TITO, Free Play.", "IGT S2000 Round Top"],
  ["igt-s2000-triple-stars", "IGT S2000 Triple Stars", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687c0c62da28cf318e7966f8.jpeg", "IGT S2000 round-top Triple Stars 2 coin. Enhanced sound, TITO, optional Free Play.", "IGT S2000 Round Top"],
  ["igt-s2000-triple-dollars", "IGT S2000 Triple Dollars", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687c0387c96ebb071b50538f.jpeg", "IGT S2000 round-top Triple Dollars. Enhanced sound, TITO, optional Free Play.", "IGT S2000 Round Top"],
  ["igt-s2000-triple-sapphires", "IGT S2000 Triple Sapphires", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687c0732c96ebb4b7f505b09.jpeg", "IGT S2000 round-top Triple Sapphires 3 coin. Enhanced sound, TITO, Free Play option.", "IGT S2000 Round Top"],
  ["igt-s2000-white-stars", "IGT S2000 White Stars", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687c10f2e31a77615e268aed.jpeg", "IGT S2000 round-top White Stars 3 coin. Enhanced sound, TITO, Free Play option.", "IGT S2000 Round Top"],
  ["igt-s2000-triple-stars-3coin", "IGT S2000 Triple Stars (3 Coin)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687c0f07c96ebb0e5750630b.jpeg", "IGT S2000 round-top Triple Stars 3 coin. Enhanced sound, TITO, Free Play option.", "IGT S2000 Round Top"],

  // ─── IGT S2000 16" series (set B) ───
  ["igt-s2000-12-times-pay", "IGT S2000 12 Times Pay", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687ec5f30c8943311b34fa31.jpeg", "IGT S2000 16-inch with 5 coin 5 line. Enhanced sound, TITO, updated bill validator.", "IGT S2000 16-inch"],
  ["igt-s2000-chainsaw-and-toasters", "IGT S2000 Chainsaw & Toasters", "igt", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687ec7817f24c659333b97f3.jpeg", "IGT S2000 16-inch 2 coin. Enhanced sound, TITO, updated bill validator.", "IGT S2000 16-inch"],
  ["igt-s2000-double-diamond-16", "IGT S2000 Double Diamond (16\" Classic)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687f11b4023a38e70f926ec3.jpeg", "Classic IGT S2000 16-inch Double Diamond 2 coin. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],
  ["igt-s2000-double-diamond-16-alt", "IGT S2000 Double Diamond (16\" Three-reel)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687f122598b6880c5d8e8480.jpeg", "Classic three-reel S2000 Double Diamond. Enhanced sound, TITO, updated bill validator.", "IGT S2000 16-inch"],
  ["igt-s2000-double-gold", "IGT S2000 Double Gold", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687f12c1bf6969097913406a.jpeg", "IGT S2000 16-inch Double Gold 3 coin. Enhanced sound, TITO, updated bill validator.", "IGT S2000 16-inch"],
  ["igt-s2000-double-mystical-mermaid", "IGT S2000 Double Mystical Mermaid", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687f1323d553961a6de34ac8.jpeg", "IGT S2000 16-inch Double Mystical Mermaid 2 coin. Enhanced sound, TITO.", "IGT S2000 16-inch"],
  ["igt-s2000-five-times-pay-16", "IGT S2000 Five Times Pay (16-inch)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687f13ed98b688381d8e85e0.jpeg", "IGT S2000 16-inch Five Times Pay 2 coin. Enhanced sound, TITO.", "IGT S2000 16-inch"],
  ["igt-s2000-five-times-pay-classic", "IGT S2000 Five Times Pay Classic Three-Reel", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687f978c8ffd9e3ab2af5f89.jpeg", "Classic three-reel S2000 Five Times Pay. Enhanced sound, TITO, updated bill validator.", "IGT S2000 16-inch"],
  ["igt-s2000-fox-and-hound", "IGT S2000 Fox & Hound", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687f99779a4c2d2db191fcf9.jpeg", "Themed IGT S2000 Fox & Hound. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],
  ["igt-s2000-i-dream-of-jeannie", "IGT S2000 I Dream Of Jeannie", "igt", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687f9bf22517f1db61374fe9.jpeg", "Themed IGT S2000 I Dream Of Jeannie 3 coin. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],
  ["igt-s2000-rwb-wild-star", "IGT S2000 R/W/B Wild Star", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687f9ca99a4c2d2cee92017c.jpeg", "IGT S2000 Red, White, Blue Wild Star 2 coin. Enhanced sound, TITO.", "IGT S2000 16-inch"],
  ["igt-s2000-seven-strike", "IGT S2000 Seven Strike", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687f9d448ffd9e2ed5af68f5.jpeg", "IGT S2000 Seven Strike 2 coin. Enhanced sound, TITO, updated bill validator.", "IGT S2000 16-inch"],
  ["igt-s2000-sizzling-7s-3coin", "IGT S2000 Sizzling 7's (3 Coin)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687f9d7f593c8970e5c19b75.jpeg", "IGT S2000 Sizzling 7's 3 coin variant. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],
  ["igt-s2000-10x-pay", "IGT S2000 10x Pay", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687f9df29a702eedfc0449a4.jpeg", "IGT S2000 10 Times Pay 2 coin. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],
  ["igt-s2000-titanic-floating", "IGT S2000 Titanic Floating", "igt", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687f9e4cf514b781b2092ddb.jpeg", "Themed IGT S2000 Titanic Floating 3 coin. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],
  ["igt-s2000-top-ten", "IGT S2000 Top Ten", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fa026023a384a99941427.jpeg", "IGT S2000 Top Ten 2 coin. Enhanced sound, TITO, updated bill validator.", "IGT S2000 16-inch"],
  ["igt-s2000-triple-butterfly-sevens", "IGT S2000 Triple Butterfly Sevens (16-inch)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fa1e1023a381f759415fa.jpeg", "IGT S2000 Triple Butterfly Sevens 3 coin. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],
  ["igt-s2000-triple-cash", "IGT S2000 Triple Cash", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fa3a39a4c2d4eed920d99.jpeg", "IGT S2000 Triple Cash 2 coin. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],
  ["igt-s2000-crystal-sevens", "IGT S2000 Crystal Sevens", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fa4848ffd9e3c9baf8e7d.jpeg", "IGT S2000 Crystal Sevens 3 coin with topper option. Enhanced sound, TITO.", "IGT S2000 16-inch"],
  ["igt-s2000-triple-diamond-classic", "IGT S2000 Triple Diamond Classic Multiplier", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fa4ff8ffd9e41d3af8f48.jpeg", "Classic IGT S2000 Triple Diamond multiplier. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],
  ["igt-s2000-triple-diamond-deluxe", "IGT S2000 Triple Diamond Deluxe", "igt", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fa53f63e8e9400ce5ed61.jpeg", "IGT S2000 Triple Diamond Deluxe 2 coin. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],
  ["igt-s2000-triple-double-diamond", "IGT S2000 Triple Double Diamond", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fa58f9a702e7bd7045659.jpeg", "IGT S2000 Triple Double Diamond 3 coin. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],
  ["igt-s2000-triple-double-lucky-7s", "IGT S2000 Triple Double Lucky 7's", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fa61e593c8923d3c1bae2.jpeg", "IGT S2000 Triple Double Lucky 7's 3 coin. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],
  ["igt-s2000-triple-double-stars-5line", "IGT S2000 Triple Double Stars (5 Line)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fa928e565bcf64513a756.jpeg", "IGT S2000 Triple Double Stars 5 coin 5 line. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],
  ["igt-s2000-triple-double-stars-2coin", "IGT S2000 Triple Double Stars (2 Coin)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fa9fa023a387cfd952bc4.jpeg", "IGT S2000 Triple Double Stars 2 coin. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],
  ["igt-s2000-triple-double-stars-3coin", "IGT S2000 Triple Double Stars (3 Coin)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fab092517f12042387dd4.jpeg", "IGT S2000 Triple Double Stars 3 coin. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],
  ["igt-s2000-triple-double-strike", "IGT S2000 Triple Double Strike", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fab5563e8e980e8e6ba90.jpeg", "IGT S2000 Triple Double Strike 3 coin. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],
  ["igt-s2000-triple-jackpot-3x9x", "IGT S2000 Triple Jackpot 3x9x", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687faeaef514b779170a1f41.jpeg", "IGT S2000 Triple Jackpot 3x9x multiplier 3 coin. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],
  ["igt-s2000-triple-double-wild-cherry", "IGT S2000 Triple Double Wild Cherry", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fada2023a38274e95311d.jpeg", "IGT S2000 Triple Double Wild Cherry 2 coin. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],
  ["igt-s2000-triple-lucky-7s-5line", "IGT S2000 Triple Lucky 7's (5 Line)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fb0069a4c2d2e3392f9d1.jpeg", "IGT S2000 Triple Lucky 7's 5 coin 5 line. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],
  ["igt-s2000-triple-red-hot-7s-2coin", "IGT S2000 Triple Red Hot 7's (2 Coin)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fb69063e8e94a51e6dd1a.jpeg", "IGT S2000 Triple Red Hot 7's 2 coin. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],
  ["igt-s2000-triple-red-hot-7s-3coin", "IGT S2000 Triple Red Hot 7's (3 Coin)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fb7baf514b7767c0a431e.jpeg", "IGT S2000 Triple Red Hot 7's 3 coin. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],
  ["igt-s2000-triple-lucky-7s-2coin", "IGT S2000 Triple Lucky 7's (2 Coin)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687faf7b9a4c2d7a8892f8e5.jpeg", "IGT S2000 Triple Lucky 7's 2 coin. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],
  ["igt-s2000-triple-zesty-hot-peppers", "IGT S2000 Triple Zesty Hot Peppers", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fc2c49a702e15f905af60.jpeg", "IGT S2000 Triple Zesty Hot Peppers 2 coin. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],
  ["igt-s2000-wild-cherry-2coin", "IGT S2000 Wild Cherry (2 Coin)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fc35c593c898403c309c2.jpeg", "IGT S2000 Wild Cherry 2 coin. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],
  ["igt-s2000-triple-star", "IGT S2000 Triple Star (2 Coin)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fba5d63e8e95124e6eac6.jpeg", "IGT S2000 Triple Star 2 coin. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],
  ["igt-s2000-triple-stars-3coin-alt", "IGT S2000 Triple Stars (3 Coin Alt)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fc28b63e8e92d75e6f5ef.jpeg", "IGT S2000 Triple Stars 3 coin. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],
  ["igt-s2000-wild-cherry-3coin", "IGT S2000 Wild Cherry (3 Coin)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fc5808ffd9e6f10b0c305.jpeg", "IGT S2000 Wild Cherry 3 coin. Enhanced sound, TITO, updated validator.", "IGT S2000 16-inch"],

  // ─── IGT S2000 Bonus Games ───
  ["igt-s2000-2x-3x-burning-bars", "IGT S2000 2x 3x Burning Bars", "igt", "reel", 999, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688cf0956bfb1ced3f80ae95.jpeg", "IGT S2000 Bonus Games 2x 3x Burning Bars. Enhanced sound, TITO, updated bill validator, one-year warranty.", "IGT S2000 Bonus"],
  ["igt-s2000-big-times-pay", "IGT S2000 Big Times Pay", "igt", "reel", 899, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688cf0c86bfb1c75e280b445.jpeg", "IGT S2000 with bonus reel and 3 coin play. Enhanced sound, TITO, one-year warranty.", "IGT S2000 Bonus"],
  ["igt-s2000-big-times-pay-reel", "IGT S2000 Big Times Pay Reel", "igt", "reel", 899, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688cf0f27834ac2a5859781e.jpeg", "IGT S2000 Big Times Pay with bonus reel, 3 coin. Enhanced sound, TITO, one-year warranty.", "IGT S2000 Bonus"],
  ["igt-s2000-black-pearl-sevens", "IGT S2000 Black Pearl Sevens", "igt", "reel", 999, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688cf15d774af24434769084.jpeg", "IGT S2000 Black Pearl Sevens with free game feature. Enhanced sound, TITO, one-year warranty.", "IGT S2000 Bonus"],
  ["igt-s2000-diamond-stars", "IGT S2000 Diamond Stars", "igt", "reel", 899, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688cf209baf2afd8c5a34a94.jpeg", "IGT S2000 Diamond Stars with bonus reel, 3 coin. Enhanced sound, TITO, one-year warranty.", "IGT S2000 Bonus"],
  ["igt-s2000-haywire-bonus", "IGT S2000 Haywire (Bonus Reel)", "igt", "reel", 899, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688cf23f0b03e1ee6741255a.jpeg", "IGT S2000 Haywire with bonus reel, 2 coin. Enhanced sound, TITO, one-year warranty.", "IGT S2000 Bonus"],
  ["igt-s2000-super-reel-charms", "IGT S2000 Super Reel Charms", "igt", "reel", 999, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688cf29631b511f622360558.jpeg", "IGT S2000 Super Reel Charms with free game feature. Enhanced sound, TITO, one-year warranty.", "IGT S2000 Bonus"],
  ["igt-s2000-super-spin-sizzling-sevens", "IGT S2000 Super Spin Sizzling Sevens", "igt", "reel", 899, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688cf2e7baf2af38b4a35837.jpeg", "IGT S2000 Super Spin Sizzling Sevens with bonus reel, 3 coin, optional topper. Enhanced sound, TITO.", "IGT S2000 Bonus"],
  ["igt-s2000-super-spin-sizzling-sevens-alt", "IGT S2000 Super Spin Sizzling Sevens (Alt)", "igt", "reel", 899, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688cf7bd49458d157280010b.jpeg", "Alternate cabinet IGT S2000 Super Spin Sizzling Sevens with bonus reel 3 coin. Enhanced sound, TITO.", "IGT S2000 Bonus"],
  ["igt-s2000-super-times-pay", "IGT S2000 Super Times Pay 2x3x4x5x", "igt", "reel", 999, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688cf803baf2af943aa3c93a.jpeg", "IGT S2000 Super Times Pay free game multiplier. Enhanced sound, TITO, one-year warranty.", "IGT S2000 Bonus"],
  ["igt-s2000-triple-double-diamond-bonus", "IGT S2000 Triple Double Diamond (Bonus)", "igt", "reel", 999, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688cf858baf2af75a0a3c9ac.jpeg", "IGT S2000 Triple Double Diamond with free games feature. Enhanced sound, TITO, one-year warranty.", "IGT S2000 Bonus"],

  // ─── Bally M9000 (Alpha 1 video) ───
  ["bally-arctic-treasures", "Bally Arctic Treasures", "bally", "video", 1050, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687f9e1c593c891080c19c91.jpeg", "Bally Alpha 1 video slot with multi-line, multi-coin play, TITO, 19-inch LCD.", "Bally Alpha 1"],
  ["bally-bonus-frenzy", "Bally Bonus Frenzy", "bally", "video", 1050, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687f9e51593c8942d3c19cc7.jpeg", "Bally Alpha 1 Bonus Frenzy video slot. Multi-line, multi-coin, TITO, 19-inch LCD.", "Bally Alpha 1"],
  ["bally-fairy-play", "Bally Fairy Play", "bally", "video", 1050, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687f9ea0e565bc488812b3d3.jpeg", "Bally Alpha 1 Fairy Play video slot. Multi-line, multi-coin, TITO, 19-inch LCD.", "Bally Alpha 1"],
  ["bally-lucky-luigis-pizzeria", "Bally Lucky Luigi's Pizzeria", "bally", "video", 1050, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687f9ee0bf6969019e154bfe.jpeg", "Bally Alpha 1 themed video slot Lucky Luigi's Pizzeria. Multi-line, multi-coin, TITO.", "Bally Alpha 1"],
  ["bally-ms-clara-t", "Bally Ms Clara T", "bally", "video", 1050, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687f9f5c593c89963bc19de4.jpeg", "Bally Alpha 1 Ms Clara T video slot. Multi-line, multi-coin, TITO, 19-inch LCD.", "Bally Alpha 1"],
  ["bally-ny-gold", "Bally NY Gold", "bally", "video", 1050, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687f9fa663e8e933e7e5df3c.jpeg", "Bally Alpha 1 NY Gold video slot. Multi-line, multi-coin, TITO, 19-inch LCD.", "Bally Alpha 1"],
  ["bally-pirate-beach", "Bally Pirate Beach", "bally", "video", 1050, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687f9fdd9a4c2d04989205c9.jpeg", "Bally Alpha 1 Pirate Beach video slot. Multi-line, multi-coin, TITO, 19-inch LCD.", "Bally Alpha 1"],
  ["bally-river-wild", "Bally River Wild", "bally", "video", 1050, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fa03a593c89860dc19ec1.jpeg", "Bally Alpha 1 River Wild video slot. Multi-line, multi-coin, TITO, 19-inch LCD.", "Bally Alpha 1"],
  ["bally-sh-green-stamps", "Bally S&H Green Stamps", "bally", "video", 1050, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fa0938ffd9e8876af6ddf.jpeg", "Bally Alpha 1 S&H Green Stamps themed video slot. Multi-line, multi-coin, TITO.", "Bally Alpha 1"],

  // ─── Bally S9000 mechanical reels ───
  ["bally-s9000-black-gold-quick-hit", "Bally S9000 Black & Gold Quick Hit", "bally", "reel", 950, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fa3d99a4c2dd271920dee.jpeg", "Bally S9000 with Quick Hit bonus game. Multi-line, multi-coin, TITO, upper LCD for bonus animations.", "Bally S9000"],
  ["bally-s9000-black-white-sevens", "Bally S9000 Black & White Sevens", "bally", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fa4ba593c898561c1b3c9.jpeg", "Bally S9000 Black & White Sevens. Multi-line, multi-coin, TITO, upper LCD for progressive jackpots.", "Bally S9000"],
  ["bally-s9000-bonus-sevens", "Bally S9000 Bonus Sevens", "bally", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fa4e0023a380d3f942169.jpeg", "Bally S9000 Bonus Sevens with multi-line, multi-coin play. TITO, upper LCD progressive.", "Bally S9000"],
  ["bally-s9000-bonus-times", "Bally S9000 Bonus Times", "bally", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fa510593c897951c1b430.jpeg", "Bally S9000 Bonus Times with multi-line, multi-coin play. TITO, upper LCD for progressive.", "Bally S9000"],
  ["bally-s9000-hee-haw", "Bally S9000 Hee Haw", "bally", "reel", 950, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fa567e565bc567f12bca9.jpeg", "Bally S9000 Hee Haw themed mechanical reel. Multi-line, multi-coin, TITO, upper LCD progressive.", "Bally S9000"],
  ["bally-s9000-power-progressive", "Bally S9000 Power Progressive", "bally", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fa58df514b7444d093891.jpeg", "Bally S9000 Power Progressive. Multi-line, multi-coin, TITO, upper LCD for progressive jackpots.", "Bally S9000"],
  ["bally-s9000-stars-bars-quick-hit", "Bally S9000 Stars & Bars Quick Hit", "bally", "reel", 950, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fa5c78ffd9e81c9af9066.jpeg", "Bally S9000 Stars & Bars with Quick Hit bonus. Multi-line, multi-coin, TITO, upper LCD.", "Bally S9000"],
  ["bally-s9000-winning-times", "Bally S9000 Winning Times", "bally", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fa641593c890b41c1c40a.jpeg", "Bally S9000 Winning Times. Multi-line, multi-coin, TITO, upper LCD for progressive.", "Bally S9000"],

  // ─── Konami Video K2V ───
  ["konami-african-diamond", "Konami African Diamond", "konami", "video", 950, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/68815b8a1933f6f7eac16944.jpeg", "Konami K2V African Diamond with bonus features, multi-line, multi-coin, 19-inch LCD.", "Konami K2V"],
  ["konami-china-mystery", "Konami China Mystery", "konami", "video", 1050, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/68815bc312dceafa5297a4c3.jpeg", "Konami K2V China Mystery with bonus features, multi-line, multi-coin, 19-inch LCD.", "Konami K2V"],
  ["konami-china-shores-dual-screen", "Konami China Shores Dual Screen", "konami", "video", 1250, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/68815bf02c4791827cdd4c6c.jpeg", "Konami K2V dual-screen China Shores. Bonus features, multi-line, 19-inch LCD.", "Konami K2V Dual"],
  ["konami-china-shores-extra-rewards-dual", "Konami China Shores Extra Rewards Dual Screen", "konami", "video", 1250, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/68815c5912dceac4cd97a569.jpeg", "Konami K2V dual-screen China Shores with Extra Rewards. Bonus features, multi-line.", "Konami K2V Dual"],
  ["konami-china-shores-extra-reward", "Konami China Shores Extra Reward", "konami", "video", 1150, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/68815c861933f61b53c16a10.jpeg", "Konami K2V China Shores Extra Reward. Bonus features, multi-line, 19-inch LCD.", "Konami K2V"],
  ["konami-china-shores", "Konami China Shores", "konami", "video", 1050, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/68815f5e6bfa59c602c8b242.jpeg", "Konami K2V cult-favorite China Shores. Bonus features, multi-line, 19-inch LCD.", "Konami K2V"],
  ["konami-chip-city", "Konami Chip City", "konami", "video", 950, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/68815f966bfa59d463c8b27e.jpeg", "Konami K2V Chip City. Bonus features, multi-line, multi-coin, 19-inch LCD.", "Konami K2V"],
  ["konami-clairvoyant-cat-dual", "Konami Clairvoyant Cat Dual Screen", "konami", "video", 1250, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/68815fe12064d26184077d3b.jpeg", "Konami K2V dual-screen Clairvoyant Cat with Extra Rewards. Bonus, multi-line.", "Konami K2V Dual"],
  ["konami-lion-festival-dual", "Konami Lion Festival Dual Screen", "konami", "video", 1250, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6881601a2064d2bba0077d4f.jpeg", "Konami K2V dual-screen Lion Festival with Extra Rewards. Bonus, multi-line.", "Konami K2V Dual"],
  ["konami-mayan-chief-dual", "Konami Mayan Chief Dual Screen", "konami", "video", 1150, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688160c32064d268dc077dba.jpeg", "Konami K2V dual-screen Mayan Chief. Bonus features, multi-line, 19-inch LCD.", "Konami K2V Dual"],
  ["konami-pirates-rose-extra-rewards", "Konami Pirates Rose Extra Rewards", "konami", "video", 1150, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688167272c4791513bdd5adc.jpeg", "Konami K2V Pirates Rose with Extra Rewards. Bonus features, multi-line, 19-inch LCD.", "Konami K2V"],
  ["konami-panda-power-dual", "Konami Panda Power Dual Screen", "konami", "video", 1150, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/68816626744d7e5cbed7b12d.jpeg", "Konami K2V dual-screen Panda Power. Bonus features, multi-line, 19-inch LCD.", "Konami K2V Dual"],
  ["konami-rapa-nui-riches", "Konami Rapa Nui Riches", "konami", "video", 950, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6881667d4660fe836435dce5.jpeg", "Konami K2V Rapa Nui Riches. Bonus features, multi-line, 19-inch LCD.", "Konami K2V"],
  ["konami-roman-tribune", "Konami Roman Tribune", "konami", "video", 950, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6881676b4660fe5e4635dd9d.jpeg", "Konami K2V Roman Tribune. Bonus features, multi-line, multi-coin, 19-inch LCD.", "Konami K2V"],

  // ─── WMS Williams BB1 video reels ───
  ["wms-all-that-glitters", "WMS All That Glitters", "williams", "video", 1099, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688180832064d24f7909e911.jpeg", "WMS BB1 All That Glitters with bonus features, multi-line, multi-coin, 19-inch LCD, TITO.", "WMS BB1"],
  ["wms-blazing-phoenix", "WMS Blazing Phoenix", "williams", "video", 1099, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6881811a4660fe790037c28d.jpeg", "WMS BB1 Blazing Phoenix. Bonus features, multi-line, multi-coin, 19-inch LCD, TITO.", "WMS BB1"],
  ["wms-brazilian-beauty", "WMS Brazilian Beauty", "williams", "video", 1099, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6881815d2dd54f71d61b04eb.jpeg", "WMS BB1 Brazilian Beauty. Bonus features, multi-line, multi-coin, 19-inch LCD, TITO.", "WMS BB1"],
  ["wms-cafe-mula", "WMS Cafe Mula", "williams", "video", 1099, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6881818c1933f63c3fc3a853.jpeg", "WMS BB1 Cafe Mula. Bonus features, multi-line, multi-coin, 19-inch LCD, TITO.", "WMS BB1"],
  ["wms-cascade-mountain", "WMS Cascade Mountain", "williams", "video", 1099, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688181b8744d7e0f02d9a582.jpeg", "WMS BB1 Cascade Mountain. Bonus features, multi-line, multi-coin, 19-inch LCD, TITO.", "WMS BB1"],
  ["wms-crystal-forest", "WMS Crystal Forest", "williams", "video", 1099, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688181f7e69c95720221c174.jpeg", "WMS BB1 Crystal Forest. Bonus features, multi-line, multi-coin, 19-inch LCD, TITO.", "WMS BB1"],
  ["wms-gold-fish", "WMS Gold Fish", "williams", "video", 1799, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6881822fe69c951b4821c194.jpeg", "Premium WMS BB1 Gold Fish — iconic bonus rounds. Multi-line, multi-coin, 19-inch LCD, TITO.", "WMS BB1"],
  ["wms-village-people-party", "WMS Village People Party", "williams", "video", 1099, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688188f16bfa59c564cb7d02.jpeg", "WMS BB1 Village People Party. Bonus features, multi-line, multi-coin, 19-inch LCD, TITO.", "WMS BB1"],
  ["wms-golden-pearl", "WMS Golden Pearl", "williams", "video", 1099, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6881826a6bfa598e3ccae8a6.jpeg", "WMS BB1 Golden Pearl. Bonus features, multi-line, multi-coin, 19-inch LCD, TITO.", "WMS BB1"],
  ["wms-great-eagle", "WMS Great Eagle", "williams", "video", 1099, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688182ae2064d21a9b09eb1a.jpeg", "WMS BB1 Great Eagle. Bonus features, multi-line, multi-coin, 19-inch LCD, TITO.", "WMS BB1"],
  ["wms-griffin-gate", "WMS Griffin Gate", "williams", "video", 1099, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688182e84660fe6bd437c3f6.jpeg", "WMS BB1 Griffin Gate. Bonus features, multi-line, multi-coin, 19-inch LCD, TITO.", "WMS BB1"],
  ["wms-high-speed", "WMS High Speed", "williams", "video", 1099, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6881830fdefb7ae0aff18c1c.jpeg", "WMS BB1 High Speed. Bonus features, multi-line, multi-coin, 19-inch LCD, TITO.", "WMS BB1"],
  ["wms-invaders-planet-moolah", "WMS Invaders of Planet Moolah", "williams", "video", 1099, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6881833d1933f642d5c3a907.jpeg", "WMS BB1 Invaders of Planet Moolah. Bonus features, multi-line, multi-coin, 19-inch LCD, TITO.", "WMS BB1"],
  ["wms-running-wild", "WMS Running Wild", "williams", "video", 1099, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688188982dd54fd3971b8de1.jpeg", "WMS BB1 Running Wild. Bonus features, multi-line, multi-coin, 19-inch LCD, TITO.", "WMS BB1"],
  ["wms-jungle-wild-ii", "WMS Jungle Wild II", "williams", "video", 1099, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688183841933f60ed7c3a938.jpeg", "WMS BB1 Jungle Wild II. Bonus features, multi-line, multi-coin, 19-inch LCD, TITO.", "WMS BB1"],
  ["wms-jungle-wild", "WMS Jungle Wild", "williams", "video", 1099, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688183b82dd54f82bc1b05ec.jpeg", "WMS BB1 Jungle Wild. Bonus features, multi-line, multi-coin, 19-inch LCD, TITO.", "WMS BB1"],
  ["wms-kaboom", "WMS Kaboom", "williams", "video", 1099, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688183f4e69c95862e21c284.jpeg", "WMS BB1 Kaboom. Bonus features, multi-line, multi-coin, 19-inch LCD, TITO.", "WMS BB1"],
  ["wms-keepin-up-with-jones", "WMS Keepin Up With Jones", "williams", "video", 1099, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688184292c47917f61dfc0fd.jpeg", "WMS BB1 Keepin Up With Jones. Bonus features, multi-line, multi-coin, 19-inch LCD, TITO.", "WMS BB1"],
  ["wms-kilauea", "WMS Kilauea", "williams", "video", 1099, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/68818464e69c95890421c6fb.jpeg", "WMS BB1 Kilauea. Bonus features, multi-line, multi-coin, 19-inch LCD, TITO.", "WMS BB1"],
  ["wms-super-jackpot-party", "WMS Super Jackpot Party", "williams", "video", 1099, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/68818848744d7e20bfda3ec1.jpeg", "WMS BB1 iconic Super Jackpot Party with pick bonus. Multi-line, multi-coin, 19-inch LCD, TITO.", "WMS BB1"],
  ["wms-lucky-lemmings", "WMS Lucky Lemming$", "williams", "video", 1099, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688184ade69c9531f121c711.jpeg", "WMS BB1 Lucky Lemming$. Bonus features, multi-line, multi-coin, 19-inch LCD, TITO.", "WMS BB1"],
  ["wms-magic-times", "WMS Magic Times", "williams", "video", 1099, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688185631933f64acbc3c0c5.jpeg", "WMS BB1 Magic Times. Bonus features, multi-line, multi-coin, 19-inch LCD, TITO.", "WMS BB1"],
  ["wms-palace-riches-ii", "WMS Palace Riches II", "williams", "video", 1099, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688185c1744d7e21bdd9e4db.jpeg", "WMS BB1 Palace Riches II. Bonus features, multi-line, multi-coin, 19-inch LCD, TITO.", "WMS BB1"],
  ["wms-reel-rich-reels", "WMS Reel Rich Reels", "williams", "video", 1099, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688185fc2dd54f785d1b54c4.jpeg", "WMS BB1 Reel Rich Reels. Bonus features, multi-line, multi-coin, 19-inch LCD, TITO.", "WMS BB1"],
  ["wms-roman-dynasty", "WMS Roman Dynasty", "williams", "video", 1099, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688187c62c4791b8d8e0461b.jpeg", "WMS BB1 Roman Dynasty. Bonus features, multi-line, multi-coin, 19-inch LCD, TITO.", "WMS BB1"],
];

function defaultSpecsFor(brand: BrandSlug, type: MachineType, cabinet?: string): Record<string, string> {
  const manufacturer = brandLabels[brand];
  const common = {
    Manufacturer: manufacturer,
    "Bill Validator": "Updated validator accepting $1–$100",
    "Power": "110V standard household outlet",
    "Warranty": "1-year home-use warranty",
  };
  if (type === "reel") {
    return {
      ...common,
      Platform: cabinet ?? "Mechanical Reel",
      Reels: "3-reel mechanical",
      Denomination: "$0.25 (configurable)",
      Dimensions: '27"W x 22"D x 42"H',
      Weight: "~230 lbs",
    };
  }
  if (type === "video") {
    return {
      ...common,
      Platform: cabinet ?? "Video Cabinet",
      Display: '19" LCD',
      Denomination: "Penny (configurable)",
      Dimensions: '25"W x 24"D x 52"H',
      Weight: "~275 lbs",
    };
  }
  if (type === "video-poker") {
    return {
      ...common,
      Platform: cabinet ?? "IGT Game King",
      Display: '17"–19" LCD',
      Games: "31 or 118 game multi-game",
      Denomination: "$0.25 (configurable)",
      Dimensions: '24"W x 24"D x 48"H',
      Weight: "~260 lbs",
    };
  }
  return common;
}

function defaultHighlights(type: MachineType) {
  if (type === "reel") {
    return [
      "Classic mechanical reel action",
      "Enhanced sound package",
      "Ticket In – Ticket Out (TITO)",
      "Updated bill validator ($1–$100)",
      "1-year home-use warranty",
    ];
  }
  if (type === "video") {
    return [
      "Multi-line, multi-coin video play",
      "Bonus rounds + enhanced sound",
      "Ticket In – Ticket Out (TITO)",
      "19-inch LCD display",
      "1-year home-use warranty",
    ];
  }
  if (type === "video-poker") {
    return [
      "Multi-game poker suite",
      "Jacks or Better through Deuces Wild",
      "17-inch or 19-inch LCD",
      "Updated bill validator",
      "1-year home-use warranty",
    ];
  }
  return ["Professionally refurbished", "1-year home-use warranty"];
}

function buildMachine(seed: Seed): Machine {
  const [slug, name, brand, type, price, image, description, cabinet] = seed;
  const isReel = type === "reel";
  return {
    slug,
    name,
    brand,
    brandLabel: brandLabels[brand],
    type,
    price,
    denomination: isReel ? "$0.25" : "$0.01",
    reels: type === "video-poker" ? 0 : isReel ? 3 : 5,
    cabinet,
    condition: "Professionally Refurbished",
    inStock: 1,
    image,
    tagline: description.length > 120 ? description.slice(0, 117) + "…" : description,
    description:
      description +
      " Professionally refurbished by certified technicians at Used Slot Shop's Kingman, Arizona warehouse. Ships freight on an insured pallet nationwide.",
    highlights: defaultHighlights(type),
    specs: defaultSpecsFor(brand, type, cabinet),
  };
}

// Deduplicate slugs in case any collide (append -2, -3, etc.)
const seenSlugs = new Set<string>();
const _uniqueSeeds = SEEDS.map((s) => {
  let slug = s[0];
  let i = 2;
  while (seenSlugs.has(slug)) {
    slug = `${s[0]}-${i++}`;
  }
  seenSlugs.add(slug);
  return [slug, ...s.slice(1)] as Seed;
});

export const machines: Machine[] = _uniqueSeeds.map(buildMachine);

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
    .filter(
      (m) => m.slug !== slug && (m.brand === current.brand || m.type === current.type)
    )
    .slice(0, limit);
}
