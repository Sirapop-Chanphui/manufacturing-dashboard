import Button from "@/components/common/Button";
import { useState } from "react";
import { toast } from "sonner"

import { useNavigate } from "react-router-dom";



function AdminCreateCategory() {
    const [input, setInput] = useState("")


    const navigate = useNavigate();

    return (
        <div className="flex bg-neutral-100 min-h-screen">

            <main className="flex-1 flex-col">
                {/* Header */}
                <div className="flex flex-row justify-between items-center px-[60px] py-[24px] border-b border-neutral-300 ">
                    <h2 className="text-headline-3 font-semibold">Create category</h2>
                    <Button buttonText="Save" buttonStyle="primary" className="flex flex-row"
                        onClick={() => {
                            if (!input.trim()) return;
                            navigate("/login/admin/category-management")
                            toast.custom((t) => (
                                <div className="flex w-[700px] items-start gap-[12px] rounded-[8px] bg-brand-green p-4 shadow-lg relative">

                                    <div className="flex flex-col gap-1">
                                        <p className="text-headline-4 text-white">
                                            Create category
                                        </p>
                                        <p className="text-body-2 text-white">
                                            Category has been successfully created.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => toast.dismiss(t)}
                                        className="absolute top-4 right-6 text-white opacity-80 hover:opacity-100"
                                        aria-label="Close"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ), {
                                duration: 5000,
                            });
                        }} />
                </div>

                <div className="flex flex-col pt-[40px] px-[60px] pb-[120px] gap-[4px]">
                    <div className="w-[480px]">
                        <span className="text-body-1 text-neutral-400">Category name</span>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Category name"
                            className="w-full py-[12px] pr-[12px] pl-[32px] rounded-[8px] border border-neutral-300 bg-white text-body-1 focus:outline-none"
                        />
                    </div>
                </div>
            </main >


        </div >
    );
}

export default AdminCreateCategory;




