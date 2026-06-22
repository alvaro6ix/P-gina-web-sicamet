/**
 * Fuente única de verdad del contenido de SICAMET.
 * Todo el sitio (secciones, SEO, JSON-LD, chatbot) lee de aquí.
 */

export const site = {
  name: "SICAMET",
  legalName:
    "Sistemas Integrales de Calibración y Aseguramiento Metrológico, S.A. de C.V.",
  tagline: "Metrología que mide la confianza",
  description:
    "Laboratorio de metrología acreditado bajo ISO/IEC 17025:2017. Servicios de calibración, calificación, consultoría y capacitación. Único partner de Vaisala en México.",
  foundedYear: 2003,
  yearsExperience: new Date().getFullYear() - 2003,
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.sicamet.mx",
  email: "sclientes@sicamet.net",
  phones: ["722-270-1584", "722-212-0722", "722-925-5606"],
  // Solo dígitos, formato internacional: 52 (México) + 10 dígitos, SIN el "1".
  // Número real: 722 379 2153 (verificado dígito por dígito con el cliente).
  whatsapp: "527223792153",
  whatsappDisplay: "722 379 2153",
  address: {
    street: "Juan Aldama Sur 1135",
    neighborhood: "Col. Universidad",
    zip: "50130",
    city: "Toluca",
    state: "Estado de México",
    country: "México",
    full: "Juan Aldama Sur 1135, Col. Universidad, C.P. 50130, Toluca, Edo. de México",
    geo: { lat: 19.2760614, lng: -99.6545903 },
    /** Enlace verificado a la ficha de Google Maps de SICAMET. */
    mapsUrl: "https://maps.app.goo.gl/ompjUCAdxK4XGxab7",
  },
  social: {
    facebook: "https://www.facebook.com/sicamet",
    linkedin:
      "https://www.linkedin.com/company/sistemas-integrales-de-calibraci%C3%B3n-y-aseguramiento-metrol%C3%B3gico-s-a-de-c-v",
  },
} as const;

/**
 * Enlace oficial "click-to-chat" de WhatsApp con mensaje opcional pre-escrito.
 * IMPORTANTE: incluye `type=phone_number` — sin ese parámetro WhatsApp NO
 * reconoce el número (responde "no está en WhatsApp"), aun siendo válido.
 * Formato verificado funcionando con el número de SICAMET.
 */
export function whatsappUrl(text?: string): string {
  const t = text ? encodeURIComponent(text) : "";
  return `https://api.whatsapp.com/send/?phone=${site.whatsapp}&text=${t}&type=phone_number&app_absent=0`;
}

export const navLinks = [
  { label: "Inicio", href: "/", icon: "Home" },
  { label: "Nosotros", href: "/nosotros", icon: "Building2" },
  { label: "Servicios", href: "/servicios", icon: "Wrench" },
  { label: "Acreditaciones", href: "/acreditaciones", icon: "BadgeCheck" },
  { label: "Certificados", href: "/certificados", icon: "FileCheck2" },
  { label: "Contacto", href: "/contacto", icon: "Mail" },
  { label: "Centro de Quejas", href: "/centro-de-quejas", icon: "MessageSquareWarning" },
] as const;

/** Portal externo de certificados para clientes. */
export const certificatesPortal = {
  url: "https://certificados.sicamet.cloud",
  domain: "certificados.sicamet.cloud",
  features: [
    "Consulta y descarga de certificados aprobados",
    "Estatus en tiempo real: disponibles, en proceso y pendientes de pago",
    "Acceso seguro con Razón Social y Código SICAMET",
    "Chat con asesor para soporte y actualización de perfil",
    "Multiplataforma: PC, tablet y móvil",
    "Cierre de sesión automático por inactividad",
  ],
} as const;

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  bullets: string[];
  icon: string; // nombre de icono lucide
};

export const services: Service[] = [
  {
    slug: "calificacion",
    title: "Calificación",
    short:
      "Calificación de áreas y equipos para cumplimiento regulatorio nacional e internacional.",
    description:
      "Aseguramos la calidad y eficacia de procesos críticos mediante la calificación de áreas y equipos bajo Buenas Prácticas de Fabricación, ISO 14644 (áreas limpias) e ISO/IEC 17025.",
    bullets: [
      "Calificación de Diseño, Instalación, Operación y Desempeño (DQ/IQ/OQ/PQ)",
      "Plan Maestro de Calificación y Requerimientos de Usuario",
      "Mapeos térmicos de almacenes y cámaras",
      "Validación de red de frío (OMS / ISPE)",
      "Calificación de áreas limpias (ISO 14644)",
      "Análisis estadístico e informe de resultados",
    ],
    icon: "ShieldCheck",
  },
  {
    slug: "calibracion",
    title: "Calibración",
    short:
      "Calibración acreditada ISO/IEC 17025 en sitio, en laboratorio y personalizada.",
    description:
      "Servicio de calibración de alta calidad acreditado según ISO/IEC 17025 y reconocido por ema, a.c. Garantizamos trazabilidad y mediciones confiables en los puntos críticos de su operación.",
    bullets: [
      "Calibración en sitio (In-Plant) sin tiempo de inactividad",
      "Calibración en laboratorio (In-Lab SICAMET)",
      "Calibración acreditada reconocida por ema, a.c.",
      "Calibración personalizada en puntos críticos de uso",
      "Pólizas de servicio y mantenimiento preventivo",
      "Servicios de ajuste y certificado de calibración",
    ],
    icon: "Gauge",
  },
  {
    slug: "consultoria",
    title: "Consultoría y Capacitación",
    short:
      "Transferimos conocimiento en metrología, calificación y aseguramiento de mediciones.",
    description:
      "Fortalecemos la cultura metrológica de su organización con asesoría especializada y capacitación en línea, presencial o In-Lab, en Querétaro, Guadalajara, Toluca y CDMX.",
    bullets: [
      "Metrología industrial",
      "Administración de laboratorios ISO/IEC 17025",
      "Asesoría para acreditación de laboratorios",
      "Evaluación de la conformidad (reglas ILAC)",
      "Capacitación en línea, presencial e In-Lab",
      "Programas a la medida del cliente",
    ],
    icon: "GraduationCap",
  },
  {
    slug: "vaisala",
    title: "Vaisala Service Partner",
    short:
      "Único partner certificado y avalado por Vaisala en México.",
    description:
      "Soporte técnico, reemplazo de sensores, garantías y planes de garantía extendida Care Calibration Service como partner oficial de Vaisala.",
    bullets: [
      "Garantías y soporte técnico oficial",
      "Reemplazo de sensores",
      "Care Calibration Service (garantía extendida)",
      "Atención especializada para equipos Vaisala",
    ],
    icon: "Award",
  },
];

export type Accreditation = {
  code: string;
  magnitude: string;
  /** Resumen corto para las tarjetas. */
  scope: string;
  /** Alcance oficial completo (textual de ema/sitio); lo usa el chatbot. */
  detail: string;
  pdf: string;
  icon: string;
  /** Instrumento SVG animado asociado (ver components/metrology/instruments) */
  instrument: string;
};

export const accreditations: Accreditation[] = [
  {
    code: "AE-18",
    magnitude: "Analizadores Específicos",
    scope:
      "Calibración de dinamómetros vehiculares: inercia equivalente, pérdidas parásitas, potencia al freno y velocidad lineal.",
    detail:
      "Servicio de calibración de dinamómetros vehiculares para la determinación de inercia equivalente, pérdidas parásitas, potencia al freno y velocidad lineal por medición directa.",
    pdf: "/acreditaciones/AE18.pdf",
    icon: "Activity",
    instrument: "analyzers",
  },
  {
    code: "D-145",
    magnitude: "Dimensional",
    scope:
      "Dimensionamiento geométrico de diámetros, longitudes y brazos de palanca de dinamómetros vehiculares por método trigonométrico.",
    detail:
      "Servicio de calibración para el dimensionamiento geométrico de los diámetros, longitudes y brazos de palanca de dinamómetros vehiculares, por método trigonométrico.",
    pdf: "/acreditaciones/D145.pdf",
    icon: "Ruler",
    instrument: "dimensional",
  },
  {
    code: "E-111",
    magnitude: "Eléctrica",
    scope:
      "Calibración por simulación de señal eléctrica de registradores, controladores y transmisores de temperatura (termopar y RTD de platino).",
    detail:
      "Servicios de calibración por simulación de señal eléctrica de instrumentos de medición de lectura directa de temperatura tipo registradores, controladores y transmisores de temperatura actuados por una señal eléctrica de sensores tipo termopar y termómetros de resistencia de platino, por método de comparación directa.",
    pdf: "/acreditaciones/E111.pdf",
    icon: "Zap",
    instrument: "electrical",
  },
  {
    code: "F-44",
    magnitude: "Fuerza",
    scope:
      "Durómetros farmacéuticos, máquinas y transductores de fuerza (tracción/compresión) y celdas de carga para dinamómetro vehicular.",
    detail:
      "Servicios de calibración de instrumentos de medición de fuerza (durómetros farmacéuticos), máquinas de medición de fuerza (tracción y/o compresión), instrumentos de medición de fuerza (compresión y/o tracción), transductores de fuerza (tracción y/o compresión) y celda de carga para dinamómetro vehicular (tracción y/o compresión), por comparación directa.",
    pdf: "/acreditaciones/F44.pdf",
    icon: "Dumbbell",
    instrument: "force",
  },
  {
    code: "FL-20",
    magnitude: "Flujo",
    scope:
      "Anemómetros (veleta o filamento) y medidores de caudal (desplazamiento positivo, rotámetros y de burbuja).",
    detail:
      "Servicio de calibración especializado para medidores de velocidad tipo veleta o filamento (anemómetros); también ofrece calibración de medidores de caudal como desplazamiento positivo, rotámetros y de burbuja, por método de comparación dinámica.",
    pdf: "/acreditaciones/FL20.pdf",
    icon: "Wind",
    instrument: "flow",
  },
  {
    code: "H-11",
    magnitude: "Humedad",
    scope:
      "Higrómetros y sensores de humedad y punto de rocío (resistivos y capacitivos).",
    detail:
      "Servicio de calibración de higrómetros y sensores de humedad y punto de rocío tipo resistivo y capacitivo, por método de comparación directa y método de dos presiones.",
    pdf: "/acreditaciones/H11.pdf",
    icon: "Droplets",
    instrument: "humidity",
  },
  {
    code: "M-77",
    magnitude: "Masa",
    scope:
      "Pesas patrón clase M1 o inferior (1 mg – 20 kg) e instrumentos para pesar (5 g – 1 000 kg).",
    detail:
      "Servicio de calibración acreditado para pesas patrón de clase M1 o inferior desde 1 mg hasta 20 kg (comparación directa contra patrón, doble sustitución ABBA), objetos sólidos no normalizados (OSNN) por sustitución simple BA, e instrumentos para pesar desde 5 g hasta 1 000 kg, por método de comparación directa contra patrones.",
    pdf: "/acreditaciones/M77.pdf",
    icon: "Scale",
    instrument: "mass",
  },
  {
    code: "ME-01",
    magnitude: "Mediciones Especiales",
    scope:
      "Calificación (DQ/IQ/OQ/PQ) de medios isotermos: estufas, incubadoras, autoclaves, cámaras climáticas, ultracongeladores e instrumentación analítica.",
    detail:
      "Servicios acreditados para la calificación de medios isotermos como estufas, incubadoras, autoclaves, almacenes, refrigeradores, cámaras climáticas, ultracongeladores e instrumentación analítica. Incluye las etapas de calificación del diseño (CD/DQ), de la instalación (CI/IQ), de la operación (CO/OQ), del desempeño (CF/PQ) y/o caracterización metrológica.",
    pdf: "/acreditaciones/ME01.pdf",
    icon: "Thermometer",
    instrument: "special",
  },
  {
    code: "OP-21",
    magnitude: "Óptica",
    scope:
      "Medidores de iluminancia (fotómetros) por comparación directa con iluminante tipo A.",
    detail:
      "Servicios acreditados para la calibración de medidores de iluminancia o fotómetros, por método de comparación directa con un iluminante tipo A.",
    pdf: "/acreditaciones/OP21.pdf",
    icon: "Sun",
    instrument: "optics",
  },
  {
    code: "P-51",
    magnitude: "Presión",
    scope:
      "Transmisores y manómetros de presión relativa/absoluta/diferencial (5 Pa – 135 MPa), barómetros (≤110 kPa) y vacuómetros.",
    detail:
      "Servicios de calibración de transmisores de presión relativa y absoluta con señal de salida eléctrica, manómetros de presión diferencial desde 5 Pa, manómetros de presión relativa hasta 135 MPa, barómetros de presión absoluta hasta 110 kPa, vacuómetros y manómetros asociados a esfigmomanómetros hasta 40 kPa, por método de comparación directa.",
    pdf: "/acreditaciones/P51.pdf",
    icon: "Wind",
    instrument: "pressure",
  },
  {
    code: "T-56",
    magnitude: "Temperatura",
    scope:
      "Termómetros de radiación sin contacto (0 – 500 °C) y sensores de contacto (-90 – 700 °C): termopares, RTD de platino, líquido en vidrio y transmisores.",
    detail:
      "Servicios acreditados para la calibración de termómetros de no contacto (termómetros de radiación) desde 0 °C hasta 500 °C; la capacidad incluye sensores de contacto desde -90 °C hasta 700 °C para termómetros de lectura directa, termómetros de líquido en vidrio, termopares, termómetros de resistencia de platino y transmisores con señal de salida eléctrica, por método de comparación directa.",
    pdf: "/acreditaciones/T56.pdf",
    icon: "Thermometer",
    instrument: "temperature",
  },
  {
    code: "V-40",
    magnitude: "Volumen",
    scope:
      "Material volumétrico de pequeños, medianos y micro volúmenes (20 µL – 15 L).",
    detail:
      "Servicios de calibración de material volumétrico para pequeños, medianos y micro volúmenes, desde 20 µL hasta 15 L.",
    pdf: "/acreditaciones/V40.pdf",
    icon: "FlaskConical",
    instrument: "volume",
  },
];

export const clients = [
  "Bayer",
  "Bimbo",
  "Novartis",
  "Sigma",
  "Barcel",
  "Rayere",
  "Silodisa",
  "Aerobal",
  "Tía Rosa",
] as const;

export const stats = [
  { value: site.yearsExperience, suffix: "+", label: "Años de experiencia" },
  { value: 12, suffix: "", label: "Acreditaciones EMA" },
  { value: 6, suffix: "", label: "Reconocimientos al compromiso" },
  { value: 100, suffix: "%", label: "Trazabilidad garantizada" },
] as const;

export const contacts = [
  {
    name: "Alejandra Mendoza",
    role: "Servicio al Cliente",
    email: "sclientes@sicamet.net",
  },
  {
    name: "Dolores Cerón",
    role: "Dirección Técnica",
    email: "dceron@sicamet.net",
  },
  {
    name: "Ezequiel Noguez",
    role: "Solicitudes Vaisala",
    email: "enoguez@sicamet.net",
  },
] as const;

export const faqs = [
  {
    q: "¿Qué es la acreditación ISO/IEC 17025?",
    a: "Es la norma internacional que establece los requisitos de competencia técnica para laboratorios de ensayo y calibración. SICAMET opera bajo ISO/IEC 17025:2017 y cuenta con 12 acreditaciones otorgadas por ema, a.c.",
  },
  {
    q: "¿Realizan calibración en sitio?",
    a: "Sí. Ofrecemos calibración In-Plant en las instalaciones del cliente, incluso para sistemas de monitoreo continuo, sin tiempo de inactividad y con certificado de calibración.",
  },
  {
    q: "¿Qué magnitudes calibran?",
    a: "Calibramos 12 magnitudes acreditadas: temperatura, presión, masa, humedad, flujo, fuerza, dimensional, eléctrica, óptica, volumen, analizadores específicos y mediciones especiales.",
  },
  {
    q: "¿Son partner de Vaisala?",
    a: "Sí. SICAMET es el único partner de servicios de calibración y mantenimiento en México certificado y avalado por Vaisala, con soporte técnico, reemplazo de sensores y garantía extendida.",
  },
  {
    q: "¿Dónde se ubican y a qué zonas dan servicio?",
    a: "Estamos en Toluca, Estado de México (Juan Aldama Sur 1135, Col. Universidad, C.P. 50130), y damos servicio en todo el país, con capacitación en Querétaro, Guadalajara, Toluca y Ciudad de México.",
  },
  {
    q: "¿Cuál es su horario de atención?",
    a: "Atendemos de lunes a viernes de 8:00 a 18:00 horas.",
  },
  {
    q: "¿Cuánto tarda el servicio de calibración?",
    a: "El tiempo varía según el equipo. Las calibraciones estándar (temperatura, presión) tardan alrededor de 10 días hábiles en laboratorio. Para servicio en sitio coordinamos la fecha contigo.",
  },
  {
    q: "¿Cuánto cuesta una calibración?",
    a: "Los precios varían según el tipo de equipo, la magnitud y la modalidad (en laboratorio o en sitio). Preparamos una cotización personalizada sin costo; escríbenos o llámanos para solicitarla.",
  },
];
