import NavBrand from "./NavBrand";
import NavMenu from "./NavMenu";

// Two independent floating "islands": the brand pill on the left and the
// menu toggle + dropdown pill on the right — each is self-positioned
// (fixed) so no shared wrapper/bar is needed between them.
export default function Navbar() {
  return (
    <header>
      <NavBrand />
      <NavMenu />
    </header>
  );
}