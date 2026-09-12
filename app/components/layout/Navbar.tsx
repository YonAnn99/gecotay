import NavBrand from "./NavBrand";
import NavMenu from "./NavMenu";
import NavSearch from "./NavSearch";
import { obtenerProductos, obtenerServicios } from "@/app/lib/contenido";

interface NavbarProps {
  locale: string;
}

// Two independent floating "islands": the brand pill on the left and the
// menu toggle + dropdown pill on the right — each is self-positioned
// (fixed) so no shared wrapper/bar is needed between them.
// Server Component: carga el catálogo para el buscador. Usa el cliente sin
// cookies, así que el layout sigue siendo estático pese a consultar la base.
export default async function Navbar({ locale }: NavbarProps) {
  const [lineas, servicios] = await Promise.all([obtenerProductos(), obtenerServicios()]);

  return (
    <header>
      <NavBrand locale={locale} />
      <NavSearch locale={locale} lineas={lineas} servicios={servicios} />
      <NavMenu locale={locale} />
    </header>
  );
}