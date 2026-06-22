import type { MDXComponents } from "mdx/types";

// Personaliza los elementos renderizados desde archivos MDX.
const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-12 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 text-xl font-semibold text-foreground">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mt-4 leading-relaxed text-muted">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mt-4 space-y-2 pl-5 text-muted [&>li]:list-disc">{children}</ul>
  ),
  a: ({ href, children }) => (
    <a href={href} className="text-brand underline-offset-4 hover:underline">
      {children}
    </a>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
