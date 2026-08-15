import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { company, telHref } from "@/lib/company";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 sm:flex sm:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm border border-accent font-display text-sm font-bold text-primary">
            GS
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-sm font-bold tracking-tight sm:text-base">
              {company.name}
            </span>
            <span className="eyebrow block truncate text-[10px]">{company.tagline}</span>
          </span>
        </Link>
        <nav className="flex shrink-0 items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-foreground" }}
              className="hidden px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={telHref(company.phones[0])}
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>Call</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
