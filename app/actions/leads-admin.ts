"use server";

import { revalidatePath } from "next/cache";
import { requerirPerfil } from "@/app/lib/auth";
import { createSessionClient } from "@/app/lib/supabase/server-session";
import { ESTADOS_LEAD, TABLAS_LEAD, type LeadEstado, type TablaLead } from "@/app/lib/leads";

const RUTA_LEADS = "/admin/leads";
const MAX_NOTAS = 4000;

/**
 * Cambia el estado de seguimiento y/o las notas de un lead.
 *
 * Escribe con el cliente de SESIÓN, no con `service_role`: las políticas
 * `contactos/cotizaciones: el admin actualiza` ya autorizan exactamente esto,
 * así que no hay razón para saltarse RLS. Si la sesión se pierde, la escritura
 * falla en vez de aplicarse con privilegio.
 *
 * `requerirPerfil` va dentro de la acción y no solo en el layout: una Server
 * Action es un endpoint POST alcanzable sin pasar por la UI.
 */
export async function actualizarLead(formData: FormData): Promise<void> {
  await requerirPerfil(["admin"]);

  const id = String(formData.get("id") ?? "");
  const tabla = String(formData.get("tabla") ?? "") as TablaLead;
  if (!id || !TABLAS_LEAD.includes(tabla)) return;

  const estadoBruto = String(formData.get("estado") ?? "");
  const estado = ESTADOS_LEAD.includes(estadoBruto as LeadEstado)
    ? (estadoBruto as LeadEstado)
    : null;

  const notasBrutas = formData.get("notas");
  const notas =
    typeof notasBrutas === "string"
      ? notasBrutas.trim().slice(0, MAX_NOTAS) || null
      : undefined;

  const cambios: { estado?: LeadEstado; notas?: string | null } = {};
  if (estado) cambios.estado = estado;
  if (notas !== undefined) cambios.notas = notas;
  if (!Object.keys(cambios).length) return;

  const supabase = await createSessionClient();
  const { error } = await supabase.from(tabla).update(cambios).eq("id", id);

  if (error) {
    console.error(`[admin/leads] no se pudo actualizar ${tabla}/${id}:`, error.message);
    return;
  }

  revalidatePath(RUTA_LEADS);
}
