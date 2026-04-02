import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import ProfileAvatar from "@/components/common/ProfileAvatar";
import { RotateCw, Bell, UserRound, LogOut, Home } from "lucide-react";
import logohh from "../../assets/icons/logo-hh.svg";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useClickOutside } from "@/utils/useClickOutside";
import { notifications } from "@/data/notifications";

import hamburger from "../../assets/icons/icon-hamburger.svg";
import NotificationCard from "./NotificationCard";


function MobileMenu({
  isLoggedIn,
  open,
  onToggle,
  onClose,
  onLogout,
  user,
  getUserLoading,
}) {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const notiRef = useRef(null);
  const [isOpenNoti, setIsOpenNoti] = useState(false);

  const displayName =
    user?.name?.trim() ||
    user?.username?.trim() ||
    (getUserLoading ? "…" : "User");
  const avatarImageUrl =
    user?.profile_pic && String(user.profile_pic).trim() !== ""
      ? user.profile_pic
      : null;

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    onLogout();
    handleNavigate("/login");
  };

  useClickOutside(menuRef, () => {
    if (!open) return;
    if (isOpenNoti) {
      setIsOpenNoti(false);
    } else {
      onClose();
    }
  });

  useClickOutside(notiRef, () => {
    if (isOpenNoti) setIsOpenNoti(false);
  });

  return (
    <div ref={menuRef} className="2xl:hidden w-full flex flex-row justify-between items-center">
      <div className="w-full  flex flex-row justify-between items-center">
        <Link to="/">
          <img
            src={logohh}
            alt="Logo hh"
            className="w-[24px] 2xl:w-[44px] h-[24px] 2xl:h-[44px] cursor-pointer"
          />
        </Link>

        <button className="2xl:hidden " onClick={onToggle}>
          <img
            src={hamburger}
            alt="hamburger button"
            className="w-[18px] h-[12px] hover:cursor-pointer"
          />
        </button>

      </div>
      {isLoggedIn && open ? (
        <div className=" fixed top-[49px] -mx-[24px] w-full bg-neutral-100 z-40 flex flex-col gap-[24px] p-[24px]  border-b border-neutral-300 2xl:hidden ">
          <div className="flex flex-row justify-between items-center ">

            <div className="flex flex-row items-center gap-[8px]">
              <ProfileAvatar
                imageUrl={avatarImageUrl}
                alt={`${displayName} profile picture`}
                size={48}
              />
              <span className="text-body-1 text-neutral-500">{displayName}</span>
            </div>
            <div ref={notiRef} className="relative flex justify-center items-center h-[48px] w-[48px] bg-white border border-neutral-200 rounded-full cursor-pointer">
              <div className="w-full h-full flex justify-center items-center" onClick={() => setIsOpenNoti((prev) => !prev)}>
                <Bell className="text-neutral-400 stroke-[1px]" />
                {!isOpenNoti && <div className="h-[8px] w-[8px] bg-brand-red absolute top-1 right-0 rounded-full"></div>}
              </div>
              {isOpenNoti && (
                <div className="absolute right-0 top-full mt-2 flex flex-col w-[343px] rounded-[12px] text-neutral-500 bg-neutral-100 border shadow-lg p-[16px] gap-[16px] z-50">
                  {notifications.map((notification) => (
                    <NotificationCard key={notification.id} notification={notification} />
                  ))}
                </div>
              )}
            </div>
          </div>


          <div className="flex flex-col">
            <button onClick={() => handleNavigate("/")} className="flex flex-row py-[12px] px-[16px] gap-[12px] hover:bg-neutral-200 cursor-pointer hover:-mx-[24px] hover:px-[40px]">
              <Home className="h-[24px] w-[24px] text-neutral-400" strokeWidth={1} />
              <span>Home</span>
            </button>

            <button onClick={() => handleNavigate("/login/profile")} className="flex flex-row py-[12px] px-[16px] gap-[12px] hover:bg-neutral-200 cursor-pointer hover:-mx-[24px] hover:px-[40px]">
              <UserRound className="h-[24px] w-[24px] text-neutral-400 " strokeWidth={1} />
              <span>Profile</span>
            </button>

            <button onClick={() => handleNavigate("/login/reset-password")} className="flex flex-row py-[12px] px-[16px] gap-[12px] hover:bg-neutral-200 cursor-pointer hover:-mx-[24px] hover:px-[40px]">
              <RotateCw className="h-[24px] w-[24px] text-neutral-400 " strokeWidth={1} />
              <span>Reset password</span>
            </button>

            <div className="w-full h-px bg-neutral-300"></div>
          </div>
          {!isOpenNoti && <div>
            <button onClick={handleLogout} className="flex flex-row py-[12px] px-[16px] gap-[12px] hover:bg-neutral-200 cursor-pointer hover:-mx-[24px] hover:px-[40px]">
              <LogOut className="h-[24px] w-[24px] text-neutral-400 " strokeWidth={1} />
              <span>Log out</span>
            </button>
          </div>}
        </div>
      ) : open && (
        <div className="fixed top-[49px] w-full bg-neutral-100 z-40 flex flex-col gap-[24px] px-[24px] py-[40px] -mx-[24px] border-b border-neutral-300 2xl:hidden">
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
      )
      }

    </div >);
}

export default MobileMenu;
