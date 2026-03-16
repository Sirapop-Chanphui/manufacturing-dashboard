import Button from "@/components/common/Button";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AdminCreateCategory() {
    const [input, setInput] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSave = async () => {
        if (!input.trim()) {
            toast.error("Please enter a category name");
            return;
        }
        try {
            setIsSubmitting(true);
            await axios.post(`${API_BASE_URL}/admin/categories`, {
                name: input.trim(),
            });
            toast.success("Category created successfully");
            navigate("/login/admin/category-management");
        } catch (err) {
            toast.error(err.response?.data?.message ?? "Failed to create category");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex bg-neutral-100 min-h-screen">
            <main className="flex-1 flex-col">
                <div className="flex items-center justify-between px-[60px] py-[24px] border-b border-neutral-300">
                    <h2 className="text-headline-3 font-semibold">Create category</h2>
                    <Button buttonText="Save" buttonStyle="primary" className="flex flex-row" onClick={handleSave} disabled={isSubmitting} />
                </div>

                <div className="flex flex-col pt-[40px] px-[60px] pb-[120px] gap-[4px]">
                    <div className="w-[480px]">
                        <span className="text-body-1 text-neutral-400">Category name</span>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Category name"
                            className="w-full py-[12px] pr-[12px] pl-[32px] rounded-[8px] border border-neutral-300 bg-white text-body-1 focus:outline-none mt-2 block"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminCreateCategory;
