# SICAMET — Sitio web

Rediseño moderno del sitio de **Sistemas Integrales de Calibración A.C. (SICAMET)**,
laboratorio de metrología acreditado ISO/IEC 17025:2017.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (modo claro/oscuro por clase + View Transitions)
- **GSAP** + **ScrollTrigger** + **Lenis** (animaciones y smooth scroll)
- **Framer Motion** (microinteracciones, navbar, chatbot, FAQ)
- **Embla Carousel** (carruseles) · **lucide-react** (iconos)
- **@google/generative-ai** (chatbot con Gemini)
- **MDX** habilitado para contenido (`@next/mdx`)

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # y completa las claves
npm run dev                  # http://localhost:3000
```

### Variables de entorno (`.env.local`)

| Variable | Descripción |
|----------|-------------|
| `GEMINI_API_KEY` | Clave de Google Gemini para el chatbot. https://aistudio.google.com/app/apikey |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio (metadata, sitemap, OG). |

## Estructura

```
src/
├─ app/                     # Rutas (App Router)
│  ├─ api/chat/             # Endpoint del chatbot (Gemini)
│  ├─ api/contact/          # Endpoint de formularios
│  ├─ nosotros, servicios, acreditaciones, contacto, centro-de-quejas
│  ├─ sitemap.ts, robots.ts # SEO
│  └─ layout.tsx, page.tsx
├─ components/
│  ├─ layout/   (navbar, footer, preloader, whatsapp, page-hero, logo)
│  ├─ sections/ (hero, servicios, acreditaciones, vaisala, faq, cta…)
│  ├─ theme/    (provider + toggle estilo rdsx con reveal circular)
│  ├─ chatbot/  (widget MetroBot)
│  ├─ seo/      (JSON-LD: Organization, LocalBusiness, FAQ, Breadcrumb)
│  └─ ui/       (button, container, counter, reveal, icon)
└─ lib/
   └─ content.ts            # ⭐ Fuente única de contenido (editar aquí)
```

## Personalización

- **Contenido** (servicios, acreditaciones, contactos, FAQ, datos de la empresa):
  edita `src/lib/content.ts`. Todo el sitio, el SEO y el chatbot leen de ahí.
- **Paleta de colores y tema**: variables CSS en `src/app/globals.css`.
- **PDFs de acreditaciones**: colócalos en `public/acreditaciones/` (ver `LEEME.txt`).

## Pendientes para producción

1. Configurar `GEMINI_API_KEY` para activar el chatbot.
2. Conectar el envío de correo en `src/app/api/contact/route.ts`
   (recomendado: Resend o Nodemailer → `sclientes@sicamet.net`).
3. Subir los PDF de certificados a `public/acreditaciones/`.
4. Añadir imagen Open Graph (`/opengraph-image.png`) y favicon definitivo.
5. Desplegar en **Vercel** y apuntar el dominio `sicamet.mx`.

## SEO / AEO / GEO

- Metadata + Open Graph + Twitter Card en cada página.
- JSON-LD: `Organization` + `LocalBusiness` (con geocoordenadas de Toluca),
  `WebSite`, `FAQPage` (AEO) y `BreadcrumbList`.
- `sitemap.xml` y `robots.txt` generados dinámicamente.
