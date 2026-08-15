import { createFileRoute } from "@tanstack/react-router";
import { MapPin, MessageCircle, Phone, Clock } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactBar } from "@/components/ContactBar";
import { company, telHref, waHref } from "@/lib/company";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Guru Shree Sai Realators — Call or WhatsApp" },
      {
        name: "description",
        content:
          "Call 9880508077 or 9901893629, or message us on WhatsApp for property buying, selling, rentals, legal deeds and construction in Bengaluru.",
      },
      { property: "og:title", content: "Contact Guru Shree Sai Realators" },
      {
        property: "og:description",
        content: "Reach us instantly by phone or WhatsApp for any property requirement.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen pb-16 sm:pb-0">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-14">
        <p className="eyebrow">Get in touch</p>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl">Call or WhatsApp us today</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          We reply quickly on WhatsApp — send your requirement, location and budget and we will
          share suitable options.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {company.phones.map((p) => (
            <a
              key={p}
              href={telHref(p)}
              className="card-elevated flex items-center gap-4 rounded-md border border-border bg-card p-6"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-sm bg-primary text-primary-foreground">
                <Phone className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block eyebrow">Call</span>
                <span className="block truncate font-display text-lg">+91 {p}</span>
              </span>
            </a>
          ))}
          <a
            href={waHref()}
            target="_blank"
            rel="noreferrer"
            className="card-elevated flex items-center gap-4 rounded-md border border-border bg-brand-green p-6 text-brand-green-foreground sm:col-span-2"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-sm bg-brand-green-foreground/15">
              <MessageCircle className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block eyebrow opacity-80">WhatsApp</span>
              <span className="block truncate font-display text-lg">Chat with us now</span>
            </span>
          </a>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md border border-border bg-secondary p-6">
            <MapPin className="h-5 w-5 text-brand-red" />
            <h2 className="mt-3 font-display text-base">Service area</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {company.city} and surrounding areas — BBMP, revenue and agricultural properties.
            </p>
          </div>
          <div className="rounded-md border border-border bg-secondary p-6">
            <Clock className="h-5 w-5 text-brand-red" />
            <h2 className="mt-3 font-display text-base">Working hours</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Monday to Saturday, 9:00 AM – 8:00 PM. Sunday by appointment.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
      <ContactBar />
    </div>
  );
}
