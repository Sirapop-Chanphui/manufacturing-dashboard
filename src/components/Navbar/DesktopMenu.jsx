import Button from "../common/Button";

function DesktopMenu() {
  return (
    <div className="hidden 2xl:flex flex-row gap-[8px]">
      <Button buttonText="Log in" buttonStyle="secondary" />
      <Button buttonText="Sign up" buttonStyle="primary" />
    </div>
  );
}

export default DesktopMenu;