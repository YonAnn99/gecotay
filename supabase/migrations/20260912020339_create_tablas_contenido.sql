-- Aplicada al proyecto remoto el 2026-09-12 vía MCP.
--
-- Contenido editable desde el panel: catálogo de productos, servicios y
-- promociones. Reproduce las formas que hoy viven hardcodeadas en
-- app/data/empresa.ts (LINEAS_PRODUCTO, SERVICIOS), que scripts/seed-contenido.mjs
-- importa sin perder nada.
--
-- Modelo de acceso, distinto al de las tablas internas: aquí SÍ hay lectura
-- pública, porque el sitio público y el módulo de ventas consumen el catálogo.
-- La política es `publicado = true OR private.es_admin()`: un visitante ve solo
-- lo publicado, el admin ve también los borradores. La escritura es solo admin.
--
-- (Esto es justo lo que exigía conceder EXECUTE sobre private.es_admin() a
-- `anon` en la migración 20260912003415: sin ese permiso, una consulta anónima
-- moriría con 42501 en vez de devolver el catálogo.)

create table public.lineas_producto (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  slug          text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  nombre        text not null check (length(trim(nombre)) between 1 and 160),
  descripcion   text not null check (length(trim(descripcion)) between 1 and 4000),
  imagen        text          check (imagen is null or length(imagen) <= 500),
  precio_desde  integer       check (precio_desde is null or precio_desde >= 0),
  es_nuevo      boolean not null default false,

  orden         integer not null default 0,
  publicado     boolean not null default true
);

-- La galería va aparte para poder reordenar o borrar una foto sin reescribir
-- el registro entero del producto.
create table public.linea_imagenes (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  linea_id   uuid not null references public.lineas_producto (id) on delete cascade,
  url        text not null check (length(url) between 1 and 500),
  alt        text          check (alt is null or length(alt) <= 300),
  orden      integer not null default 0
);

create table public.servicios (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),

  slug         text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  titulo       text not null check (length(trim(titulo)) between 1 and 200),
  descripcion  text not null check (length(trim(descripcion)) between 1 and 4000),
  imagen       text          check (imagen is null or length(imagen) <= 500),

  orden        integer not null default 0,
  publicado    boolean not null default true
);

create type public.tipo_promocion as enum ('descuento', 'paquete', 'liquidacion');

create table public.promociones (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),

  titulo       text not null check (length(trim(titulo)) between 1 and 200),
  descripcion  text          check (descripcion is null or length(descripcion) <= 4000),
  imagen       text          check (imagen is null or length(imagen) <= 500),

  tipo         public.tipo_promocion not null default 'descuento',
  -- Texto libre a propósito: un descuento puede ser "20%", "2x1" o
  -- "$5,000 menos". Forzar un número obligaría a inventar reglas de formato.
  valor        text          check (valor is null or length(valor) <= 80),

  inicia_en    timestamptz not null default now(),
  termina_en   timestamptz,
  activa       boolean not null default true,

  -- Una promoción no puede terminar antes de empezar.
  constraint vigencia_coherente check (termina_en is null or termina_en > inicia_en)
);

create table public.promocion_lineas (
  promocion_id uuid not null references public.promociones (id) on delete cascade,
  linea_id     uuid not null references public.lineas_producto (id) on delete cascade,
  primary key (promocion_id, linea_id)
);

-- Registro de lo subido a Storage, para poder listarlo y borrarlo desde el
-- panel sin depender de recorrer el bucket.
create table public.media (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),

  bucket      text not null default 'contenido' check (length(bucket) <= 60),
  path        text not null check (length(path) between 1 and 500),
  url         text not null check (length(url) between 1 and 500),
  mime        text          check (mime is null or length(mime) <= 100),
  bytes       bigint        check (bytes is null or bytes >= 0),
  alt         text          check (alt is null or length(alt) <= 300),
  subida_por  uuid references public.perfiles (id) on delete set null,

  unique (bucket, path)
);

create index lineas_producto_orden_idx on public.lineas_producto (orden, nombre) where publicado;
create index linea_imagenes_linea_idx   on public.linea_imagenes  (linea_id, orden);
create index servicios_orden_idx        on public.servicios       (orden, titulo) where publicado;
create index promociones_vigencia_idx   on public.promociones     (activa, inicia_en, termina_en);
create index media_created_idx          on public.media           (created_at desc);

create trigger lineas_producto_set_updated_at
  before update on public.lineas_producto
  for each row execute function public.set_updated_at();

create trigger servicios_set_updated_at
  before update on public.servicios
  for each row execute function public.set_updated_at();

create trigger promociones_set_updated_at
  before update on public.promociones
  for each row execute function public.set_updated_at();

alter table public.lineas_producto  enable row level security;
alter table public.linea_imagenes   enable row level security;
alter table public.servicios        enable row level security;
alter table public.promociones      enable row level security;
alter table public.promocion_lineas enable row level security;
alter table public.media            enable row level security;

-- Lectura pública de lo publicado; el admin ve también los borradores.
create policy "lineas: lectura de lo publicado"
  on public.lineas_producto for select
  using (publicado or private.es_admin());

create policy "servicios: lectura de lo publicado"
  on public.servicios for select
  using (publicado or private.es_admin());

-- Las imágenes siguen la visibilidad de su producto.
create policy "imagenes: siguen a su producto"
  on public.linea_imagenes for select
  using (exists (
    select 1 from public.lineas_producto l
     where l.id = linea_id and (l.publicado or private.es_admin())
  ));

-- Una promoción es visible si está activa y dentro de su vigencia.
create policy "promociones: lectura de las vigentes"
  on public.promociones for select
  using (
    (activa and inicia_en <= now() and (termina_en is null or termina_en > now()))
    or private.es_admin()
  );

create policy "promocion_lineas: siguen a su promoción"
  on public.promocion_lineas for select
  using (exists (
    select 1 from public.promociones p
     where p.id = promocion_id
       and ((p.activa and p.inicia_en <= now() and (p.termina_en is null or p.termina_en > now()))
            or private.es_admin())
  ));

-- `media` es inventario interno: no se expone públicamente.
create policy "media: solo el admin"
  on public.media for all
  using (private.es_admin())
  with check (private.es_admin());

-- Escritura: solo admin, en todas las tablas de contenido.
create policy "lineas: escribe el admin"
  on public.lineas_producto for all
  using (private.es_admin()) with check (private.es_admin());

create policy "imagenes: escribe el admin"
  on public.linea_imagenes for all
  using (private.es_admin()) with check (private.es_admin());

create policy "servicios: escribe el admin"
  on public.servicios for all
  using (private.es_admin()) with check (private.es_admin());

create policy "promociones: escribe el admin"
  on public.promociones for all
  using (private.es_admin()) with check (private.es_admin());

create policy "promocion_lineas: escribe el admin"
  on public.promocion_lineas for all
  using (private.es_admin()) with check (private.es_admin());
