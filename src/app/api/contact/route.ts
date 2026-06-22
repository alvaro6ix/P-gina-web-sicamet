import type { NextRequest } from "next/server";

export const runtime = "nodejs";

type Payload = {
  type?: "contacto" | "queja";
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  subject?: string;
  message?: string;
};

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(request: NextRequest) {
  let data: Payload;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const message = (data.message || "").trim();

  if (!name || !email || !message) {
    return Response.json(
      { error: "Nombre, correo y mensaje son obligatorios." },
      { status: 422 },
    );
  }
  if (!isEmail(email)) {
    return Response.json({ error: "Correo no válido." }, { status: 422 });
  }

  // -------------------------------------------------------------------
  // TODO (integración de correo): conectar un proveedor para enviar el
  // mensaje a sclientes@sicamet.net. Recomendado: Resend o Nodemailer.
  //
  // Ejemplo con Resend:
  //   import { Resend } from "resend";
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: "web@sicamet.mx",
  //     to: "sclientes@sicamet.net",
  //     subject: `[${data.type}] ${data.subject || name}`,
  //     text: `${name} (${email}, ${data.phone})\n\n${message}`,
  //   });
  // -------------------------------------------------------------------

  console.log("[contacto] nueva solicitud:", {
    type: data.type,
    name,
    email,
    phone: data.phone,
    company: data.company,
    subject: data.subject,
  });

  return Response.json({
    ok: true,
    message: "¡Gracias! Hemos recibido tu mensaje y te contactaremos pronto.",
  });
}
