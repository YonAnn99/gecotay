import { requerirPerfil, baseDeSuperficie } from "@/app/lib/auth";
import NavVentas from "./NavVentas";

// Ventas admite ambos roles: un admin puede consultar el catálogo sin tener
// que cambiar de cuenta.
export default async function VentasProtegidoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const perfil = await requerirPerfil(["admin", "ventas"]);
  const base = await baseDeSuperficie();

  return (
    <>
      <NavVentas base={base} email={perfil.email} />
      {children}
    </>
  );
}
