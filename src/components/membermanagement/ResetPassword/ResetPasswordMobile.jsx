import { UserRound, RotateCw } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import man from "@/assets/img/men-and-cat.jpg";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { useAuth } from "@/context/authentication";

const defaultAvatar = man;

function ResetPasswordMobile({ values, onChange, onSubmit }) {
  const { user, state } = useAuth();
  const location = useLocation();
  const isProfileActive = location.pathname === "/login/profile";
  const isResetActive = location.pathname === "/login/reset-password";

  const avatarSrc =
    user?.profile_pic && String(user.profile_pic).trim() !== ""
      ? user.profile_pic
      : defaultAvatar;
  const displayName =
    user?.name?.trim() ||
    user?.username?.trim() ||
    (state.getUserLoading ? "…" : "User");

  return (
    <div className="2xl:hidden flex flex-col pt-[48px]  bg-neutral-100 justify-center">
      <div>
        <nav className="flex flex-row" aria-label="Account section">
          <Link
            to="/login/profile"
            className="flex flex-row px-[16px] py-[12px] gap-[12px] items-center no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 rounded-[4px]"
          >
            <UserRound
              className={`h-[24px] w-[24px] stroke-[1px] ${isProfileActive ? "text-neutral-400" : "text-neutral-300"}`}
            />
            <span
              className={`text-body-1 ${isProfileActive ? "text-neutral-500" : "text-neutral-400"}`}
            >
              Profile
            </span>
          </Link>
          <Link
            to="/login/reset-password"
            className="flex flex-row px-[16px] py-[12px] gap-[12px] items-center no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 rounded-[4px]"
          >
            <RotateCw
              className={`h-[24px] w-[24px] stroke-[1px] ${isResetActive ? "text-neutral-400" : "text-neutral-300"}`}
            />
            <span
              className={`text-body-1 ${isResetActive ? "text-neutral-500" : "text-neutral-400"}`}
            >
              Reset password
            </span>
          </Link>
        </nav>

        <div className="flex flex-row items-center px-[16px] py-[24px] gap-[12px]">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <img
              src={avatarSrc}
              alt={`${displayName} profile picture`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-row items-center gap-[16px]">
            <span className="text-headline-4 text-neutral-400">{displayName}</span>
            <div className="flex h-[28px] w-px bg-neutral-300 "></div>
            <span className="text-headline-4 text-neutral-600">Reset password</span>
          </div>

        </div>
      </div>

      <div className="flex flex-col bg-neutral-200 pt-[24px] pr-[16px] pb-[40px] pl-[16px] gap-[24px]">


        {/* Form */}
        <form onSubmit={onSubmit} className="flex flex-col gap-[24px]">
        <InputField
            label="Current password"
            name="currentPassword"
            type="password"
            placeholder="Current password"
            value={values.currentPassword}
            onChange={ onChange}
          />

          <InputField
            label="New password"
            name="newPassword"
            type="password"
            placeholder="New password"
            value={values.newPassword}
            onChange={ onChange}
          />

          <InputField
            label="Confirm new password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            value={values.confirmPassword}
            onChange={ onChange}
          />

          <Button
            type="submit"
            buttonText="Reset password"
            buttonStyle="primary"
            className="w-fit"
          />
        </form>
      </div>
    </div>
  );
}
export default ResetPasswordMobile
