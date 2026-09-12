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
      {/* Las islas del nav son `fixed`, así que no ocupan espacio. Este hueco
          repone el que tenía la barra (16px de `top` + 42px de isla + aire),
          para que el contenido arranque donde siempre. Va aquí y no en cada
          pantalla: son once y todas traen su propio `py-*`. */}
      <div className="pt-[74px]">{children}</div>
    </>
  );
}
