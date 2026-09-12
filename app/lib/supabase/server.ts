import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// Service-role client. Bypasses RLS, so it must NEVER reach the browser —
// the `server-only` import above turns any accidental client-side import
// into a build error, and the env var deliberately has no NEXT_PUBLIC_
// prefix so Next will not inline it into a client bundle.
//
// The leads tables have RLS enabled with zero policies: this client is the
// only way in. See supabase/migrations/*_create_leads_tables.sql.
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY. " +
        "Revisa .env.local (desarrollo) o las variables de entorno del deploy."
    );
  }

  return createClient<Database>(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
