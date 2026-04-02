import { useNavigate } from "react-router-dom";
import { UserRound, RotateCw } from "lucide-react";
import man from "@/assets/img/men-and-cat.jpg";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";

const defaultAvatar = man;

function ProfileDesktop({ values, onChange, onSubmit, user, getUserLoading }) {
    const navigate = useNavigate();

    const avatarSrc =
        user?.profile_pic && String(user.profile_pic).trim() !== ""
            ? user.profile_pic
            : defaultAvatar;
    const displayName =
        values.name?.trim() ||
        values.username?.trim() ||
        user?.name?.trim() ||
        user?.username?.trim() ||
        (getUserLoading ? "…" : "User");

    return (
        <div className="hidden 2xl:flex flex-col w-full h-screen pt-[132px]  bg-neutral-100  items-center">
            <div>

                {/*Tag show your profile */}
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
                        <span className="text-headline-4 text-neutral-600">Profile</span>
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
                    {/* Profile section */}
                    <div className="flex flex-col bg-neutral-200 pt-[24px] pr-[16px] 2xl:p-[40px]  pl-[16px] gap-[24px] 2xl:rounded-[16px] 2xl:w-[550px]">

                        {/* Profile Image */}
                        <div className="flex flex-col 2xl:flex-row items-center gap-[24px]">
                            <div className="w-[120px] h-[120px] rounded-full overflow-hidden">
                                <img
                                    src={avatarSrc}
                                    alt={`${displayName} profile picture`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button className="pt-[12px] pr-[40px] pb-[12px] pl-[40px] border border-neutral-400 rounded-full text-body-1 text-neutral-600 bg-white">
                                Upload profile picture
                            </button>
                        </div>

                        {/* Profile detail */}
                        <div className="w-full h-px bg-neutral-300"></div>


                        <form onSubmit={onSubmit} className="flex flex-col gap-[24px]">
                            <InputField
                                label="Name"
                                name="name"
                                placeholder="Name"
                                value={values.name}
                                onChange={onChange}
                            />

                            <InputField
                                label="Username"
                                name="username"
                                placeholder="Username"
                                value={values.username}
                                onChange={onChange}
                            />
                            <div className="flex flex-col text-neutral-400">
                                <label className="text-body-1 caret-transparent">Email</label>
                                <div className="text-body-1 caret-transparent rounded-[8px] pl-[16px] pr-[12px] py-[12px] text-body-1 ">{values.email}</div >
                            </div>
                            {/* Save Button */}
                            <Button
                                type="submit"
                                buttonText="Save"
                                buttonStyle="primary"
                                className="w-fit"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileDesktop