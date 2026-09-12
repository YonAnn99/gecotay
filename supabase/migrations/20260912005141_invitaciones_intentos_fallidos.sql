-- Aplicada al proyecto remoto el 2026-09-12 vía MCP.
--
-- El código tiene 32^8 ≈ 1.1 billones de combinaciones y caduca en 7 días, así
-- que la fuerza bruta por HTTP no es realista. Pero el canje se hace con
-- `service_role` (quien canjea todavía no tiene sesión) y es un endpoint
-- público: conviene que un atacante que ya conozca el correo de un colaborador
-- no pueda probar indefinidamente. A los 10 fallos la invitación se quema.
alter table public.invitaciones
  add column intentos_fallidos smallint not null default 0
    check (intentos_fallidos >= 0 and intentos_fallidos <= 100);

comment on column public.invitaciones.intentos_fallidos is
  'Canjes fallidos sobre esta invitación. A los 10 pasa a estado revocada.';
