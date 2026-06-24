import { Fragment, type ReactNode } from "react";

/**
 * Resalta la marca SICAMET en negritas y mayúsculas dentro de cualquier texto
 * plano, devolviendo nodos React listos para renderizar.
 *
 * Importante: opera en la capa de renderizado y NO altera las cadenas
 * originales de `content.ts`, que también alimentan SEO/JSON-LD como texto
 * plano. Por eso el bold se aplica aquí y no en el contenido.
 */
export function highlightBrand(text: string): ReactNode {
  return text.split(/(sicamet)/gi).map((part, i) =>
    part.toLowerCase() === "sicamet" ? (
      <strong key={i} className="font-bold">
        SICAMET
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
