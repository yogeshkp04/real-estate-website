import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Gavel, HardHat, KeyRound } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactBar } from "@/components/ContactBar";
import { constructionServices, dealings, legalServices, transactions } from "@/lib/company";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Property, Legal & Construction | Guru Shree Sai Realators" },
      {
        name: "description",
        content:
          "Full list of services: sites, houses, plots, agricultural & industrial land, rentals, sale deeds, legal opinion, registration, construction, interiors and vastu.",
      },
      { property: "og:title", content: "Services — Guru Shree Sai Realators" },
      {
        property: "og:description",
        content:
          "Property dealings, legal documentation and construction services in Bengaluru under one roof.",
      },
    ],
  }),
  component: ServicesPage,
});

function List({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <section className="card-elevated rounded-md border border-border bg-card p-7">
      <div className="flex items-center gap-3">
        <span className="shrink-0 text-accent">{icon}</span>
        <h2 className="font-display text-lg">{title}</h2>
      </div>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-muted-foreground">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-red" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function ServicesPage() {
  return (
    <div className="min-h-screen pb-16 sm:pb-0">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-14">
        <p className="eyebrow">What we do</p>
        <h1 className="mt-3 max-w-3xl font-display text-3xl sm:text-4xl">
          Every property service, start to finish
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          From finding the right site to registering it in your name and building on it — we handle
          the whole journey with verified documentation.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {transactions.map((t) => (
            <span
              key={t}
              className="rounded-sm border border-border bg-secondary px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-secondary-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <List
            icon={<Building2 className="h-5 w-5" />}
            title="Property Dealings"
            items={dealings}
          />
          <List
            icon={<Gavel className="h-5 w-5" />}
            title="Legal & Documentation"
            items={legalServices}
          />
          <List
            icon={<HardHat className="h-5 w-5" />}
            title="Construction & Design"
            items={constructionServices}
          />
          <section className="card-elevated flex flex-col justify-between rounded-md border border-border bg-primary p-7 text-primary-foreground">
            <div>
              <KeyRound className="h-6 w-6 text-accent" />
              <h2 className="mt-4 font-display text-lg">Not sure where to start?</h2>
              <p className="mt-3 text-sm opacity-85">
                Tell us your budget, preferred location and purpose. We shortlist verified options
                and walk you through the paperwork.
              </p>
            </div>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-sm bg-accent px-5 py-3 text-sm font-medium tracking-wide text-accent-foreground"
            >
              Talk to us
            </Link>
          </section>
        </div>
      </main>
      <SiteFooter />
      <ContactBar />
    </div>
  );
}
