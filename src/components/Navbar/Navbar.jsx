import { useState } from "react";
import logohh from "../../assets/icons/logo-hh.svg";
import HamburgerButton from "../common/HamburgerButton";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { Link } from "react-router-dom";


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = true;

  return (
    <>
      <nav className="fixed top-0 z-50 flex flex-row w-full justify-between items-center bg-neutral-100 py-[12px] 2xl:py-[16px] px-[24px] 2xl:px-[120px] border-b border-neutral-300 caret-transparent">
        <div className="w-full flex flex-row justify-between items-center">
          <Link to="/">
            <img
              src={logohh}
              alt="Logo hh"
              className="w-[24px] 2xl:w-[44px] h-[24px] 2xl:h-[44px] cursor-pointer"
            />
          </Link>

          <HamburgerButton onClick={() => setMenuOpen((prev) => !prev)} />

          <DesktopMenu isLoggedIn={isLoggedIn} />
        </div>
      </nav>

      {menuOpen && <MobileMenu isLoggedIn={isLoggedIn} onClose={() => setMenuOpen(false)} />}
    </>
  );
}

export default Navbar;
