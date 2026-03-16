import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { useAuth } from "@/context/authentication";
import { useRef, useState } from "react";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);

  const { state, logout } = useAuth();
  const isLoggedIn = Boolean(state.user);
  const isAdmin = state.user?.role === "admin";

  return (
    <>
      <nav className="fixed top-0 z-50 flex flex-row w-full justify-between items-center bg-neutral-100 py-[12px] 2xl:py-[16px] px-[24px] 2xl:px-[120px] border-b border-neutral-300 caret-transparent">
        <MobileMenu
          open={isMobileMenuOpen}
          onToggle={() => setIsMobileMenuOpen(p => !p)}
          onClose={() => setIsMobileMenuOpen(false)}
          isLoggedIn={isLoggedIn}
          onLogout={logout}
        />

        <DesktopMenu
          open={isDesktopMenuOpen}
          onToggle={() => setIsDesktopMenuOpen(p => !p)}
          onClose={() => setIsDesktopMenuOpen(false)}
          isLoggedIn={isLoggedIn}
          isAdmin ={isAdmin }
          onLogout={logout}
        />
      </nav>


    </>
  );
}

export default Navbar;
