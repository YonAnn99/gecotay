-- Aplicada al proyecto remoto (ffhyxkawjcegvbgbfqke) el 2026-09-12 vía MCP.
--
-- Identidad y roles para los módulos internos (app.gecotay.com y
-- ventas.gecotay.com).
--
-- No hay registro público: nadie se da de alta solo. El primer admin se crea
-- a mano desde el dashboard; los colaboradores de ventas solo existen si un
-- admin los invita y ellos canjean el código. Por eso NO hay trigger sobre
-- auth.users que autocree perfiles: un alta accidental en Auth no debe
-- traducirse nunca en acceso.

create type public.rol_usuario as enum ('admin', 'ventas');

create table public.perfiles (
  id             uuid primary key references auth.users (id) on delete cascade,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),

  email          text not null unique check (length(email) between 3 and 200),
  nombre         text          check (nombre is null or length(trim(nombre)) between 1 and 120),
  rol            public.rol_usuario not null,

  -- Revocar el acceso sin borrar el histórico de quién entró y cuándo.
  activo         boolean not null default true,
  ultimo_acceso  timestamptz
);

create type public.estado_invitacion as enum ('pendiente', 'usada', 'expirada', 'revocada');

create table public.invitaciones (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),

  email        text not null check (length(email) between 3 and 200),

  -- Código alfanumérico de un solo uso, visible para el admin SOLO mientras
  -- la invitación está pendiente (para poder dictarlo si el correo no llega).
  -- Al canjearse, expirar o revocarse se pone a NULL: deja de existir en la
  -- base, así que una fuga posterior no revela credenciales reutilizables.
  codigo       text unique check (codigo is null or codigo ~ '^[A-Z0-9]{8}$'),

  estado       public.estado_invitacion not null default 'pendiente',
  rol          public.rol_usuario not null default 'ventas',

  creada_por   uuid references public.perfiles (id) on delete set null,
  expira_en    timestamptz not null default (now() + interval '7 days'),
  usada_en     timestamptz,
  perfil_id    uuid references public.perfiles (id) on delete set null,

  constraint invitacion_coherente check (
    (estado = 'pendiente' and codigo is not null and usada_en is null)
    or (estado = 'usada'   and codigo is null and usada_en is not null)
    or (estado in ('expirada', 'revocada') and codigo is null)
  )
);

create index perfiles_rol_idx        on public.perfiles     (rol) where activo;
create index invitaciones_email_idx  on public.invitaciones (email);
create index invitaciones_estado_idx on public.invitaciones (estado, created_at desc);

create trigger perfiles_set_updated_at
  before update on public.perfiles
  for each row execute function public.set_updated_at();

create trigger invitaciones_set_updated_at
  before update on public.invitaciones
  for each row execute function public.set_updated_at();

alter table public.perfiles     enable row level security;
alter table public.invitaciones enable row level security;

-- NOTA HISTÓRICA: estos helpers nacieron en `public` y la migración
-- 20260912003316 los movió a `private`, porque en `public` quedaban expuestos
-- como endpoints RPC (/rest/v1/rpc/es_admin). Se conservan aquí tal como se
-- aplicaron para que el historial sea reproducible; el estado final correcto
-- es el de aquella migración.
--
-- `security definer` es lo que evita la recursión infinita: una política sobre
-- `perfiles` que consultara `perfiles` bajo RLS se llamaría a sí misma. Al
-- ejecutarse como su propietario, la función salta RLS y corta el ciclo.
create or replace function public.es_admin()
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

create or replace function public.tiene_acceso_interno()
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

create policy "perfiles: ver el propio"
  on public.perfiles for select
  using ((select auth.uid()) = id);

create policy "perfiles: el admin ve todos"
  on public.perfiles for select
  using (public.es_admin());

create policy "perfiles: solo el admin escribe"
  on public.perfiles for all
  using (public.es_admin())
  with check (public.es_admin());

create policy "invitaciones: solo el admin"
  on public.invitaciones for all
  using (public.es_admin())
  with check (public.es_admin());

-- Primeras políticas sobre las tablas de leads, que hasta ahora no tenían
-- ninguna. Siguen sin política de INSERT a propósito: los formularios
-- públicos escriben con service_role desde app/actions/leads.ts.
create policy "contactos: el admin lee"
  on public.contactos for select
  using (public.es_admin());

create policy "contactos: el admin actualiza"
  on public.contactos for update
  using (public.es_admin())
  with check (public.es_admin());

create policy "cotizaciones: el admin lee"
  on public.cotizaciones for select
  using (public.es_admin());

create policy "cotizaciones: el admin actualiza"
  on public.cotizaciones for update
  using (public.es_admin())
  with check (public.es_admin());
