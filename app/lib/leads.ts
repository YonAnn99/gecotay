import type { Database } from "./supabase/types";

export type LeadEstado = Database["public"]["Enums"]["lead_estado"];

/**
 * Estados de seguimiento comercial, en el orden del embudo.
 *
 * Vive aquí y no en `app/actions/leads-admin.ts` porque un archivo con
 * `"use server"` solo puede exportar funciones async: exportar esta constante
 * desde allí rompe el build con "A 'use server' file can only export async
 * functions, found object".
 */
export const ESTADOS_LEAD: LeadEstado[] = [
  "nuevo",
  "contactado",
  "cotizado",
  "ganado",
  "perdido",
];

export const TABLAS_LEAD = ["contactos", "cotizaciones"] as const;
export type TablaLead = (typeof TABLAS_LEAD)[number];
