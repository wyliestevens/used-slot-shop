import { machines } from "@/data/machines";
import { site } from "@/lib/site";

export async function GET() {
  const items = machines.map((m) => {
    const link = `${site.url}/machines/${m.slug}`;
    return `  <item>
    <g:id>${m.slug}</g:id>
    <title>${escapeXml(m.name)}</title>
    <description>${escapeXml(m.description)}</description>
    <link>${link}</link>
    <g:image_link>${escapeXml(m.image)}</g:image_link>
    <g:price>${m.price.toFixed(2)} USD</g:price>
    <g:availability>${m.inStock > 0 ? "in_stock" : "preorder"}</g:availability>
    <g:condition>refurbished</g:condition>
    <g:brand>${escapeXml(m.brandLabel)}</g:brand>
    <g:product_type>Electronics &gt; Arcade Equipment &gt; Slot Machines</g:product_type>
    <g:identifier_exists>false</g:identifier_exists>
  </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
  <title>${site.name}</title>
  <link>${site.url}</link>
  <description>Refurbished casino slot machines for sale</description>
${items.join("\n")}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
