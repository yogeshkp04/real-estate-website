import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Gavel, HardHat, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import heroVilla from "@/assets/hero-villa.jpg";
import houseNight from "@/assets/house-night.jpg";
import plotsAerial from "@/assets/plots-aerial.jpg";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactBar } from "@/components/ContactBar";
import {
  company,
  constructionServices,
  dealings,
  legalServices,
  telHref,
  transactions,
  waHref,
} from "@/lib/company";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guru Shree Sai Realators — Real Estate, Builders & Developers, Bengaluru" },
      {
        name: "description",
        content:
          "Buy, sell, rent, lease or mortgage sites, houses, plots and land in Bengaluru. Legal deeds, registration, construction and vastu under one roof. Call 9880508077.",
      },
      {
        property: "og:title",
        content: "Guru Shree Sai Realators — Real Estate, Builders & Developers",
      },
      {
        property: "og:description",
        content:
          "Sites, houses, plots, agricultural and commercial land in Bengaluru — plus legal documentation and construction services.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen pb-16 sm:pb-0">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative isolate overflow-hidden">
          <img
            src={heroVilla}
            alt="Modern independent villa handled by Guru Shree Sai Realators"
            width={1600}
            height={1104}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="relative mx-auto max-w-6xl px-4 py-28 sm:py-36">
            <p className="eyebrow text-primary-foreground/70">{company.blessing}</p>
            <h1 className="mt-5 max-w-3xl font-display text-3xl text-primary-foreground sm:text-5xl">
              {company.name}
            </h1>
            <div className="mt-6 flex items-center gap-4">
              <span className="rule-line" />
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
                {company.tagline}
              </p>
            </div>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/85">
              Sale, purchase, rent, mortgage, lease and joint development of sites, houses and lands
              across {company.city} — with complete legal and construction support.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={telHref(company.phones[0])}
                className="inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3 text-sm font-medium tracking-wide text-accent-foreground transition-opacity hover:opacity-90"
              >
                <Phone className="h-4 w-4" aria-hidden="true" /> {company.phones[0]}
              </a>
              <a
                href={waHref()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-primary-foreground/40 px-6 py-3 text-sm font-medium tracking-wide text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Transaction strip */}
        <section className="border-b border-border bg-secondary">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-5">
            {transactions.map((t) => (
              <span
                key={t}
                className="text-[11px] font-medium uppercase tracking-[0.2em] text-secondary-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* Bento grid of services */}
        <section className="mx-auto max-w-6xl px-4 py-20">
          <p className="eyebrow">What we do</p>
          <h2 className="mt-3 max-w-2xl font-display text-2xl sm:text-4xl">
            Property, paperwork and construction — under one roof
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-3 md:grid-rows-[auto_auto]">
            {/* House Night Image - comes before Property Dealings */}
            <article className="card-elevated overflow-hidden rounded-md border border-border md:col-span-2">
              <img
                src={houseNight}
                alt="Independent house with a modern elevation at night"
                loading="lazy"
                width={1200}
                height={900}
                className="h-52 w-full object-cover md:h-full"
              />
            </article>

            {/* Placeholder for grid alignment */}
            <div></div>

            {/* Property Dealings - comes after image */}
            <article className="card-elevated rounded-md border border-border bg-card p-7 md:col-span-2">
              <Building2 className="h-6 w-6 text-accent" aria-hidden="true" />
              <h3 className="mt-4 font-display text-xl">Property Dealings</h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Verified residential, commercial, industrial and agricultural properties across
                Bengaluru — for buying, selling, renting or investment.
              </p>
              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {dealings.map((d) => (
                  <li key={d} className="flex gap-3 text-sm">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-red" />
                    {d}
                  </li>
                ))}
              </ul>
            </article>

            {/* Plots Aerial Image - comes before Documentation */}
            <article className="card-elevated overflow-hidden rounded-md border border-border">
              <img
                src={plotsAerial}
                alt="Aerial view of an approved residential plot layout"
                loading="lazy"
                width={1200}
                height={900}
                className="h-52 w-full object-cover md:h-full"
              />
            </article>

            {/* Documentation - comes after image */}
            <article className="card-elevated rounded-md border border-border bg-primary p-7 text-primary-foreground">
              <ShieldCheck className="h-6 w-6 text-accent" aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg">Documentation you can trust</h3>
              <p className="mt-2 text-sm leading-relaxed opacity-85">
                Clear titles, transparent pricing and documentation handled end to end.
              </p>
            </article>

            {/* Legal & Documentation */}
            <article className="card-elevated rounded-md border border-border bg-card p-7">
              <Gavel className="h-6 w-6 text-accent" aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg">Legal & Documentation</h3>
              <ul className="mt-4 space-y-2.5">
                {legalServices.slice(0, 5).map((s) => (
                  <li key={s} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-red" />
                    {s}
                  </li>
                ))}
              </ul>
            </article>

            {/* Construction & Design */}
            <article className="card-elevated rounded-md border border-border bg-card p-7">
              <HardHat className="h-6 w-6 text-accent" aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg">Construction & Design</h3>
              <ul className="mt-4 space-y-2.5">
                {constructionServices.slice(0, 5).map((s) => (
                  <li key={s} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-red" />
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <Link
            to="/services"
            className="mt-10 inline-flex items-center rounded-sm border border-foreground/20 px-6 py-3 text-sm font-medium tracking-wide transition-colors hover:bg-secondary"
          >
            View all services
          </Link>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <div className="rounded-md border border-border bg-secondary px-6 py-14 sm:px-14">
            <p className="eyebrow">Get in touch</p>
            <h2 className="mt-3 max-w-xl font-display text-2xl sm:text-3xl">
              Ready to talk about your property?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Share your requirement on a call or WhatsApp — buying, selling, renting or building.
              We respond the same day.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {company.phones.map((p) => (
                <a
                  key={p}
                  href={telHref(p)}
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" /> {p}
                </a>
              ))}
              <a
                href={waHref()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-brand-green px-6 py-3 text-sm font-medium tracking-wide text-brand-green-foreground transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ContactBar />
    </div>
  );
}
