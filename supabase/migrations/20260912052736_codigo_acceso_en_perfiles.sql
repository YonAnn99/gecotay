-- Aplicada al proyecto remoto el 2026-09-12 vía MCP.
--
-- El código de acceso pasa a ser la credencial permanente del colaborador.
--
-- Antes había un flujo de invitación: el código servía una vez, caducaba, y al
-- canjearlo el colaborador elegía su propia contraseña. Decisión del dueño del
-- negocio: eliminar ese paso. El código que recibe por correo ES su contraseña,
-- no caduca, y el admin puede consultarlo cuando alguien lo olvide.
--
-- Es un compromiso consciente: una credencial legible desde el panel es una
-- credencial recuperable. Lo que lo hace aceptable es el alcance — el módulo de
-- ventas es SOLO LECTURA de catálogo ya publicado. No expone leads, ni datos de
-- clientes, ni permite escribir. Un código filtrado da acceso a información que
-- cualquiera puede ver en el sitio público. Se mitiga con `activo = false`
-- (corta el acceso al instante) y con la regeneración de códigos.
--
-- El admin NO usa este modelo: entra con contraseña propia, porque el panel sí
-- tiene poder real sobre leads y catálogo.

alter table public.perfiles
  add column codigo_acceso text unique check (codigo_acceso is null or codigo_acceso ~ '^[A-Z0-9]{10}$'),
  add column codigo_actualizado_en timestamptz,
  add column creado_por uuid references public.perfiles (id) on delete set null;

comment on column public.perfiles.codigo_acceso is
  'Credencial de acceso al módulo de ventas. Es la MISMA cadena que la contraseña en auth.users: al regenerarla hay que actualizar ambas. Null para los admin, que usan contraseña propia.';

drop table public.invitaciones;
drop type public.estado_invitacion;
