import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { useState } from "react";

function AdminResetPassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [openConfirm, setOpenConfirm] = useState(false);


    return (
        <div className="flex bg-neutral-100 min-h-screen">
            <main className="flex-1 flex-col">
                {/* Header */}
                <div className="flex flex-row justify-between items-center px-[60px] py-[24px] border-b border-neutral-300">
                    <h2 className="text-headline-3 font-semibold">Reset password</h2>
                    <Button
                        buttonText="Reset password"
                        buttonStyle="primary"
                        onClick={() => setOpenConfirm(true)}
                    />

                </div>

                {/* Content */}
                <div className="flex flex-col pt-[40px] px-[60px] pb-[120px] gap-[40px]">
                    {/* Form */}
                    <div className="flex flex-col gap-[28px] w-[476px]">
                        <InputField
                            label="Current password"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />

                        <InputField
                            label="New password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <InputField
                            label="Confirm password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>
            </main>
            <ResetConfirmDialog
                open={openConfirm}
                onOpenChange={setOpenConfirm}
                onConfirm={() => {
                    console.log("reset password", {
                        currentPassword,
                        newPassword,
                        confirmPassword,
                    });

                    // 👉 เรียก API reset password ตรงนี้

                    setOpenConfirm(false);
                }}
            />

        </div>
    );
}

export default AdminResetPassword;

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog"

function ResetConfirmDialog({ open, onOpenChange, onConfirm }) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="w-[477px] rounded-[16px] pt-[16px] px-[16px] pb-[40px] gap-[24px]">
                {/* close (X) */}
                <div className="flex justify-end">
                    <AlertDialogCancel aria-label="Close" className="flex justify-end items-end w-fit h-[24px] p-0 text-xl text-neutral-500 border-none shadow-none hover:cursor-pointer hover:bg-transparent hover:scale-125">
                        ✕
                    </AlertDialogCancel>
                </div>
                <AlertDialogHeader className="flex flex-col justify-center items-center h-[168px] gap-[16px]">
                    <AlertDialogTitle className="text-[24px] font-semibold text-center">
                        Reset password
                    </AlertDialogTitle>
                    <AlertDialogTitle className="text-body-1 text-neutral-400 text-center">
                        Do you want to reset your password?
                    </AlertDialogTitle>

                    <div className="flex flex-row gap-4 mt-2">
                        <Button buttonText="Cancel" buttonStyle="secondary" className="w-fit" onClick={() => onOpenChange(false)} />
                        <Button buttonText="Reset" buttonStyle="primary" className="w-fit" onClick={onConfirm} />
                    </div>





                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog >
    )
}

