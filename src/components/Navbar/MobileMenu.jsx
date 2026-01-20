import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import man from "../../assets/img/men-and-cat.jpg"
import { Bell } from 'lucide-react';
import { UserRound } from 'lucide-react';
import { RotateCw } from 'lucide-react';
import { LogOut } from 'lucide-react';

function MobileMenu({ onClose, isLoggedIn }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="fixed top-[49px] w-full bg-neutral-100 z-40 flex flex-col gap-[24px] p-[24px]  border-b border-neutral-300 2xl:hidden">
          <div className="flex flex-row justify-between items-center ">

            <div className="flex flex-row items-center gap-[8px]">
              <img
                src={man}
                className="w-[48px] h-[48px] rounded-full object-cover"
                alt="profile image"
              />
              <span className="text-body-1 text-neutral-500">Moodang</span>
            </div>
            <div className="relative flex justify-center items-center h-[48px] w-[48px] bg-white border border-neutral-200 rounded-full cursor-pointer">
              <Bell className="text-neutral-400 stroke-[1px]" />
              <div className="h-[8px] w-[8px] bg-brand-red absolute top-1 right-0 rounded-full"></div>
            </div>
          </div>


          <div className="flex flex-col">
            <button onClick={() => handleNavigate("/profile")} className="flex flex-row py-[12px] px-[16px] gap-[12px] hover:bg-neutral-200 cursor-pointer hover:-mx-[24px] hover:px-[40px]">
              <UserRound className="h-[24px] w-[24px] text-neutral-400 stroke-[1px]" />
              <span>Profile</span>

            </button>

            <button onClick={() => handleNavigate("/reset-password")} className="flex flex-row py-[12px] px-[16px] gap-[12px] hover:bg-neutral-200 cursor-pointer hover:-mx-[24px] hover:px-[40px]">
              <RotateCw className="h-[24px] w-[24px] text-neutral-400 stroke-[1px]" />
              <span>Reset password</span>
            </button>

            <div className="w-full h-px bg-neutral-300"></div>
          </div>


          <button onClick={() => handleNavigate("/")} className="flex flex-row py-[12px] px-[16px] gap-[12px] hover:bg-neutral-200 cursor-pointer hover:-mx-[24px] hover:px-[40px]">
            <LogOut className="h-[24px] w-[24px] text-neutral-400 stroke-[1px]" />
            <span>Log out</span>
          </button>

        </div>
      ) : (
        <div className="fixed top-[49px] w-full bg-neutral-100 z-40 flex flex-col gap-[24px] px-[24px] py-[40px] border-b border-neutral-300 2xl:hidden">
          <Button
            buttonText="Log in"
            buttonStyle="secondary"
            onClick={() => handleNavigate("/login")}
          />
          <Button
            buttonText="Sign up"
            buttonStyle="primary"
            onClick={() => handleNavigate("/signup")}
          />
        </div>
      )}

    </>);
}

export default MobileMenu;
