import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

function DesktopMenu() {
  const navigate = useNavigate();
  return (
    <div className="hidden 2xl:flex flex-row gap-[8px]">
      <Button buttonText="Log in" buttonStyle="secondary" onClick={() => navigate("/login")} />
      <Button buttonText="Sign up" buttonStyle="primary" onClick={() => navigate("/signup")} />
    </div>
  );
}

export default DesktopMenu;