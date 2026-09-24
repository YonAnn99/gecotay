/**
 * Traduce el `motivo` de `enviarCorreo()` a algo que el admin pueda resolver.
 *
 * Los códigos de Resend que importan: 401/403 son la clave (falta, es de otra
 * cuenta o no tiene permiso de envío) o un remitente cuyo dominio no está
 * verificado; 422 es un campo inválido, casi siempre `CORREO_REMITENTE` mal
 * escrito; 429 es el límite de envíos.
 */
export function explicarMotivoCorreo(motivo?: string): string | null {
  if (!motivo) return null;
  if (motivo === "sin-proveedor") {
    return "Falta RESEND_API_KEY o CORREO_REMITENTE en las variables de entorno del servidor.";
  }
  if (motivo === "http-401" || motivo === "http-403") {
    return "Resend rechazó la clave o el remitente: revisa RESEND_API_KEY y que el dominio de CORREO_REMITENTE esté verificado.";
  }
  if (motivo === "http-422") {
    return "Resend rechazó el mensaje por un dato inválido: revisa el formato de CORREO_REMITENTE.";
  }
  if (motivo === "http-429") {
    return "Se alcanzó el límite de envíos de Resend. Inténtalo en unos minutos.";
  }
  if (motivo === "red") {
    return "No se pudo conectar con Resend. Inténtalo de nuevo.";
  }
  if (motivo === "sin-colaborador") {
    return "Ese colaborador ya no existe o no tiene código.";
  }
  return `Resend respondió con error (${motivo.replace("http-", "")}).`;
}
