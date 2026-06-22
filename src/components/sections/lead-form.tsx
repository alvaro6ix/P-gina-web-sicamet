"use client";

import { useState } from "react";
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
  messageLabel = "Mensaje",
  submitLabel = "Enviar mensaje",
}: {
  type?: "contacto" | "queja";
  subjectLabel?: string;
  messageLabel?: string;
  submitLabel?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, type }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("ok");
        setFeedback(data.message);
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
        setFeedback(data.error || "Ocurrió un error.");
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
          onClick={() => setStatus("idle")}
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
      className="grid gap-4 rounded-3xl border border-border bg-card/50 p-6 sm:p-8 sm:grid-cols-2"
    >
      {baseFields.map((f) => (
        <FieldInput key={f.name} field={f} />
      ))}
      <FieldInput
        field={{
          name: "subject",
          label: subjectLabel,
          full: true,
        }}
      />
      <FieldInput
        field={{
          name: "message",
          label: messageLabel,
          required: true,
          full: true,
          textarea: true,
        }}
      />

      <div className="sm:col-span-2">
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

function FieldInput({ field }: { field: Field }) {
  const cls =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand";
  return (
    <label className={cn("block", field.full && "sm:col-span-2")}>
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
