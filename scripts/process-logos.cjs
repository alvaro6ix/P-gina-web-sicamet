// Quita el fondo sólido de los logos Vaisala y los exporta como WebP transparente.
const sharp = require("sharp");
const path = require("path");

const pub = path.join(__dirname, "..", "public");

async function chromaKey(input, output, bg, inner = 70, outer = 150, resize = null) {
  let pipe = sharp(path.join(pub, input)).ensureAlpha();
  if (resize) pipe = pipe.resize({ width: resize });
  const { data, info } = await pipe.raw().toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a === 0) continue;
    const dr = data[i] - bg[0];
    const dg = data[i + 1] - bg[1];
    const db = data[i + 2] - bg[2];
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);
    if (dist < inner) {
      data[i + 3] = 0;
    } else if (dist < outer) {
      data[i + 3] = Math.min(a, Math.round((255 * (dist - inner)) / (outer - inner)));
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .webp({ quality: 92 })
    .toFile(path.join(pub, output));
  console.log("✓", output);
}

(async () => {
  // --- Vaisala ---
  await chromaKey("vaisala-blue.png", "vaisala-dark.webp", [5, 42, 60]);
  await chromaKey("vaisala-white.png", "vaisala-light.webp", [255, 255, 255]);

  // --- SICAMET ---
  // claro: navy + arpón gris + dorado sobre blanco (tolerancia baja para no comerse el gris)
  await chromaKey("sicamet-logo-light.png", "sicamet-light.webp", [252, 252, 252], 22, 60, 700);
  // oscuro: texto blanco sobre navy -> transparente
  await chromaKey("sicamet-logo-dark.png", "sicamet-dark.webp", [0, 47, 101], 55, 120);
})().catch((e) => {
  console.error("ERROR", e);
  process.exit(1);
});
