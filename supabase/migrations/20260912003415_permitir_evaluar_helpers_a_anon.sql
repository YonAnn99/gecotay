-- Aplicada al proyecto remoto el 2026-09-12 vía MCP.
--
-- `anon` no tenía EXECUTE sobre los helpers, así que cualquier consulta suya
-- a una tabla con RLS moría con "permission denied for function es_admin"
-- (42501) en lugar de evaluar la política y devolver [].
--
-- Hoy da igual, porque ninguna de estas tablas es de lectura pública. Pero en
-- la Fase 2 las tablas de contenido llevarán políticas del tipo
-- `publicado = true OR private.es_admin()`: sin este permiso, el sitio público
-- recibiría un error en vez del catálogo.
--
-- Conceder EXECUTE no reabre nada: las funciones viven en el esquema `private`,
-- que PostgREST no publica (verificado: /rest/v1/rpc/es_admin responde 404), y
-- solo devuelven un booleano sobre el propio llamante — para `anon`, siempre
-- false, porque auth.uid() es null.
grant usage on schema private to anon;
grant execute on function private.es_admin() to anon;
grant execute on function private.tiene_acceso_interno() to anon;
