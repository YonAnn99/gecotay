import { requerirPerfil, baseDeSuperficie } from "@/app/lib/auth";
import NavAdmin from "./NavAdmin";

// Grupo de rutas protegido. El paréntesis en `(protegido)` hace que el
// segmento no aparezca en la URL: el panel sigue viviendo en `/admin`.
//
// El guard va aquí y NO en el root layout a propósito: `/admin/login` debe
// quedar fuera, o el redirect del guard apuntaría a una página que a su vez
// exige sesión y el navegador entraría en un bucle.
export default async function AdminProtegidoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const perfil = await requerirPerfil(["admin"]);
  const base = await baseDeSuperficie();

  return (
    <>
      <NavAdmin base={base} email={perfil.email} />
      {children}
    </>
  );
}
