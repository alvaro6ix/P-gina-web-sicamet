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
- **Mapbox GL** (mapa 3D de contacto; con fallback a Google Maps sin token)
- **MDX** habilitado para contenido (`@next/mdx`)

> **Soporte de navegadores:** el campo `browserslist` de `package.json` apunta a
> navegadores modernos (Chrome/Edge/Firefox ≥ 111, Safari/iOS ≥ 16.4), alineado
> con Tailwind v4, para evitar transpilar polyfills innecesarios.

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
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio (metadata, sitemap, OG). **En producción debe ser el dominio real.** |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | *(Opcional)* Token público de Mapbox para el mapa 3D de `/contacto`. Sin él, se usa un fallback de Google Maps. |

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
│  ├─ layout/   (navbar, footer, preloader [logo], whatsapp, page-hero, logo)
│  ├─ sections/ (hero, servicios, acreditaciones, vaisala, faq, cta,
│  │             location-map [Mapbox], complaint-flow [diagrama quejas]…)
│  ├─ theme/    (provider + toggle estilo rdsx con reveal circular)
│  ├─ chatbot/  (widget del asistente con Gemini)
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

1. **Conectar el envío de correo** en `src/app/api/contact/route.ts` (hoy solo
   valida y responde OK; falta el envío real → `sclientes@sicamet.net`).
   Recomendado: Resend o Nodemailer.
2. **Desplegar en Vercel** y apuntar el dominio `sicamet.mx`. Al hacerlo,
   configurar las variables de entorno:
   - `NEXT_PUBLIC_SITE_URL=https://www.sicamet.mx` (clave para el SEO).
   - `GEMINI_API_KEY` (chatbot) y, opcional, `NEXT_PUBLIC_MAPBOX_TOKEN` (mapa 3D).
3. **Logging del chatbot**: en producción migrar el registro de conversaciones
   de `logs/*.jsonl` (FS efímero en Vercel) a una BD (Vercel KV/Postgres/Supabase).
4. Tras el deploy: dar de alta el `sitemap.xml` en Google Search Console y Bing.

> Ya hecho: 12 PDF de acreditaciones en `public/acreditaciones/`, imagen Open
> Graph dinámica (`opengraph-image.tsx`), favicon (`icon.png`/`apple-icon.png`)
> y chatbot funcionando con `gemini-2.5-flash`.

## Páginas destacadas

- **`/contacto`** — mapa con Mapbox GL 3D (fallback a Google), tarjeta de datos
  e indicador de horario abierto/cerrado en vivo.
- **`/centro-de-quejas`** — diagrama **interactivo** del proceso de atención a
  quejas (ISO 17025) con código de color y lazos de retroalimentación.
- **`/acreditaciones`** — las 12 acreditaciones EMA con sus alcances y PDF.

## SEO / AEO / GEO

- Metadata + Open Graph + Twitter Card en cada página.
- JSON-LD: `Organization` + `LocalBusiness` (con geocoordenadas de Toluca),
  `WebSite`, `FAQPage` (AEO) y `BreadcrumbList`.
- `sitemap.xml` y `robots.txt` generados dinámicamente.
