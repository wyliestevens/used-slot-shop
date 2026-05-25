import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import ContactForm from "./ContactForm";
import { site } from "@/lib/site";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata = buildMetadata({
  title: "Contact Used Slot Shop — Talk to a Slot Machine Expert",
  description:
    "Call 928-418-5549 or send us a message. Open Mon-Fri 8am-4pm MST, Saturday by appointment. Based in Kingman, AZ — shipping nationwide.",
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
              <div>
                <div className="text-xs uppercase text-ink-400 font-semibold">Email</div>
                <a href={`mailto:${site.email}`} className="text-xl font-bold text-white hover:text-brand-300">
                  {site.email}
                </a>
                <div className="text-sm text-ink-300">Sales & Service</div>
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
            <div className="card overflow-hidden mt-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.8!2d-114.049!3d35.189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s7252+E+Concho+Dr+Ste+B%2C+Kingman%2C+AZ+86401!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Used Slot Shop location — Kingman, AZ"
              />
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
