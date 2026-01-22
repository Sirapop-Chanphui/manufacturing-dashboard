import hamburger from "../../assets/icons/icon-hamburger.svg";

function HamburgerButton({ onClick }) {
  return (
    <button className="2xl:hidden " onClick={onClick}>
      <img
        src={hamburger}
        alt="hamburger button"
        className="w-[18px] h-[12px] hover:cursor-pointer"
      />
    </button>
  );
}

export default HamburgerButton;