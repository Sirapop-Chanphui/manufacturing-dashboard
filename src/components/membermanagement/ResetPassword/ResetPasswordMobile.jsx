import { UserRound } from 'lucide-react';
import { RotateCw } from 'lucide-react';
import man from "@/assets/img/men-and-cat.jpg"
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";

function ResetPasswordMobile({values, onChange, onSubmit}) {

  return (
    <div className="2xl:hidden flex flex-col pt-[48px]  bg-neutral-100 justify-center">
      <div>
        <div className="flex flex-row ">
          <div className="flex flex-row px-[16PX] py-[12px] gap-[12px]">
            <UserRound className="h-[24px] w-[24px] text-neutral-400 stroke-[1px]" />
            <span className="text-body-1 text-neutral-500">Profile</span></div>
          <div className="flex flex-row px-[16PX] py-[12px] gap-[12px]">
            <RotateCw className="h-[24px] w-[24px] text-neutral-300 stroke-[1px]" />
            <span className="text-body-1 text-neutral-400">Reset password</span></div>
        </div>

        <div className="flex flex-row items-center px-[16px] py-[24px] gap-[12px]">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <img
              src={man}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-row items-center gap-[16px]">
            <span className="w-[97px] text-headline-4 text-neutral-400 line-clamp-1">Moodeng ja</span>
            <div className="flex h-[28px] w-px bg-neutral-300 "></div>
            <span className="w-[162px] text-headline-4 text-neutral-600 line-clamp-1">Reset password</span>
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
