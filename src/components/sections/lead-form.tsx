"use client";

import { useState, type CSSProperties } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Field = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  full?: boolean;
  textarea?: boolean;
  placeholder?: string;
};

const baseFields: Field[] = [
  { name: "name", label: "Nombre completo", required: true },
  { name: "email", label: "Correo electrónico", type: "email", required: true },
  { name: "phone", label: "Teléfono", type: "tel" },
  { name: "company", label: "Empresa" },
];

/** Formulario reutilizable para Contacto y Centro de Quejas. */
export function LeadForm({
  type = "contacto",
  subjectLabel = "Asunto",
  subjectOptions,
  messageLabel = "Mensaje",
  submitLabel = "Enviar mensaje",
}: {
  type?: "contacto" | "queja";
  subjectLabel?: string;
  /** Si se pasa, el campo "asunto" se vuelve un selector con estas opciones. */
  subjectOptions?: string[];
  messageLabel?: string;
  submitLabel?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState("");
  const [caseType, setCaseType] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const val = (k: string) => ((form.get(k) as string | null) || "").trim();

    // Validación mínima en cliente.
    const name = val("name");
    const email = val("email");
    const message = val("message");
    if (!name || !email || !message) {
      setStatus("error");
      setFeedback("Nombre, correo y mensaje son obligatorios.");
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus("error");
      setFeedback("El envío de correo aún no está configurado.");
      return;
    }

    // Asunto: si es selector y eligió "Otro", usa lo que escribió.
    let subject = val("subject");
    if (subjectOptions && subject === "Otro") {
      const other = val("subjectOther");
      subject = other ? `Otro: ${other}` : "Otro";
    }

    setStatus("loading");
    const label = type === "queja" ? "Queja / Sugerencia" : "Contacto";

    try {
      // Web3Forms (plan gratis) solo acepta envíos desde el navegador.
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[${label}] ${subject || name} — sicamet.mx`,
          from_name: `SICAMET Web · ${name}`,
          email, // reply-to: al responder, va directo al cliente
          botcheck: val("botcheck") ? "true" : "",
          Tipo: label,
          Nombre: name,
          Correo: email,
          Teléfono: val("phone") || "—",
          Empresa: val("company") || "—",
          Asunto: subject || "—",
          Mensaje: message,
        }),
      });
      const data = (await res.json()) as { success?: boolean; message?: string };
      if (res.ok && data.success) {
        setStatus("ok");
        setFeedback(
          "¡Gracias! Hemos recibido tu mensaje y te contactaremos pronto.",
        );
        formEl.reset();
        setCaseType("");
      } else {
        setStatus("error");
        setFeedback(
          data.message ||
            "No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.",
        );
      }
    } catch {
      setStatus("error");
      setFeedback("Error de conexión. Intenta de nuevo.");
    }
  }

  if (status === "ok") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-brand/30 bg-brand/5 p-10 text-center">
        <CheckCircle2 className="h-14 w-14 text-brand" />
        <p className="max-w-sm text-pretty text-muted">{feedback}</p>
        <button
          onClick={() => {
            setStatus("idle");
            setCaseType("");
          }}
          className="text-sm font-medium text-brand hover:underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      data-reveal
      className="grid gap-4 rounded-3xl border border-border bg-card/50 p-6 sm:p-8 sm:grid-cols-2"
    >
      {/* honeypot anti-spam (oculto a usuarios reales) */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        style={{ display: "none" }}
      />
      {baseFields.map((f, i) => (
        <FieldInput key={f.name} field={f} index={i} />
      ))}

      {subjectOptions ? (
        <div
          data-reveal
          style={{ "--reveal-delay": "0.36s" } as CSSProperties}
          className="grid gap-4 sm:col-span-2"
        >
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">
              {subjectLabel}
              <span className="text-brand"> *</span>
            </span>
            <select
              name="subject"
              required
              value={caseType}
              onChange={(e) => setCaseType(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand"
            >
              <option value="" disabled>
                Selecciona una opción
              </option>
              {subjectOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>
          {caseType === "Otro" && (
            <FieldInput
              field={{
                name: "subjectOther",
                label: "Especifica cuál",
                required: true,
                full: true,
                placeholder: "Escribe el tipo de caso",
              }}
            />
          )}
        </div>
      ) : (
        <FieldInput
          index={4}
          field={{
            name: "subject",
            label: subjectLabel,
            full: true,
          }}
        />
      )}
      <FieldInput
        index={5}
        field={{
          name: "message",
          label: messageLabel,
          required: true,
          full: true,
          textarea: true,
        }}
      />

      <div
        data-reveal
        style={{ "--reveal-delay": "0.5s" } as CSSProperties}
        className="sm:col-span-2"
      >
        {status === "error" && (
          <p className="mb-3 text-sm text-red-500">{feedback}</p>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          className="ubtn disabled:opacity-60"
        >
          {status === "loading" ? "Enviando…" : submitLabel}
        </button>
        <p className="mt-3 text-xs text-muted">
          Al enviar aceptas nuestro{" "}
          <a href="/aviso-de-privacidad" className="text-brand hover:underline">
            Aviso de Privacidad
          </a>
          .
        </p>
      </div>
    </form>
  );
}

function FieldInput({ field, index = 0 }: { field: Field; index?: number }) {
  const cls =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand";
  return (
    <label
      data-reveal
      style={{ "--reveal-delay": `${0.12 + index * 0.06}s` } as CSSProperties}
      className={cn("block", field.full && "sm:col-span-2")}
    >
      <span className="mb-1.5 block text-sm font-medium">
        {field.label}
        {field.required && <span className="text-brand"> *</span>}
      </span>
      {field.textarea ? (
        <textarea
          name={field.name}
          required={field.required}
          rows={5}
          placeholder={field.placeholder}
          className={cn(cls, "resize-none")}
        />
      ) : (
        <input
          name={field.name}
          type={field.type || "text"}
          required={field.required}
          placeholder={field.placeholder}
          className={cls}
        />
      )}
    </label>
  );
}
