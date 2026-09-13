import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { EMPRESA } from "../data/empresa";

/**
 * Tarjeta que se ve cuando alguien comparte un enlace del sitio.
 *
 * Antes no había ninguna: los enlaces salían sin miniatura en WhatsApp, que es
 * por donde este negocio vende. Peor aún, siete páginas declaraban
 * `twitter: { card: "summary_large_image" }` sin imagen, así que la plataforma
 * reservaba el hueco grande y lo dejaba vacío.
 *
 * Al vivir en `app/[locale]/`, Next la asocia a TODO el segmento: cada página
 * de debajo la hereda como `og:image` y `twitter:image` sin declarar nada. Las
 * de producto la sustituyen por su propia foto, que es más útil.
 *
 * Se reusa el degradado de marca del splash y de los logins. Va escrito a mano
 * y no con `var(--marca-fondo)` porque esto se renderiza fuera del navegador:
 * Satori no evalúa CSS del sitio ni variables, solo los estilos en línea.
 */
export const alt = `${EMPRESA.nombreCorto} — Mobiliario e insumos`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Sin esto la ruta sale como dinámica en el build y la tarjeta se regenera en
 * cada petición de un rastreador. Es la misma imagen para los dos idiomas,
 * pero vive bajo `[locale]`, así que hay que enumerarlos igual que hace el
 * layout para que Next la prerrenderice.
 */
export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export default async function Imagen() {
  // El logo se inyecta como data URI: Satori no resuelve rutas del sitio.
  //
  // Y va en PNG, no en el WebP que usa el resto del proyecto: **Satori solo
  // decodifica PNG, JPEG y SVG**. Con el WebP el build muere con un
  // `TypeError: u2 is not iterable` desde el minificado, que no dice nada.
  const logo = await readFile(
    join(process.cwd(), "public/images/logo/logo-horizontal-white.png")
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(ellipse 80% 60% at 50% 45%, #171d10 0%, #10140d 55%, #0a0c08 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Halo verde, el mismo gesto que el splash. Va detrás del titular y
            no en el centro: así la mirada cae donde está el texto en lugar de
            quedarse en una mancha suelta en medio. */}
        <div
          style={{
            position: "absolute",
            bottom: -180,
            left: -120,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(170,198,55,0.20) 0%, rgba(170,198,55,0) 68%)",
            display: "flex",
          }}
        />

        {/* <img> y no next/image: esto lo renderiza Satori fuera del
            navegador, y ahí next/image no existe. */}
        <img src={logoSrc} width={218} height={140} alt="" style={{ display: "flex" }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 60,
              fontWeight: 700,
              color: "#f5f5f4",
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            {EMPRESA.nombreCorto}
          </div>
          <div
            style={{
              marginTop: 14,
              fontSize: 30,
              color: "#aac637",
              letterSpacing: "0.04em",
              display: "flex",
            }}
          >
            {/* El logo ya dice "Mobiliario e insumos": repetirlo aquí gastaba
                la línea. Esta añade qué se fabrica y dónde se entrega, que es
                lo que un enlace compartido tiene que comunicar. */}
            Mobiliario de oficina · CDMX y Edomex
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 26,
              color: "rgba(245,245,244,0.62)",
              display: "flex",
            }}
          >
            {EMPRESA.lema}
          </div>
        </div>
      </div>
    ),
    size
  );
}
