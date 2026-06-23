import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Permite usar .md / .mdx como páginas y componentes de contenido
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 100],
  },
};

const withMDX = createMDX({
  // Se pueden agregar plugins remark/rehype aquí si se necesitan
});

export default withMDX(nextConfig);
