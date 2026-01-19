import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

function MobileMenu({onClose}) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    onClose(); 
  };
  return (
    <div className="fixed top-[49px] w-full mx-auto bg-neutral-100 z-40 flex flex-col gap-[24px] px-[24px] py-[40px] border-b border-neutral-300 2xl:hidden">
      <Button buttonText="Log in" buttonStyle="secondary" onClick={() => handleNavigate("/login")} />
      <Button buttonText="Sign up" buttonStyle="primary" onClick={() => handleNavigate("/signup")} />
    </div>
  );
}

export default MobileMenu;