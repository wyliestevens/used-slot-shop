export const site = {
  name: "Used Slot Shop",
  legalName: "Used Slot Shop LLC",
  tagline: "Authentic casino-grade slot machines, expertly refurbished and shipped nationwide.",
  url: "https://usedslotshop.com",
  vercelUrl: "https://used-slot-shop.vercel.app",
  phone: "928-418-5549",
  phoneHref: "tel:+19284185549",
  email: "info@usedslotshop.com",
  salesEmail: "sales@usedslotshop.com",
  serviceEmail: "service@usedslotshop.com",
  address: {
    street: "7252 E Concho Dr Ste B",
    city: "Kingman",
    region: "AZ",
    postalCode: "86401",
    country: "US",
  },
  hours: {
    weekdays: "Mon–Fri 8:00 AM – 6:00 PM MST",
    saturday: "Sat 9:00 AM – 3:00 PM MST",
    sunday: "Sun Closed",
  },
  founded: 1992,
  yearsInBusiness: new Date().getFullYear() - 1992,
  socials: {
    facebook: "",
    instagram: "",
    youtube: "",
  },
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
} as const;

export type Brand = (typeof site.brands)[number];
