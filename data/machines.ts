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

  // ─── Aristocrat Mark V ───
  ["aristocrat-mark-v-50-dragons", "Aristocrat Mark V 50 Dragons", "aristocrat", "video", 1050, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687509402cf81d397e6f53bf.jpeg", "Aristocrat Mark V coinless 50 Dragons. Bonus features, multi-line, multi-coin, 19-inch LCD, TITO, updated bill validator.", "Aristocrat Mark V"],
  ["aristocrat-mark-v-buffalo", "Aristocrat Mark V Buffalo", "aristocrat", "video", 1150, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687f99ab593c8986fdc195c8.jpeg", "Aristocrat Mark V coinless Buffalo — the iconic floor favorite. Bonus features, multi-line, multi-coin, 19-inch LCD, TITO.", "Aristocrat Mark V"],
  ["aristocrat-mark-v-tiki-torch", "Aristocrat Mark V Tiki Torch", "aristocrat", "video", 1050, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687f99f52517f1290f374d5b.jpeg", "Aristocrat Mark V coinless Tiki Torch. Bonus features, multi-line, multi-coin, 19-inch LCD, TITO, updated bill validator.", "Aristocrat Mark V"],

  // ─── IGT I+ 044 Video Slots (17-19" LCD round top) ───
  ["igt-video-044-cleopatra-2", "IGT Cleopatra 2 (I+ 044)", "igt", "video", 1850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6878d1a357dd6048c582126e.jpeg", "IGT I+ 044 platform. Multi-line, multi-coin with 17-inch LCD, bonus features, enhanced sound.", "IGT I+ 044"],
  ["igt-video-044-bombay", "IGT Bombay (I+ 044)", "igt", "video", 1850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/68796bb457dd602f3b84c94a.jpeg", "IGT I+ 044 platform. Multi-line, multi-coin with 17-inch LCD, bonus features, enhanced sound.", "IGT I+ 044"],
  ["igt-video-044-cats", "IGT Cats (I+ 044)", "igt", "video", 1950, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/68796cb357dd606e7784ca9d.jpeg", "IGT I+ 044 platform. Multi-line, multi-coin with 19-inch LCD, bonus features, enhanced sound.", "IGT I+ 044"],
  ["igt-video-044-coyote-moon", "IGT Coyote Moon (I+ 044)", "igt", "video", 1950, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687971d257dd60120484d047.jpeg", "IGT I+ 044 platform. Multi-line, multi-coin with 19-inch LCD, bonus features, enhanced sound.", "IGT I+ 044"],
  ["igt-video-044-davinci-diamonds", "IGT Davinci Diamonds (I+ 044)", "igt", "video", 1950, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687972487cef1e296dd5e5e9.jpeg", "IGT I+ 044 platform. Multi-line, multi-coin with 19-inch LCD, bonus features, enhanced sound.", "IGT I+ 044"],
  ["igt-video-044-wolf-run", "IGT Wolf Run (I+ 044)", "igt", "video", 1950, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879bd80a648333986d25137.jpeg", "IGT I+ 044 platform Wolf Run. Multi-line, multi-coin with 19-inch LCD, bonus features.", "IGT I+ 044"],
  ["igt-video-044-nefertiti", "IGT Nefertiti (I+ 044)", "igt", "video", 1950, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/68797568ce9e18d08fe7f2de.jpeg", "IGT I+ 044 platform Nefertiti. Multi-line, multi-coin with 19-inch LCD, bonus features.", "IGT I+ 044"],
  ["igt-video-044-elviras-secret", "IGT Elvira's Secret (I+ 044)", "igt", "video", 1850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/68797491db7a3ef492ec8671.jpeg", "IGT I+ 044 Elvira's Secret. Multi-line, multi-coin with 17-inch LCD, bonus features.", "IGT I+ 044"],
  ["igt-video-044-ducks-in-a-row", "IGT Ducks in a Row (I+ 044)", "igt", "video", 1950, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879744fce9e186f56e7f1ee.jpeg", "IGT I+ 044 platform. Multi-line, multi-coin with 19-inch LCD, bonus features.", "IGT I+ 044"],
  ["igt-video-044-noahs-ark", "IGT Noah's Ark (I+ 044)", "igt", "video", 1850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879759b57dd601b9484d625.jpeg", "IGT I+ 044 Noah's Ark. Multi-line, multi-coin with 17-inch LCD, bonus features.", "IGT I+ 044"],
  ["igt-video-044-lotus-flower", "IGT Lotus Flower (I+ 044)", "igt", "video", 1850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687975d06ccf564053a9c57e.jpeg", "IGT I+ 044 Lotus Flower. Multi-line, multi-coin with 17-inch LCD, bonus features.", "IGT I+ 044"],
  ["igt-video-044-jackpot-jewels", "IGT Jackpot Jewels (I+ 044)", "igt", "video", 1850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687975455d37ba9c0259683a.jpeg", "IGT I+ 044 Jackpot Jewels. Multi-line, multi-coin with 17-inch LCD, bonus features.", "IGT I+ 044"],
  ["igt-video-044-russian-treasure", "IGT Russian Treasure (I+ 044)", "igt", "video", 1850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/68797646db7a3e71bbec87d4.jpeg", "IGT I+ 044 Russian Treasure. Multi-line, multi-coin with 17-inch LCD, bonus features.", "IGT I+ 044"],
  ["igt-video-044-treasures-of-troy", "IGT Treasures of Troy (I+ 044)", "igt", "video", 1950, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687976eba6483366e0d1ec0d.jpeg", "IGT I+ 044 Treasures of Troy. Multi-line, multi-coin with 19-inch LCD, bonus features.", "IGT I+ 044"],
  ["igt-video-044-white-orchid-round-top", "IGT White Orchid Round Top (I+ 044)", "igt", "video", 1850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879773a817a8466500b58c6.jpeg", "IGT I+ 044 White Orchid Round Top. Multi-line, multi-coin with 17-inch LCD, bonus features.", "IGT I+ 044"],
  ["igt-video-044-shake-your-booty", "IGT Shake Your Booty (I+ 044)", "igt", "video", 1850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687976b6a64833a0bfd1ebb0.jpeg", "IGT I+ 044 Shake Your Booty. Multi-line, multi-coin with 17-inch LCD, bonus features.", "IGT I+ 044"],
  ["igt-video-044-white-orchid", "IGT White Orchid (I+ 044)", "igt", "video", 1850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6879bd55922709131bc5b030.jpeg", "IGT I+ 044 White Orchid. Multi-line, multi-coin with 17-inch LCD, bonus features.", "IGT I+ 044"],

  // ─── IGT I+ 3902 Video Slots (9-line) ───
  ["igt-vs9-cleopatra", "IGT Cleopatra (I+ 3902 9-Line)", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687faaa6bf696938091606db.jpeg", "IGT I+ 3902 Cleopatra with bonus features. Multi-line, multi-coin, 17-inch LCD, enhanced sound, TITO, Free Play optional.", "IGT I+ 3902 9-Line"],
  ["igt-vs9-cops-and-donuts", "IGT Cops & Donuts (I+ 3902 9-Line)", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687faad69a702e2e3905762b.jpeg", "IGT I+ 3902 Cops & Donuts with bonus features. Multi-line, multi-coin, 17-inch LCD, TITO.", "IGT I+ 3902 9-Line"],
  ["igt-vs9-creature-black-lagoon", "IGT Creature of the Black Lagoon (I+ 3902 9-Line)", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fabf99a702e959205770d.jpeg", "IGT I+ 3902 Creature of the Black Lagoon with bonus features. 17-inch LCD, TITO, Free Play optional.", "IGT I+ 3902 9-Line"],
  ["igt-vs9-dragons-gold", "IGT Dragons Gold (I+ 3902 9-Line)", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fac22e565bc876813aa49.jpeg", "IGT I+ 3902 Dragons Gold with bonus features. Multi-line, multi-coin, 17-inch LCD, TITO.", "IGT I+ 3902 9-Line"],
  ["igt-vs9-enchanted-unicorn", "IGT Enchanted Unicorn (I+ 3902 9-Line)", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fac56e565bc75af13aa77.jpeg", "IGT I+ 3902 Enchanted Unicorn with bonus features. Multi-line, multi-coin, 17-inch LCD, TITO.", "IGT I+ 3902 9-Line"],
  ["igt-vs9-evel-knievel", "IGT Evel Knievel (I+ 3902 9-Line)", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fac7ff514b7cce00a1c3c.jpeg", "IGT I+ 3902 Evel Knievel with bonus features. Multi-line, multi-coin, 17-inch LCD, TITO.", "IGT I+ 3902 9-Line"],
  ["igt-vs9-ghost-island", "IGT Ghost Island (I+ 3902 9-Line)", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687facb42517f1d775388064.jpeg", "IGT I+ 3902 Ghost Island with bonus features. Multi-line, multi-coin, 17-inch LCD, TITO.", "IGT I+ 3902 9-Line"],
  ["igt-vs9-i-dream-of-jeannie", "IGT I Dream of Jeannie (I+ 3902 9-Line)", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687facf82517f1aa6d3880a4.jpeg", "IGT I+ 3902 I Dream of Jeannie with bonus features. Multi-line, multi-coin, 17-inch LCD, TITO.", "IGT I+ 3902 9-Line"],
  ["igt-vs9-jackpot-jewels", "IGT Jackpot Jewels (I+ 3902 9-Line)", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fad828ffd9ea222b093d4.jpeg", "IGT I+ 3902 Jackpot Jewels with bonus features. Multi-line, multi-coin, 17-inch LCD, TITO.", "IGT I+ 3902 9-Line"],
  ["igt-vs9-kingpin-bowling", "IGT Kingpin Bowling (I+ 3902 9-Line)", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fae449a4c2db43892f78a.jpeg", "IGT I+ 3902 Kingpin Bowling with bonus features. Multi-line, multi-coin, 17-inch LCD, TITO.", "IGT I+ 3902 9-Line"],
  ["igt-vs9-my-rich-uncle", "IGT My Rich Uncle (I+ 3902 9-Line)", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fafb79a702eccce057cfe.jpeg", "IGT I+ 3902 My Rich Uncle with bonus features. Multi-line, multi-coin, 17-inch LCD, TITO.", "IGT I+ 3902 9-Line"],
  ["igt-vs9-mystical-mermaid", "IGT Mystical Mermaid (I+ 3902 9-Line)", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687faff59a4c2d6a9f92f9c4.jpeg", "IGT I+ 3902 Mystical Mermaid with bonus features. Multi-line, multi-coin, 17-inch LCD, TITO.", "IGT I+ 3902 9-Line"],
  ["igt-vs9-pharaohs-fortune", "IGT Pharaoh's Fortune (I+ 3902 9-Line)", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fb0319a702e984e057d9c.jpeg", "IGT I+ 3902 Pharaoh's Fortune with bonus features. Multi-line, multi-coin, 17-inch LCD, TITO.", "IGT I+ 3902 9-Line"],
  ["igt-vs9-munsters-purple", "IGT The Munsters Purple Glass (I+ 3902 9-Line)", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fb309f514b7dd510a359e.jpeg", "IGT I+ 3902 The Munsters (purple glass) with bonus features. 17-inch LCD, TITO.", "IGT I+ 3902 9-Line"],
  ["igt-vs9-risque-business", "IGT Risque Business (I+ 3902 9-Line)", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fb16df514b70a8d0a22b7.jpeg", "IGT I+ 3902 Risque Business with bonus features. Multi-line, multi-coin, 17-inch LCD, TITO.", "IGT I+ 3902 9-Line"],
  ["igt-vs9-super-cherry", "IGT Super Cherry (I+ 3902 9-Line)", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fb1cc9a4c2ddeb192fbc3.jpeg", "IGT I+ 3902 Super Cherry with bonus features. Multi-line, multi-coin, 17-inch LCD, TITO.", "IGT I+ 3902 9-Line"],
  ["igt-vs9-tailgate-party", "IGT Tailgate Party (I+ 3902 9-Line)", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fb20863e8e9802de6c2c4.jpeg", "IGT I+ 3902 Tailgate Party with bonus features. Multi-line, multi-coin, 17-inch LCD, TITO.", "IGT I+ 3902 9-Line"],
  ["igt-vs9-texas-tea", "IGT Texas Tea (I+ 3902 9-Line)", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fb2418ffd9e486fb099e3.jpeg", "IGT I+ 3902 Texas Tea with bonus features. Multi-line, multi-coin, 17-inch LCD, TITO.", "IGT I+ 3902 9-Line"],
  ["igt-vs9-munsters-green", "IGT The Munsters Green Glass (I+ 3902 9-Line)", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fb271023a384a1095375f.jpeg", "IGT I+ 3902 The Munsters (green glass) with bonus features. 17-inch LCD, TITO.", "IGT I+ 3902 9-Line"],
  ["igt-vs9-wild-taxi", "IGT Wild Taxi (I+ 3902 9-Line)", "igt", "video", 1650, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fb3332517f1118238887a.jpeg", "IGT I+ 3902 Wild Taxi with bonus features. Multi-line, multi-coin, 17-inch LCD, TITO.", "IGT I+ 3902 9-Line"],

  // ─── IGT S2000 9-inch top mechanical reels ───
  ["igt-s2000-9top-2345x-times-pay-2c", "IGT S2000 2x3x4x5x Times Pay 2 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fb5b263e8e9fcdae6dc65.jpeg", "IGT S2000 9-top 2x3x4x5x Times Pay 2 coin. Enhanced sound, TITO, Free Play option.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-10x-pay-3c", "IGT S2000 10x Pay 3 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fb5df023a3816a7954a6a.jpeg", "IGT S2000 9-top 10x Pay 3 coin. Enhanced sound, TITO, Free Play option.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-black-cherry-3c", "IGT S2000 Black Cherry 3 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fb6079a4c2d2bf6931d11.jpeg", "IGT S2000 9-top Black Cherry 3 coin. Enhanced sound, TITO, Free Play option.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-crystal-sevens-3c", "IGT S2000 Crystal Sevens 3 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fb62a023a381b91954ac1.jpeg", "IGT S2000 9-top Crystal Sevens 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-crystal-sevens-5c5l", "IGT S2000 Crystal Sevens 5 Coin 5 Line (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fbbe99a702e42c405a56b.jpeg", "IGT S2000 9-top Crystal Sevens 5 coin 5 line. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-diamond-fives-2c", "IGT S2000 Diamond Fives 2 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fbc2d2517f1b82938aec3.jpeg", "IGT S2000 9-top Diamond Fives 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-diamond-fives-3c", "IGT S2000 Diamond Fives 3 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fbc7be565bc708913cca8.jpeg", "IGT S2000 9-top Diamond Fives 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-diamond-tens-2c", "IGT S2000 Diamond Tens 2 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fbcbe8ffd9e0078b0b52d.jpeg", "IGT S2000 9-top Diamond Tens 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-double-diamond-2c", "IGT S2000 Double Diamond 2 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fbd33f514b79a5d0a4bf5.jpeg", "IGT S2000 9-top Double Diamond 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-double-diamond-3c", "IGT S2000 Double Diamond 3 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fbd75023a3871ae9560f1.jpeg", "IGT S2000 9-top Double Diamond 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-double-diamond-deluxe-2c", "IGT S2000 Double Diamond Deluxe 2 Coin (9-top)", "igt", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fbe20593c8998f0c302a2.jpeg", "IGT S2000 9-top Double Diamond Deluxe 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-double-diamond-haywire-2c", "IGT S2000 Double Diamond Haywire 2 Coin (9-top)", "igt", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fc01bbf6969a48c163f9c.jpeg", "IGT S2000 9-top Double Diamond Haywire 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-double-five-times-pay-3c", "IGT S2000 Double Five Times Pay 3 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fc06d9a4c2d1963933617.jpeg", "IGT S2000 9-top Double Five Times Pay 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-double-gold-2c", "IGT S2000 Double Gold 2 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fc0c7bf69693508164057.jpeg", "IGT S2000 9-top Double Gold 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-double-hearts-2c", "IGT S2000 Double Hearts 2 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fc120bf6969fc2516409d.jpeg", "IGT S2000 9-top Double Hearts 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-double-rwb-3c3l", "IGT S2000 Double R/W/B 3 Coin 3 Line (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fc1c69a702e1e1805ad6f.jpeg", "IGT S2000 9-top Double R/W/B 3 coin 3 line. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-double-rwb-5c5l", "IGT S2000 Double R/W/B 5 Coin 5 Line (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fc216f514b797850a51be.jpeg", "IGT S2000 9-top Double R/W/B 5 coin 5 line. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-double-10x-5c5l", "IGT S2000 Double 10 Times Pay 5 Coin 5 Line (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fc2c2023a3829479567ea.jpeg", "IGT S2000 9-top Double 10 Times Pay 5 coin 5 line. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-double-wild-cherry-3c", "IGT S2000 Double Wild Cherry 3 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fc3438ffd9e3008b0beaa.jpeg", "IGT S2000 9-top Double Wild Cherry 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-five-star-3c", "IGT S2000 Five Star 3 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fc398bf69693dd2164445.jpeg", "IGT S2000 9-top Five Star 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-five-times-pay-2c", "IGT S2000 Five Times Pay 2 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fc3ef2517f14b0c38b9b7.jpeg", "IGT S2000 9-top Five Times Pay 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-five-times-pay-3c", "IGT S2000 Five Times Pay 3 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fc45b2517f15eb938ba0b.jpeg", "IGT S2000 9-top Five Times Pay 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-five-times-pay-bw-2c", "IGT S2000 Five Times Pay Black & White 2 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fc4b69a4c2d6682933b7d.jpeg", "IGT S2000 9-top Five Times Pay Black & White 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-five-times-pay-rwb-2c", "IGT S2000 Five Times Pay R/W/B 2 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fc50b2517f119e638bb79.jpeg", "IGT S2000 9-top Five Times Pay R/W/B 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-four-times-diamond-2c", "IGT S2000 Four Times Diamond 2 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fc55a593c896ee6c30d54.jpeg", "IGT S2000 9-top Four Times Diamond 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-four-times-pay-2c", "IGT S2000 Four Times Pay 2 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fc5d02517f112e538bc48.jpeg", "IGT S2000 9-top Four Times Pay 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-haywire-deluxe-2c", "IGT S2000 Haywire Deluxe 2 Coin (9-top)", "igt", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fc9a39a4c2de72e9342ce.jpeg", "IGT S2000 9-top Haywire Deluxe 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-hot-peppers-3c", "IGT S2000 Hot Peppers 3 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fc9ea9a4c2d7910934376.jpeg", "IGT S2000 9-top Hot Peppers 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-jeannie-3c", "IGT S2000 I Dream Of Jeannie 3 Coin (9-top)", "igt", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fca2963e8e92d38e7009c.jpeg", "IGT S2000 9-top I Dream Of Jeannie 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-jekyl-hyde-3c", "IGT S2000 Jekyl & Hyde 3 Coin (9-top)", "igt", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fcaaa8ffd9ecd90b0c958.jpeg", "IGT S2000 9-top Jekyl & Hyde 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-moolah-2c", "IGT S2000 Moolah 2 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fcb01bf696959b8164fed.jpeg", "IGT S2000 9-top Moolah 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-phantom-opera-2c", "IGT S2000 The Phantom Of The Opera 2 Coin (9-top)", "igt", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fcb452517f194fc38c412.jpeg", "IGT S2000 9-top The Phantom Of The Opera 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-rwb-3c", "IGT S2000 R/W/B 3 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fcba2f514b7705a0a62d6.jpeg", "IGT S2000 9-top R/W/B 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-rwb-5c5l", "IGT S2000 R/W/B 5 Coin 5 Line (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fcbea63e8e9f641e7030f.jpeg", "IGT S2000 9-top R/W/B 5 coin 5 line. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-double-rwb-wild-star-2c", "IGT S2000 Double R/W/B Wild Star 2 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fcc5263e8e96584e703eb.jpeg", "IGT S2000 9-top Double R/W/B Wild Star 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-rwb-wild-star-5c", "IGT S2000 R/W/B Wild Star 5 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fccbf8ffd9e0830b0d5b8.jpeg", "IGT S2000 9-top R/W/B Wild Star 5 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-seven-times-pay-3c", "IGT S2000 Seven Times Pay 3 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fcee5e565bc7ad313fd7e.jpeg", "IGT S2000 9-top Seven Times Pay 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-sizzling-7s-3c", "IGT S2000 Sizzling 7's 3 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fcfb69a702e306f05c9a4.jpeg", "IGT S2000 9-top Sizzling 7's 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-sizzling-7s-times-pay-2c", "IGT S2000 Sizzling 7's Times Pay 2 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd0009a702ef68105ca34.jpeg", "IGT S2000 9-top Sizzling 7's Times Pay 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-tabasco-2c", "IGT S2000 Tabasco 2 Coin (9-top)", "igt", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd0479a702e717705ca7e.jpeg", "IGT S2000 9-top Tabasco 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-tabasco-3c", "IGT S2000 Tabasco 3 Coin (9-top)", "igt", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd079593c898e91c32cff.jpeg", "IGT S2000 9-top Tabasco 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-titanic-floating-3c", "IGT S2000 Titanic Floating 3 Coin (9-top)", "igt", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd0b4e565bc1250140126.jpeg", "IGT S2000 9-top Titanic Floating 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-triple-cash-3c", "IGT S2000 Triple Cash 3 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd0ee9a702e56d305cc27.jpeg", "IGT S2000 9-top Triple Cash 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-triple-cats-dogs-3c", "IGT S2000 Triple Cats & Dogs 3 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd11e593c89cfdbc32e72.jpeg", "IGT S2000 9-top Triple Cats & Dogs 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-triple-cherry-2c", "IGT S2000 Triple Cherry 2 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd15ae565bc72761402ac.jpeg", "IGT S2000 9-top Triple Cherry 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-triple-cherry-3c", "IGT S2000 Triple Cherry 3 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd1b7f514b712a40a6bc8.jpeg", "IGT S2000 9-top Triple Cherry 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-triple-diamond-3c", "IGT S2000 Triple Diamond 3 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd2132517f133f538cef7.jpeg", "IGT S2000 9-top Triple Diamond 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-triple-diamond-5c5l", "IGT S2000 Triple Diamond 5 Coin 5 Line (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd25f9a4c2d2017935971.jpeg", "IGT S2000 9-top Triple Diamond 5 coin 5 line. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-triple-diamond-9c9l", "IGT S2000 Triple Diamond 9 Coin 9 Line (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd2a08ffd9e6e70b0de71.jpeg", "IGT S2000 9-top Triple Diamond 9 coin 9 line. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-triple-diamond-9l-45c", "IGT S2000 Triple Diamond 9 Line 45 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd2f1f514b7e5830a6d28.jpeg", "IGT S2000 9-top Triple Diamond 9 line 45 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-triple-diamond-deluxe-2c", "IGT S2000 Triple Diamond Deluxe 2 Coin (9-top)", "igt", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd341f514b750780a6e0d.jpeg", "IGT S2000 9-top Triple Diamond Deluxe 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-triple-diamond-deluxe-3c", "IGT S2000 Triple Diamond Deluxe 3 Coin (9-top)", "igt", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd383bf69694382166336.jpeg", "IGT S2000 9-top Triple Diamond Deluxe 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-triple-diamond-strike-2c", "IGT S2000 Triple Diamond Strike 2 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd440023a380731958315.jpeg", "IGT S2000 9-top Triple Diamond Strike 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-triple-dollar-mystery-reel-2c", "IGT S2000 Triple Dollar Mystery Reel 2 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd488593c891ff6c33445.jpeg", "IGT S2000 9-top Triple Dollar Mystery Reel 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-triple-double-diamond-2c", "IGT S2000 Triple Double Diamond 2 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd4c4593c890c27c3371e.jpeg", "IGT S2000 9-top Triple Double Diamond 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-triple-double-dollars-3c", "IGT S2000 Triple Double Dollars 3 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd5059a4c2db92b935d67.jpeg", "IGT S2000 9-top Triple Double Dollars 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-triple-double-5x-2c", "IGT S2000 Triple Double Five Times Pay 2 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd5b3023a38b39995851b.jpeg", "IGT S2000 9-top Triple Double Five Times Pay 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-triple-double-rwb-2c", "IGT S2000 Triple Double R/W/B 2 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd6be8ffd9e0ecfb0e785.jpeg", "IGT S2000 9-top Triple Double R/W/B 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-triple-double-wild-cherry-3c", "IGT S2000 Triple Double Wild Cherry 3 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd71c593c893000c33f8a.jpeg", "IGT S2000 9-top Triple Double Wild Cherry 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-triple-five-times-pay-2c", "IGT S2000 Triple Five Times Pay 2 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd7629a4c2d9b1193624c.jpeg", "IGT S2000 9-top Triple Five Times Pay 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-triple-hot-ice", "IGT S2000 Triple Hot Ice (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd7b9023a385bfd958852.jpeg", "IGT S2000 9-top Triple Hot Ice. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-triple-lucky-7s-3c", "IGT S2000 Triple Lucky 7's 3 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd823593c8917bec34045.jpeg", "IGT S2000 9-top Triple Lucky 7's 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-triple-red-hot-7s-3c", "IGT S2000 Triple Red Hot 7's 3 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd885e565bc54ec1412c6.jpeg", "IGT S2000 9-top Triple Red Hot 7's 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-triple-rwb-3c", "IGT S2000 Triple R/W/B 3 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd8e02517f1f2dd38dac0.jpeg", "IGT S2000 9-top Triple R/W/B 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-triple-star-2c", "IGT S2000 Triple Star 2 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/687fd941bf6969304e167230.jpeg", "IGT S2000 9-top Triple Star 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-triple-star-3c", "IGT S2000 Triple Star 3 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688151706bfa5931c6c89a20.jpeg", "IGT S2000 9-top Triple Star 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-triple-strike-2c", "IGT S2000 Triple Strike 2 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688152602dd54f578e18a06a.jpeg", "IGT S2000 9-top Triple Strike 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-triple-zesty-hot-peppers-2c", "IGT S2000 Triple Zesty Hot Peppers 2 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688152bd2c4791f5c0dd3d13.jpeg", "IGT S2000 9-top Triple Zesty Hot Peppers 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-wild-thing-devil-2c", "IGT S2000 Wild Thing Devil 2 Coin (9-top)", "igt", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/68815833defb7a07a8efc834.jpeg", "IGT S2000 9-top Wild Thing Devil 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-white-stars-3c", "IGT S2000 White Stars 3 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6881568f6bfa594592c8a339.jpeg", "IGT S2000 9-top White Stars 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-wild-cherry-3c", "IGT S2000 Wild Cherry 3 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/6881570f2c47912c31dd4312.jpeg", "IGT S2000 9-top Wild Cherry 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-wild-thing-cowgirl-2c", "IGT S2000 Wild Thing Cowgirl 2 Coin (9-top)", "igt", "reel", 850, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/68815759744d7e02d1d79f71.jpeg", "IGT S2000 9-top Wild Thing Cowgirl 2 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
  ["igt-s2000-9top-wild-thing-devil-3c", "IGT S2000 Wild Thing Devil 3 Coin (9-top)", "igt", "reel", 750, "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/hvLhtyPPvOhUoiGCUbE2/media/688158816bfa597ad9c8a541.jpeg", "IGT S2000 9-top Wild Thing Devil 3 coin. Enhanced sound, TITO.", "IGT S2000 9-Top"],
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

const _seedMachines: Machine[] = _uniqueSeeds.map(buildMachine);

// Merge in admin-managed machines from data/machines-custom.json.
// Only `status: "published"` entries are rendered on the public site.
// Build-time import — no runtime I/O.
import customRaw from "./machines-custom.json";
type CustomEntry = {
  slug: string;
  name: string;
  brand: BrandSlug;
  type: MachineType;
  price: number;
  image: string;
  description: string;
  highlights?: string[];
  specs?: Record<string, string>;
  cabinet?: string;
  condition?: "Professionally Refurbished" | "Collector Grade" | "Like New";
  inStock?: number;
  status: "draft" | "published";
};

const customPublished: Machine[] = (customRaw as CustomEntry[])
  .filter((c) => c.status === "published")
  .map((c) => {
    const isReel = c.type === "reel";
    return {
      slug: c.slug,
      name: c.name,
      brand: c.brand,
      brandLabel: brandLabels[c.brand],
      type: c.type,
      price: c.price,
      denomination: isReel ? "$0.25" : "$0.01",
      reels: c.type === "video-poker" ? 0 : isReel ? 3 : 5,
      cabinet: c.cabinet,
      condition: c.condition ?? "Professionally Refurbished",
      inStock: c.inStock ?? 1,
      image: c.image,
      tagline: c.description.length > 120 ? c.description.slice(0, 117) + "…" : c.description,
      description: c.description,
      highlights: c.highlights ?? defaultHighlights(c.type),
      specs: c.specs ?? defaultSpecsFor(c.brand, c.type, c.cabinet),
    };
  });

// ── Seed overrides ──
// Admin edits to seed machines are stored in data/machines-overrides.json
// (see lib/github.ts loadMachineOverrides). Each entry is {slug, patch?, hidden?}.
// `patch` fields override the seed; `hidden:true` removes it from the site.
import overridesRaw from "./machines-overrides.json";
type OverrideEntry = {
  slug: string;
  patch?: Partial<Machine>;
  hidden?: boolean;
  updatedAt?: string;
};
const overrideMap = new Map<string, OverrideEntry>(
  (overridesRaw as OverrideEntry[]).map((o) => [o.slug, o])
);

const seedsWithOverrides: Machine[] = _seedMachines
  .filter((m) => !overrideMap.get(m.slug)?.hidden)
  .map((m) => {
    const o = overrideMap.get(m.slug);
    if (!o?.patch) return m;
    const p = o.patch;
    return {
      ...m,
      ...p,
      // Keep consistent derived fields when brand/type change.
      brandLabel: p.brand ? brandLabels[p.brand as BrandSlug] : m.brandLabel,
      highlights: p.highlights ?? m.highlights,
      specs: p.specs ?? m.specs,
    };
  });

// Custom entries first so the dashboard's latest additions surface on top.
export const machines: Machine[] = [...customPublished, ...seedsWithOverrides];

// Expose the raw seed list (without overrides applied) so the admin can show
// the "default" values alongside any active override for comparison.
export const seedMachines: Machine[] = _seedMachines;
export function isSeedSlug(slug: string): boolean {
  return _seedMachines.some((m) => m.slug === slug);
}

export function machinesByBrand(brand: string) {
  return machines.filter((m) => m.brand === brand);
}

export function seriesSlugFor(cabinet: string | undefined): string {
  return cabinet ? slugify(cabinet) : "other";
}

export type Series = {
  slug: string;
  name: string;
  count: number;
};

export function seriesByBrand(brand: string): Series[] {
  const map = new Map<string, Series>();
  for (const m of machines) {
    if (m.brand !== brand) continue;
    const name = m.cabinet ?? "Other";
    const slug = seriesSlugFor(m.cabinet);
    const existing = map.get(slug);
    if (existing) existing.count += 1;
    else map.set(slug, { slug, name, count: 1 });
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function machinesBySeries(brand: string, seriesSlug: string) {
  return machines.filter(
    (m) => m.brand === brand && seriesSlugFor(m.cabinet) === seriesSlug
  );
}

export function getSeries(brand: string, seriesSlug: string): Series | null {
  return seriesByBrand(brand).find((s) => s.slug === seriesSlug) ?? null;
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
    .sort((a, b) => {
      const aScore = (a.brand === current.brand ? 2 : 0) + (a.type === current.type ? 1 : 0);
      const bScore = (b.brand === current.brand ? 2 : 0) + (b.type === current.type ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, limit);
}

// Deterministic "machine of the day" — same for every visitor within a day,
// rotates to a different machine tomorrow. Zero maintenance.
export function machineOfTheDay(date?: Date): Machine | null {
  if (machines.length === 0) return null;
  const d = date ?? new Date();
  const key = d.toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  return machines[Math.abs(h) % machines.length];
}

export function featuredMachines(limit = 8): Machine[] {
  // Spread featured picks across every brand for a diverse homepage grid.
  const perBrand = new Map<string, Machine[]>();
  for (const m of machines) {
    if (!perBrand.has(m.brand)) perBrand.set(m.brand, []);
    perBrand.get(m.brand)!.push(m);
  }
  const out: Machine[] = [];
  let idx = 0;
  while (out.length < limit && idx < 50) {
    for (const list of perBrand.values()) {
      if (out.length >= limit) break;
      if (list[idx]) out.push(list[idx]);
    }
    idx++;
  }
  return out.slice(0, limit);
}
