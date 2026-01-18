import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import Button from "./Button"



function LoginRequiredDialog({ open, onOpenChange }) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="w-[343px] rounded-[16px] pt-[16px] px-[16px] pb-[40px] gap-[24px]">
                {/* close (X) */}
                <AlertDialogCancel  aria-label="Close" className="flex justify-end h-[24px] p-0 text-neutral-500 border-none shadow-none">
                    ✕
                </AlertDialogCancel>

                <AlertDialogHeader className="flex flex-col justify-center items-center h-[168px] gap-[16px]">
                    <AlertDialogTitle className="text-[24px] font-semibold text-center">
                        Create an account to continue
                    </AlertDialogTitle>

                    
                       
                        <Button buttonText="Create account" buttonStyle="primary" className="w-fit"/>
                        
                        <p className="text-center text-body-2 text-neutral-500">
                        Already have an account?{" "}
                        <span className="underline cursor-pointer text-neutral-900">
                            Log in
                        </span>
                    </p>
                    

                    
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog >
    )
}

export default LoginRequiredDialog
