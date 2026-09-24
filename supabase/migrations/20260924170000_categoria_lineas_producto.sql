-- Categoría de cada línea de producto.
--
-- Hasta ahora el filtro de /productos agrupaba por una lista de slugs escrita
-- a mano en ProductosPage.tsx, así que un producto creado desde el panel no
-- caía en ninguna categoría. Pasa a ser un dato de la fila, que el admin elige.
--
-- Los valores tienen que coincidir con `CATEGORIAS_PRODUCTO` en
-- app/data/categorias.ts. Añadir una categoría = `alter type ... add value`
-- aquí + una entrada allí.

create type public.categoria_producto as enum (
  'silleria',
  'escritorios',
  'espacios',
  'almacenamiento',
  'hogar'
);

alter table public.lineas_producto
  add column categoria public.categoria_producto;

-- Traslado exacto de la agrupación que había en el código.
update public.lineas_producto set categoria = case
  when slug in ('ceri', 'silver', 'crome-b', 'crome-z', 'alf', 'silleria') then 'silleria'
  when slug in ('desk-tech', 'nova', 'deskan', 'gecotay', 'gecot') then 'escritorios'
  when slug in ('sim', 'workspace', 'salas-juntas', 'recepciones') then 'espacios'
  when slug in ('almacenamiento', 'accesorios') then 'almacenamiento'
  else 'hogar'
end::public.categoria_producto;

-- Obligatoria desde ya: una línea sin categoría no aparecería en ningún filtro,
-- que es justo el fallo que esto corrige. Sin default a propósito: el panel
-- obliga a elegirla en vez de colar todo en «Hogar y otros».
alter table public.lineas_producto
  alter column categoria set not null;
