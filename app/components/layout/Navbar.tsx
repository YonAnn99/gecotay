import NavBrand from "./NavBrand";
import NavMenu from "./NavMenu";

interface NavbarProps {
  locale: string;
}

// Two independent floating "islands": the brand pill on the left and the
// menu toggle + dropdown pill on the right — each is self-positioned
// (fixed) so no shared wrapper/bar is needed between them.
export default function Navbar({ locale }: NavbarProps) {
  return (
    <header>
      <NavBrand locale={locale} />
      <NavMenu locale={locale} />
    </header>
  );
}