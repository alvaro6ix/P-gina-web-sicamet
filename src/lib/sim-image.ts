/**
 * Imagen de SIMULACIÓN temática (relacionada a metrología / laboratorio).
 * Usa LoremFlickr, que devuelve fotos reales por palabra clave. `lock` fija la
 * imagen para que sea estable (misma foto en cada carga). Son de muestra: se
 * reemplazan por las fotos reales del laboratorio cuando estén listas.
 */
export function simImage(topic: string, w = 800, h = 600, lock = 1) {
  return `https://loremflickr.com/${w}/${h}/${encodeURIComponent(topic)}?lock=${lock}`;
}

/** Imagen directa de Unsplash a partir del id (photo-...), optimizada. */
export function unsplashImg(id: string, w = 900, h = 600, q = 70) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=${q}`;
}
