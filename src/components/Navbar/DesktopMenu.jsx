import { useRef, useState } from "react";
import { Bell, ChevronDown, UserRound, LogOut, RotateCw, ExternalLink, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import ProfileAvatar from "@/components/common/ProfileAvatar";
import { useClickOutside } from "@/utils/useClickOutside";
import { Link } from "react-router-dom";
import logohh from "../../assets/icons/logo-hh.svg";
import NotificationCard from "./NotificationCard";
import { notifications } from "@/data/notifications";

function DesktopMenu({
  isLoggedIn,
  open,
  onToggle,
  onClose,
  onLogout,
  isAdmin,
  user,
  getUserLoading,
}) {
  const navigate = useNavigate();
  const ref = useRef(null);
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
    handleNavigate("/login")
  };

  useClickOutside(ref, () => {
    if (open) onClose();
  });

  useClickOutside(notiRef, () => {
    if (isOpenNoti) setIsOpenNoti(false);
  });

  return (<div className="hidden 2xl:flex w-full flex-row justify-between items-center">

    <Link to="/">
      <img
        src={logohh}
        alt="Logo hh"
        className="w-[24px] 2xl:w-[44px] h-[24px] 2xl:h-[44px] cursor-pointer"
      />
    </Link>

    {isLoggedIn ? (
      <div className="hidden 2xl:flex items-center gap-[16px]">
        {/* Notification */}
        <div ref={notiRef} className="relative flex justify-center items-center">
              <div
                className="flex justify-center items-center h-[48px] w-[48px] bg-white border border-neutral-200 rounded-full cursor-pointer"
                onClick={() => { setIsOpenNoti((prev) => !prev); onClose(); }}
              >
                <Bell className="text-neutral-400 stroke-[1px]"  />
                {!isOpenNoti && <div className="h-[8px] w-[8px] bg-brand-red absolute top-1 right-0 rounded-full"></div>}
                {isOpenNoti && (
                  <div className="absolute right-0 top-full mt-2 flex flex-col w-[343px] rounded-[12px] text-neutral-500 bg-neutral-100 border shadow-lg p-[16px] gap-[16px] z-50">
                    {notifications.map((notification) => (
                      <NotificationCard key={notification.id} notification={notification} />
                    ))}
                  </div>
                )}
              </div>
        </div>

        {/* Profile dropdown */}
        <div ref={ref} className="relative">
          <button
            onClick={() => { setIsOpenNoti(false); onToggle(); }}
            className="flex items-center gap-[8px] focus:outline-none hover:cursor-pointer"
          >
            <ProfileAvatar
              imageUrl={avatarImageUrl}
              alt={`${displayName} profile picture`}
              size={48}
            />
            <span className="text-body-1 text-neutral-500">{displayName}</span>
            <ChevronDown
              className={`w-[16px] h-[16px] text-neutral-400 transition-transform ${open ? "rotate-180" : ""
                }`}
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-[200px] rounded-[12px] text-neutral-500 bg-neutral-100 border shadow-lg py-2 z-50">
              <button
                onClick={() => { handleNavigate("/") }}
                className="flex w-full items-center gap-3 px-4 py-2 transition-all duration-200 ease-out hover:translate-x-1 cursor-pointer"
              >
                <Home className="w-4 h-4 text-neutral-400" />
                <span>Home</span>
              </button>

              <button
                onClick={() => { handleNavigate("/login/profile") }}
                className="flex w-full items-center gap-3 px-4 py-2 transition-all duration-200 ease-out hover:translate-x-1 cursor-pointer"
              >
                <UserRound className="w-4 h-4 text-neutral-400" />
                <span>Profile</span>
              </button>

              <button
                onClick={() => { handleNavigate("/login/reset-password") }}
                className="flex w-full items-center gap-3 px-4 py-2 transition-all duration-200 ease-out hover:translate-x-1 cursor-pointer"
              >
                <RotateCw className="w-4 h-4 text-neutral-400" />
                <span>Reset password</span>
              </button>

              {isAdmin && (
                <button
                  onClick={() => { handleNavigate("/login/admin/article-management") }}
                  className="flex w-full items-center gap-3 px-4 py-2 transition-all duration-200 ease-out hover:translate-x-1 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 text-neutral-400" />
                  <span>Admin</span>
                </button>
              )}

              <div className="my-2 h-px bg-neutral-200" />

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-2  transition-all duration-200 ease-out hover:translate-x-1 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    )
      : (
        <div className="hidden 2xl:flex flex-row gap-[8px]">
          <Button buttonText="Log in" buttonStyle="secondary" onClick={() => navigate("/login")} />
          <Button buttonText="Sign up" buttonStyle="primary" onClick={() => navigate("/signup")} />
        </div>)}

  </div>);
}

export default DesktopMenu;