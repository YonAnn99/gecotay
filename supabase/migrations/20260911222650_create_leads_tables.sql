-- Aplicada al proyecto remoto (ffhyxkawjcegvbgbfqke) el 2026-09-11 vía MCP.
-- Copia versionada para que el esquema viva en el repo y no solo en el dashboard.
--
-- Lead capture for the two public forms on gecotay.com.
--
-- Modelo de seguridad: RLS activa y SIN políticas en ambas tablas. La clave
-- anon/publishable que va en el navegador no puede leer ni escribir una sola
-- fila. Todas las escrituras pasan por una Server Action de Next con la clave
-- service_role (solo servidor), que salta RLS. Las lecturas del futuro panel
-- de admin también serán server-side.
--
-- Nunca agregar una política permisiva de "cualquiera puede insertar": estas
-- filas contienen nombres, correos y teléfonos de clientes.

create type public.lead_estado as enum ('nuevo', 'contactado', 'cotizado', 'ganado', 'perdido');

create table public.contactos (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  nombre        text not null check (length(trim(nombre)) between 1 and 120),
  email         text          check (email is null or length(email) <= 200),
  telefono      text          check (telefono is null or length(telefono) <= 40),
  empresa       text          check (empresa is null or length(empresa) <= 160),
  asunto        text          check (asunto is null or length(asunto) <= 160),
  mensaje       text not null check (length(trim(mensaje)) between 1 and 5000),

  locale        text not null default 'es' check (locale in ('es', 'en')),
  origen        text          check (origen is null or length(origen) <= 500),

  ip_hash       text          check (ip_hash is null or length(ip_hash) <= 64),
  user_agent    text          check (user_agent is null or length(user_agent) <= 400),

  estado        public.lead_estado not null default 'nuevo',
  notas         text
);

create table public.cotizaciones (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),

  nombre         text not null check (length(trim(nombre)) between 1 and 120),
  email          text not null check (length(email) between 3 and 200),
  telefono       text          check (telefono is null or length(telefono) <= 40),
  empresa        text          check (empresa is null or length(empresa) <= 160),
  cargo          text          check (cargo is null or length(cargo) <= 120),

  tipo_proyecto  text          check (tipo_proyecto is null or length(tipo_proyecto) <= 60),
  descripcion    text not null check (length(trim(descripcion)) between 1 and 5000),
  ubicacion      text          check (ubicacion is null or length(ubicacion) <= 200),

  superficie     text          check (superficie is null or length(superficie) <= 40),
  plazo          text          check (plazo is null or length(plazo) <= 60),
  presupuesto    text          check (presupuesto is null or length(presupuesto) <= 60),
  servicios      text[]        not null default '{}' check (cardinality(servicios) <= 30),
  observaciones  text          check (observaciones is null or length(observaciones) <= 5000),

  locale         text not null default 'es' check (locale in ('es', 'en')),
  origen         text          check (origen is null or length(origen) <= 500),
  ip_hash        text          check (ip_hash is null or length(ip_hash) <= 64),
  user_agent     text          check (user_agent is null or length(user_agent) <= 400),

  estado         public.lead_estado not null default 'nuevo',
  notas          text
);

create index contactos_created_at_idx    on public.contactos    (created_at desc);
create index contactos_estado_idx        on public.contactos    (estado);
create index cotizaciones_created_at_idx on public.cotizaciones (created_at desc);
create index cotizaciones_estado_idx     on public.cotizaciones (estado);

create index contactos_ip_hash_created_idx    on public.contactos    (ip_hash, created_at desc);
create index cotizaciones_ip_hash_created_idx on public.cotizaciones (ip_hash, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger contactos_set_updated_at
  before update on public.contactos
  for each row execute function public.set_updated_at();

create trigger cotizaciones_set_updated_at
  before update on public.cotizaciones
  for each row execute function public.set_updated_at();

alter table public.contactos    enable row level security;
alter table public.cotizaciones enable row level security;
