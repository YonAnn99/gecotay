import "server-only";

/**
 * Envío de correo transaccional.
 *
 * OJO con una confusión fácil: el SMTP que se configura en Supabase → Auth →
 * Settings solo afecta a los correos que **Supabase Auth** manda por su cuenta
 * (confirmación, magic link, recuperación). El correo con el código de
 * invitación es nuestro, así que necesita su propio emisor.
 *
 * Se usa la API HTTP de Resend con `fetch`, sin SDK: son treinta líneas y
 * evita una dependencia más. Si no hay `RESEND_API_KEY`, no se revienta nada:
 * se devuelve `enviado: false` y el panel muestra el código para que el admin
 * lo haga llegar por su cuenta. La invitación es válida igual.
 */
export interface ResultadoCorreo {
  enviado: boolean;
  motivo?: string;
}

interface Mensaje {
  para: string;
  asunto: string;
  html: string;
  texto: string;
}

/**
 * Reconstruye `Nombre <correo>` a partir de lo que haya en la variable.
 *
 * Pegar el valor en el panel de Vercel suele colar comillas (también las
 * tipográficas), espacios invisibles o el `CLAVE=` delante, y Resend lo
 * rechaza con un 422 «Invalid `from` field». En vez de confiar en el formato,
 * se extrae la dirección y el nombre y se rearma limpio.
 */
function normalizarRemitente(valor: string): string | null {
  const email = valor.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/)?.[0];
  if (!email) return null;
  const nombre = valor
    .slice(0, valor.indexOf(email))
    .replace(/^\s*CORREO_REMITENTE\s*=/, "")
    .replace(/[<>"'“”‘’«»\s ​﻿]+/g, " ")
    .trim();
  return nombre ? `${nombre} <${email}>` : email;
}

export async function enviarCorreo({ para, asunto, html, texto }: Mensaje): Promise<ResultadoCorreo> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const crudo = process.env.CORREO_REMITENTE;

  if (!apiKey || !crudo) {
    return { enviado: false, motivo: "sin-proveedor" };
  }

  const remitente = normalizarRemitente(crudo);
  if (!remitente) {
    // El remitente no es un secreto: se registra tal cual (con JSON.stringify
    // para que se vean comillas y caracteres invisibles) para poder corregirlo.
    console.error("[correo] CORREO_REMITENTE sin dirección válida:", JSON.stringify(crudo));
    return { enviado: false, motivo: "http-422" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: remitente, to: [para], subject: asunto, html, text: texto }),
    });

    if (!res.ok) {
      const detalle = await res.text();
      console.error("[correo] Resend respondió", res.status, detalle.slice(0, 300), "from:", JSON.stringify(remitente));
      return { enviado: false, motivo: `http-${res.status}` };
    }

    return { enviado: true };
  } catch (err) {
    console.error("[correo] fallo de red al enviar:", err);
    return { enviado: false, motivo: "red" };
  }
}

/**
 * Plantilla del correo de acceso.
 *
 * El texto dice explícitamente que el código **es** la contraseña y que no
 * caduca. La versión anterior hablaba de canjearlo y elegir contraseña; con el
 * modelo actual eso confundiría a quien lo recibe.
 */
export function plantillaAcceso(codigo: string, url: string) {
  const texto = [
    "Grupo Ecotay — acceso al módulo de ventas",
    "",
    "Un administrador te dio acceso. Para entrar:",
    `1. Abre ${url}`,
    "2. Escribe este correo y el código de abajo",
    "",
    `Tu código: ${codigo}`,
    "",
    "Ese código es tu contraseña: no caduca y sirve cada vez que entres.",
    "Guárdalo. Si lo pierdes, pídeselo al administrador.",
    "",
    "Si no esperabas este correo, ignóralo.",
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;color:#10140d">
      <p style="font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#AAC637;margin:0">Grupo Ecotay</p>
      <h1 style="font-size:22px;margin:8px 0 24px">Acceso al módulo de ventas</h1>
      <p style="line-height:1.6;margin:0 0 20px">Un administrador te dio acceso. Entra en
        <a href="${url}" style="color:#10140d">el módulo de ventas</a> y escribe este correo junto con tu código.</p>
      <p style="font-family:ui-monospace,monospace;font-size:26px;letter-spacing:.2em;background:#f4f6ee;border-radius:12px;padding:18px;text-align:center;margin:0 0 20px">${codigo}</p>
      <p style="line-height:1.6;margin:0 0 12px"><strong>Ese código es tu contraseña.</strong> No caduca y sirve cada vez que entres, así que guárdalo. Si lo pierdes, pídeselo al administrador.</p>
      <p style="line-height:1.6;color:#5b6150;font-size:14px;margin:0">Si no esperabas este correo, ignóralo.</p>
    </div>`;

  return { html, texto };
}
