-- Aplicada al proyecto remoto el 2026-09-12 vía MCP.
--
-- `es_admin()` y `tiene_acceso_interno()` estaban en `public`, que es el
-- esquema que PostgREST publica: quedaban invocables como
-- /rest/v1/rpc/es_admin por cualquiera, incluido `anon` (lo reportó
-- get_advisors como anon_security_definer_function_executable). Devolverían
-- solo un booleano sobre el propio llamante, pero no hay razón para que sean
-- parte de la API pública.
--
-- No basta con revocar EXECUTE: PostgreSQL evalúa las expresiones de las
-- políticas RLS con los permisos del rol que consulta, así que `authenticated`
-- necesita poder ejecutarlas o las políticas dejarían de funcionar. Lo que
-- cambia es la visibilidad en la API, no el permiso.

create schema if not exists private;

create or replace function private.es_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.perfiles
     where id = (select auth.uid()) and rol = 'admin' and activo
  );
$$;

create or replace function private.tiene_acceso_interno()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.perfiles
     where id = (select auth.uid()) and activo
  );
$$;

-- Las políticas dependen de las funciones viejas: hay que soltarlas antes.
drop policy "perfiles: el admin ve todos"      on public.perfiles;
drop policy "perfiles: solo el admin escribe"  on public.perfiles;
drop policy "invitaciones: solo el admin"      on public.invitaciones;
drop policy "contactos: el admin lee"          on public.contactos;
drop policy "contactos: el admin actualiza"    on public.contactos;
drop policy "cotizaciones: el admin lee"       on public.cotizaciones;
drop policy "cotizaciones: el admin actualiza" on public.cotizaciones;

create policy "perfiles: el admin ve todos"
  on public.perfiles for select
  using (private.es_admin());

create policy "perfiles: solo el admin escribe"
  on public.perfiles for all
  using (private.es_admin())
  with check (private.es_admin());

create policy "invitaciones: solo el admin"
  on public.invitaciones for all
  using (private.es_admin())
  with check (private.es_admin());

create policy "contactos: el admin lee"
  on public.contactos for select
  using (private.es_admin());

create policy "contactos: el admin actualiza"
  on public.contactos for update
  using (private.es_admin())
  with check (private.es_admin());

create policy "cotizaciones: el admin lee"
  on public.cotizaciones for select
  using (private.es_admin());

create policy "cotizaciones: el admin actualiza"
  on public.cotizaciones for update
  using (private.es_admin())
  with check (private.es_admin());

drop function public.es_admin();
drop function public.tiene_acceso_interno();

revoke all on schema private from anon, public;
grant usage on schema private to authenticated;
revoke all on function private.es_admin() from anon, public;
revoke all on function private.tiene_acceso_interno() from anon, public;
grant execute on function private.es_admin() to authenticated;
grant execute on function private.tiene_acceso_interno() to authenticated;
