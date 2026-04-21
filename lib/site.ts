// Site config: merges static constants with admin-editable overrides from
// data/content/site.json. Changes made from the admin UI update that JSON
// file and redeploy, so this reads the latest at build time.
import siteContent from "@/data/content/site.json";

function toTel(raw: string) {
  const digits = (raw || "").replace(/\D/g, "");
  return digits ? `tel:+1${digits.replace(/^1/, "")}` : "";
}

const founded = 1992;

export const site = {
  name: siteContent.name,
  legalName: "Used Slot Shop LLC",
  tagline: siteContent.tagline,
  logoUrl: siteContent.logoUrl || "/logo.png",
  url: "https://usedslotshop.com",
  vercelUrl: "https://used-slot-shop.vercel.app",
  phone: siteContent.phone,
  phoneHref: toTel(siteContent.phone),
  email: siteContent.email,
  salesEmail: siteContent.salesEmail,
  serviceEmail: siteContent.serviceEmail,
  address: siteContent.address,
  hours: siteContent.hours,
  founded,
  yearsInBusiness: new Date().getFullYear() - founded,
  socials: siteContent.socials,
  geo: { lat: 35.189, lng: -114.049 },
  brands: [
    { slug: "igt", name: "IGT", blurb: "Industry benchmark reels and video slots" },
    { slug: "bally", name: "Bally", blurb: "Iconic casino floor staples from Alpha to S9000" },
    { slug: "aristocrat", name: "Aristocrat", blurb: "Buffalo, Lightning Link and MK platforms" },
    { slug: "williams", name: "Williams (WMS)", blurb: "Reel Em In, Monopoly, BB2 and Bluebird" },
    { slug: "konami", name: "Konami", blurb: "Podium, Selexion and K2V cabinets" },
    { slug: "ainsworth", name: "Ainsworth", blurb: "A560 and A600 cabinets" },
    { slug: "aruze", name: "Aruze", blurb: "Innovator and Muso cabinets" },
  ],
};

export type Brand = (typeof site.brands)[number];
