-- Aplicada al proyecto remoto el 2026-09-12 vía MCP.
--
-- Bucket para las imágenes que el admin suba desde el panel.
--
-- `public = true` significa que los objetos se sirven por URL sin firmar, que
-- es lo que necesita next/image en el sitio público. La ESCRITURA sigue
-- cerrada: las políticas de abajo solo dejan a un admin subir, cambiar o
-- borrar. "Público" aquí es solo lectura.
--
-- Las 489 imágenes que ya existen se quedan en public/images: no se migran.
-- `app/lib/imagenes.ts` distingue ruta local de URL de Storage, para no mover
-- 27 MB ni reescribir las referencias actuales.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'contenido',
  'contenido',
  true,
  10485760,  -- 10 MB por archivo
  array['image/webp', 'image/jpeg', 'image/png', 'image/avif', 'image/svg+xml']
)
on conflict (id) do nothing;

create policy "contenido: lectura pública"
  on storage.objects for select
  using (bucket_id = 'contenido');

create policy "contenido: sube el admin"
  on storage.objects for insert
  with check (bucket_id = 'contenido' and private.es_admin());

create policy "contenido: actualiza el admin"
  on storage.objects for update
  using (bucket_id = 'contenido' and private.es_admin())
  with check (bucket_id = 'contenido' and private.es_admin());

create policy "contenido: borra el admin"
  on storage.objects for delete
  using (bucket_id = 'contenido' and private.es_admin());
