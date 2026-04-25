import { UserRound, RotateCw } from "lucide-react";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import ProfileAvatar from "@/components/common/ProfileAvatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authentication";

function ResetPasswordDesktop({ values, onChange, onSubmit, errors, isSubmitting }) {
    const navigate = useNavigate();
    const { user, state } = useAuth();

    const avatarImageUrl =
        user?.profile_pic && String(user.profile_pic).trim() !== ""
            ? user.profile_pic
            : null;
    const displayName =
        user?.name?.trim() ||
        user?.username?.trim() ||
        (state.getUserLoading ? "…" : "User");

    return (
        <div className="hidden 2xl:flex flex-col w-full h-screen pt-[132px]  bg-neutral-100  items-center">
            <div>

                {/*Tag show your profile */}
                <div className="flex flex-row items-center px-[16px] py-[24px] gap-[12px]">
                    <ProfileAvatar
                        imageUrl={avatarImageUrl}
                        alt={`${displayName} profile picture`}
                        size={40}
                    />

                    <div className="flex flex-row items-center gap-[16px]">
                        <span className="w-fit text-headline-4 text-neutral-400">{displayName}</span>
                        <div className="flex h-[28px] w-px bg-neutral-300 "></div>
                        <span className="w-fit text-headline-4 text-neutral-600">Reset password</span>
                    </div>

                </div>

                <div className="2xl:flex 2xl:flex-row 2xl:gap-[48px]">
                    {/*navigate to profile, reset password */}
                    <div className="hidden 2xl:flex flex-col w-[196px] rounded-[12px] text-neutral-500 py-2 ">
                        <button
                            onClick={() => { navigate("/login/profile") }}
                            className="flex w-full items-center gap-3 px-4 py-2 transition-all duration-200 ease-out hover:translate-x-1 cursor-pointer"
                        >
                            <UserRound className="w-4 h-4 text-neutral-400" />
                            <span>Profile</span>
                        </button>

                        <button
                            onClick={() => { navigate("/login/reset-password") }}
                            className="flex w-full items-center gap-3 px-4 py-2 transition-all duration-200 ease-out hover:translate-x-1 cursor-pointer"
                        >
                            <RotateCw className="w-4 h-4 text-neutral-400" />
                            <span>Reset password</span>
                        </button>
                    </div>
                    {/* Password section */}
                    <div className="flex flex-col bg-neutral-200 pt-[24px] pr-[16px] pb-[40px] pl-[16px] gap-[24px] 2xl:rounded-[16px] 2xl:w-[550px]">
                        <form onSubmit={onSubmit} className="flex flex-col gap-[24px]">
                            <InputField
                                label="Current password"
                                name="currentPassword"
                                type="password"
                                placeholder="Current password"
                                value={values.currentPassword}
                                onChange={onChange}
                                error={errors?.currentPassword}
                            />

                            <InputField
                                label="New password"
                                name="newPassword"
                                type="password"
                                placeholder="New password"
                                value={values.newPassword}
                                onChange={onChange}
                                error={errors?.newPassword}
                            />

                            <InputField
                                label="Confirm new password"
                                name="confirmNewPassword"
                                type="password"
                                placeholder="Confirm new password"
                                value={values.confirmNewPassword}
                                onChange={onChange}
                                error={errors?.confirmNewPassword}
                            />

                            <Button
                                type="submit"
                                buttonText="Reset password"
                                buttonStyle="primary"
                                className="w-fit"
                                disabled={isSubmitting}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ResetPasswordDesktop
