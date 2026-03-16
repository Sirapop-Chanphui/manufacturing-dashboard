import { useState } from "react";
import { UserRound } from 'lucide-react';
import { RotateCw } from 'lucide-react';
import man from "@/assets/img/men-and-cat.jpg"
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";



function ProfileMobile({ values, onChange, onSubmit }) {

  return (
    <div className="flex flex-col pt-[48px] bg-neutral-100 justify-center">
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
            <span className="text-headline-4 text-neutral-400">Moodeng ja</span>
            <div className="flex h-[28px] w-px bg-neutral-300 "></div>
            <span className="text-headline-4 text-neutral-600">Profile</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-neutral-200 pt-[24px] pr-[16px] 2xl:p-[40px]  pl-[16px] gap-[24px] 2xl:rounded-[16px] 2xl:w-[550px]">

        {/* Profile Image */}
        <div className="flex flex-col 2xl:flex-row items-center gap-[24px]">
          <div className="w-[120px] h-[120px] rounded-full overflow-hidden">
            <img
              src={man}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <button className="pt-[12px] pr-[40px] pb-[12px] pl-[40px] border border-neutral-400 rounded-full text-body-1 text-neutral-600 bg-white">
            Upload profile picture
          </button>
        </div>

        <div className="w-full h-px bg-neutral-300"></div>

        {/* Form */}
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
  )
}

export default ProfileMobile