import logohh from "../assets/icons/logo-hh.svg";
import hamburger from "../assets/icons/icon-hamburger.svg";
import Button from "../components/common/Button";


export function NavBar() {
  return (
    <nav className="flex flex-row w-full  justify-between items-center bg-brown-100 py-[12px] md:py-[16px] px-[24px] md:px-[120px] border-b border-brown-300">
      <div className="w-full max-w-[375px] md:max-w-[1440px] mx-auto flex flex-row justify-between items-center">
        <img
          src={logohh}
          alt="Logo hh"
          className="w-[24px] md:w-[44px] h-[24px] md:h-[44px]"
        />
        <img
          src={hamburger}
          alt="Logo hh"
          className="w-[18px] h-[12px] md:hidden"
        />
        <div className="hidden md:flex flex-row gap-[8px]">
          <Button buttonText="Log in" buttonStyle="secondary" />
          <Button buttonText="Sign up" buttonStyle="primary" />
        </div>
      </div>
    </nav>
  );
}
