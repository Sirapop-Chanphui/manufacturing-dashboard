import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import Button from "./Button"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function LoginRequiredDialog({ open, onOpenChange }) {
    const navigate = useNavigate();
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="w-[343px] rounded-[16px] pt-[16px] px-[16px] pb-[40px] gap-[24px]">
                {/* close (X) */}
                <div className="flex justify-end">
                    <AlertDialogCancel aria-label="Close" className="flex justify-end items-end w-fit h-[24px] p-0 text-xl text-neutral-500 border-none shadow-none hover:cursor-pointer hover:bg-transparent hover:scale-125">
                        ✕
                    </AlertDialogCancel>
                </div>
                <AlertDialogHeader className="flex flex-col justify-center items-center h-[168px] gap-[16px]">
                    <AlertDialogTitle className="text-[24px] font-semibold text-center">
                        Create an account to continue
                    </AlertDialogTitle>

                    <Button buttonText="Create account" buttonStyle="primary" className="w-fit" onClick={() => navigate("/signup")} />

                    <p className="text-center text-body-2 text-neutral-500">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="underline text-neutral-600 cursor-pointer"
                        >
                            Log in
                        </Link>
                    </p>



                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog >
    )
}

export default LoginRequiredDialog
