import type { Metadata } from "next";
import { site } from "./site";

export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/og-default.png",
  noindex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
}): Metadata {
  const url = new URL(path, site.url).toString();
  const ogImage = new URL(image, site.url).toString();
  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    foundingDate: `${site.founded}-01-01`,
    description: site.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    areaServed: "United States",
    priceRange: "$$-$$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "16:00",
      },
    ],
    logo: {
      "@type": "ImageObject",
      url: new URL(site.logoUrl, site.url).toString(),
    },
    hasMap: `https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}`,
    ...(([site.socials.facebook, site.socials.instagram, site.socials.youtube].filter(Boolean).length > 0) && {
      sameAs: [site.socials.facebook, site.socials.instagram, site.socials.youtube].filter(Boolean),
    }),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.path, site.url).toString(),
    })),
  };
}

export function productJsonLd(m: {
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  brandLabel: string;
  inStock: number;
  condition: string;
}) {
  const priceValidUntil = new Date();
  priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${site.url}/machines/${m.slug}#product`,
    name: m.name,
    description: m.description,
    image: [m.image],
    sku: m.slug,
    brand: { "@type": "Brand", name: m.brandLabel },
    itemCondition: "https://schema.org/RefurbishedCondition",
    offers: {
      "@type": "Offer",
      url: `${site.url}/machines/${m.slug}`,
      priceCurrency: "USD",
      price: m.price.toFixed(2),
      priceValidUntil: priceValidUntil.toISOString().split("T")[0],
      availability:
        m.inStock > 0 ? "https://schema.org/InStock" : "https://schema.org/MadeToOrder",
      seller: { "@type": "Organization", name: site.name },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 3, unitCode: "d" },
          transitTime: { "@type": "QuantitativeValue", minValue: 5, maxValue: 10, unitCode: "d" },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
      },
    },
  };
}

export function articleJsonLd(p: {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}) {
  const url = `${site.url}/blog/${p.slug}`;
  const image = p.coverImage.startsWith("http")
    ? p.coverImage
    : new URL(p.coverImage, site.url).toString();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: p.title,
    description: p.excerpt,
    image: [image],
    datePublished: p.publishedAt || p.createdAt,
    dateModified: p.updatedAt,
    author: { "@type": "Person", name: p.author },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: new URL(site.logoUrl || "/logo.png", site.url).toString(),
      },
    },
  };
}

export function itemListJsonLd(items: { name: string; url: string; position: number }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      url: item.url,
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

