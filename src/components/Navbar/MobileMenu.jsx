import Button from "../common/Button";

function MobileMenu() {
  return (
    <div className="fixed top-[49px] w-full mx-auto bg-neutral-100 z-40 flex flex-col gap-[24px] px-[24px] py-[40px] border-b border-neutral-300 2xl:hidden">
      <Button buttonText="Log in" buttonStyle="secondary" />
      <Button buttonText="Sign up" buttonStyle="primary" />
    </div>
  );
}

export default MobileMenu;