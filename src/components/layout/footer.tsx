import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { navLinks, services, site, whatsappUrl } from "@/lib/content";
import { Logo, VaisalaLogo } from "./logo";
import { Container } from "@/components/ui/container";
import { WhatsappGlyph } from "@/components/ui/whatsapp-glyph";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border bg-background-soft">
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
      <Container className="relative py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex flex-wrap items-center gap-3">
              <Logo size={48} />
              <span className="h-8 w-px bg-border" />
              <VaisalaLogo height={28} />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {site.legalName}. Metrología acreditada bajo ISO/IEC 17025:2017.
              Único partner de Vaisala en México.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="social-btn"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
                </svg>
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-btn"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0Z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Navegación
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-muted transition-colors hover:text-brand"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Servicios
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/servicios#${s.slug}`}
                    className="text-muted transition-colors hover:text-brand"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Contacto
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>{site.address.full}</span>
              </li>
              {site.phones.map((p) => (
                <li key={p} className="flex gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-brand" />
                  <a href={`tel:${p.replace(/-/g, "")}`} className="hover:text-brand">
                    {p}
                  </a>
                </li>
              ))}
              <li className="flex gap-3">
                <WhatsappGlyph className="h-4 w-4 shrink-0 text-[#25D366]" />
                <a
                  href={whatsappUrl(
                    "Hola SICAMET, me gustaría solicitar información.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366]"
                >
                  WhatsApp: {site.whatsappDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 shrink-0 text-brand" />
                <a href={`mailto:${site.email}`} className="hover:text-brand">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-5">
            <Link href="/aviso-de-privacidad" className="hover:text-brand">
              Aviso de Privacidad
            </Link>
            <Link href="/centro-de-quejas" className="hover:text-brand">
              Centro de Quejas
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
