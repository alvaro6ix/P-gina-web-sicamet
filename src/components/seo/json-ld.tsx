import { accreditations, faqs, services, site } from "@/lib/content";

/** Inserta un bloque JSON-LD de forma segura. */
function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** Organización + LocalBusiness (clave para SEO local / AEO / GEO). */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "@id": `${site.url}/#organization`,
    name: site.legalName,
    alternateName: site.name,
    legalName: site.legalName,
    slogan: site.tagline,
    url: site.url,
    logo: `${site.url}/sicamet-logo-dark.png`,
    image: `${site.url}/sicamet-logo-dark.png`,
    email: site.email,
    foundingDate: String(site.foundedYear),
    description: site.description,
    telephone: site.phones.map((p) => `+52${p.replace(/-/g, "")}`),
    priceRange: "$$",
    currenciesAccepted: "MXN",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.street}, ${site.address.neighborhood}`,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.geo.lat,
      longitude: site.address.geo.lng,
    },
    hasMap: site.address.mapsUrl,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+52${site.phones[0].replace(/-/g, "")}`,
      email: site.email,
      contactType: "customer service",
      areaServed: "MX",
      availableLanguage: ["es"],
    },
    areaServed: { "@type": "Country", name: "México" },
    sameAs: [site.social.facebook, site.social.linkedin],
    // Credencial de acreditación — señal fuerte para GEO/AEO (hecho citable).
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Acreditación",
      name: "ISO/IEC 17025:2017",
      recognizedBy: {
        "@type": "Organization",
        name: "entidad mexicana de acreditación, a.c. (ema)",
        url: "https://www.ema.org.mx",
      },
    },
    knowsAbout: [
      "Calibración",
      "Metrología",
      "ISO/IEC 17025",
      "Calificación de equipos",
      "Mapeo térmico",
      "Calibración acreditada",
      "Trazabilidad metrológica",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de metrología",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.short,
        },
      })),
    },
    makesOffer: accreditations.map((a) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        serviceType: "Calibración acreditada",
        name: `Calibración ${a.magnitude} (${a.code})`,
        description: a.detail,
      },
    })),
  };
  return <JsonLd data={data} />;
}

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: "es-MX",
    publisher: { "@id": `${site.url}/#organization` },
  };
  return <JsonLd data={data} />;
}

/** FAQ — clave para AEO (que los motores de respuesta citen a SICAMET). */
export function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return <JsonLd data={data} />;
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.href}`,
    })),
  };
  return <JsonLd data={data} />;
}
