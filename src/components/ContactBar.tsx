import { MessageCircle, Phone } from "lucide-react";
import { company, telHref, waHref } from "@/lib/company";

export function ContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-px border-t border-border bg-border sm:hidden">
      <a
        href={telHref(company.phones[0])}
        className="flex items-center justify-center gap-2 bg-primary py-3.5 text-sm font-medium tracking-wide text-primary-foreground"
      >
        <Phone className="h-4 w-4" aria-hidden="true" /> Call
      </a>
      <a
        href={waHref()}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 bg-brand-green py-3.5 text-sm font-medium tracking-wide text-brand-green-foreground"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
      </a>
    </div>
  );
}
