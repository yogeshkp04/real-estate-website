import { Link } from "@tanstack/react-router";
import { company, telHref, waHref } from "@/lib/company";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-3">
        <div>
          <h3 className="font-display text-lg">{company.name}</h3>
          <p className="mt-2 text-sm opacity-75">{company.kannadaName}</p>
          <p className="mt-3 text-sm opacity-80">
            Sale, purchase, rent, mortgage, lease and joint development across {company.city}.
          </p>
        </div>
        <div>
          <h4 className="eyebrow text-primary-foreground/70">Pages</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/" className="opacity-90 hover:opacity-100">
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="opacity-90 hover:opacity-100">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="opacity-90 hover:opacity-100">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow text-primary-foreground/70">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {company.phones.map((p) => (
              <li key={p}>
                <a href={telHref(p)} className="hover:underline">
                  +91 {p}
                </a>
              </li>
            ))}
            <li>
              <a href={waHref()} target="_blank" rel="noreferrer" className="hover:underline">
                WhatsApp us
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 py-4 text-center text-xs opacity-70">
        © {new Date().getFullYear()} {company.name}. All rights reserved.
      </div>
    </footer>
  );
}
