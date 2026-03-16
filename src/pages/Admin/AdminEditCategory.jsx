import Button from "@/components/common/Button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AdminEditCategory() {
    const { state } = useLocation();
    const categoryFromState = state?.category;
    const navigate = useNavigate();

    const [input, setInput] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!categoryFromState) {
            navigate("/login/admin/category-management", { replace: true });
            return;
        }
        setInput(categoryFromState.name ?? "");
    }, [categoryFromState, navigate]);

    const handleSave = async () => {
        if (!input.trim()) {
            toast.error("Please enter a category name");
            return;
        }
        if (!categoryFromState?.id) return;
        const payload = { name: input.trim() };
        try {
            setIsSubmitting(true);
            await axios.put(`${API_BASE_URL}/admin/categories/${categoryFromState.id}`, payload, {
                headers: { "Content-Type": "application/json" },
            });
            toast.success("Category updated successfully");
            navigate("/login/admin/category-management");
        } catch (err) {
            toast.error(err.response?.data?.message ?? "Failed to update category");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!categoryFromState) {
        return (
            <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
                <p className="text-body-1 text-neutral-400">Redirecting...</p>
            </div>
        );
    }

    return (
        <div className="flex bg-neutral-100 min-h-screen">
            <main className="flex-1 flex-col">
                <div className="flex items-center justify-between px-[60px] py-[24px] border-b border-neutral-300">
                    <h2 className="text-headline-3 font-semibold">Edit category</h2>
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

export default AdminEditCategory;
