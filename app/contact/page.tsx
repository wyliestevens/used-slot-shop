import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import ContactForm from "./ContactForm";
import { site } from "@/lib/site";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata = buildMetadata({
  title: "Contact Used Slot Shop — Talk to a Slot Machine Expert",
  description:
    "Call 928-418-5549 or send us a message. We're open Mon-Fri 8am-6pm MST and Saturday 9am-3pm. Based in Kingman, AZ — shipping nationwide.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <Section eyebrow="Contact" title="Let's talk slot machines." subtitle="Free consultation, no pressure, no pushy sales calls.">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-5">
            <div className="card p-6 flex items-start gap-4">
              <Phone className="h-6 w-6 text-brand-400 mt-1" />
              <div>
                <div className="text-xs uppercase text-ink-400 font-semibold">Phone</div>
                <a href={site.phoneHref} className="text-xl font-bold text-white hover:text-brand-300">
                  {site.phone}
                </a>
                <div className="text-sm text-ink-300">Sales & Service</div>
              </div>
            </div>
            <div className="card p-6 flex items-start gap-4">
              <Mail className="h-6 w-6 text-brand-400 mt-1" />
              <div className="space-y-1">
                <div className="text-xs uppercase text-ink-400 font-semibold">Email</div>
                <div><a href={`mailto:${site.salesEmail}`} className="text-white hover:text-brand-300">{site.salesEmail}</a> <span className="text-ink-400 text-sm">(sales)</span></div>
                <div><a href={`mailto:${site.serviceEmail}`} className="text-white hover:text-brand-300">{site.serviceEmail}</a> <span className="text-ink-400 text-sm">(service)</span></div>
                <div><a href={`mailto:${site.email}`} className="text-white hover:text-brand-300">{site.email}</a> <span className="text-ink-400 text-sm">(general)</span></div>
              </div>
            </div>
            <div className="card p-6 flex items-start gap-4">
              <MapPin className="h-6 w-6 text-brand-400 mt-1" />
              <div>
                <div className="text-xs uppercase text-ink-400 font-semibold">Warehouse</div>
                <div className="text-white">
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.region} {site.address.postalCode}
                </div>
                <div className="text-sm text-ink-300 mt-1">Walk-ins by appointment</div>
              </div>
            </div>
            <div className="card p-6 flex items-start gap-4">
              <Clock className="h-6 w-6 text-brand-400 mt-1" />
              <div>
                <div className="text-xs uppercase text-ink-400 font-semibold">Hours (MST)</div>
                <div className="text-white text-sm">
                  {site.hours.weekdays}
                  <br />
                  {site.hours.saturday}
                  <br />
                  {site.hours.sunday}
                </div>
              </div>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
