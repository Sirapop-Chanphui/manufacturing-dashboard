import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Button from "@/components/common/Button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1761839259112-aaea03db3633?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const parseCategoriesResponse = (response) => {
    const raw = response?.data?.categories ?? response?.data?.data ?? response?.data ?? [];
    const list = Array.isArray(raw) ? raw : [];
    return list.map((item) => ({
        id: item.id ?? item.name,
        name: item.name ?? item.category_name ?? item.title ?? String(item.id ?? ""),
    }));
};

function AdminCreateArticle() {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [intro, setIntro] = useState("");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/categories`);
                setCategories(parseCategoriesResponse(response));
            } catch {
                setCategories([]);
            }
        };
        fetchCategories();
    }, []);

    const handleSave = async (type) => {
        const status = type === "draft" ? "Draft" : "Published";
        if (!title.trim()) {
            toast.error("Please enter a title");
            return;
        }
        if (!category) {
            toast.error("Please select a category");
            return;
        }
        try {
            setIsSubmitting(true);
            await axios.post(`${API_BASE_URL}/admin/posts`, {
                title: title.trim(),
                image: PLACEHOLDER_IMAGE,
                category,
                description: intro.trim() || title.trim(),
                content: content.trim() || "",
                status,
            });
            toast.success(status === "Draft" ? "Article saved as draft" : "Article published successfully");
            navigate("/login/admin/article-management");
        } catch (err) {
            toast.error(err.response?.data?.message ?? "Failed to create article");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-100">
            {/* Header */}
            <div className="flex items-center justify-between px-[60px] py-[24px] border-b border-neutral-200">
                <h1 className="text-xl font-semibold">Create article</h1>

                <div className="flex gap-3">
                    <Button
                        onClick={() => handleSave("draft")}
                        buttonText="Save as draft"
                        buttonStyle="secondary"
                        disabled={isSubmitting}
                    />
                    <Button
                        onClick={() => handleSave("publish")}
                        buttonText="Save and publish"
                        buttonStyle="primary"
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col px-[60px] py-[40px] max-w-[900px] gap-[28px]">
                {/* Thumbnail */}
                <div className="mb-6">
                    <label className="block text-sm text-neutral-600 mb-2">
                        Thumbnail image
                    </label>

                    <div className="flex items-center gap-6">
                        <div className="w-[460px] h-[260px] rounded-lg bg-neutral-200 overflow-hidden">
                            <img
                                src={PLACEHOLDER_IMAGE}
                                alt="Article thumbnail"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <button
                            type="button"
                            disabled
                            className="px-4 py-2 text-sm self-end border border-neutral-300 rounded-full bg-white opacity-50 cursor-not-allowed"
                        >
                            Upload thumbnail image
                        </button>
                    </div>
                </div>


                {/* Category */}
                <div className="flex flex-col gap-[4px]">
                    <p>Category</p>
                    <div className="relative w-[480px]">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full appearance-none border border-neutral-300 rounded-[8px] pl-[16px] pr-[12px] py-[12px] text-body-1 text-neutral-400 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-400"
                        >
                            <option value="">Select category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>

                        <ChevronDown
                            size={16}
                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
                        />
                    </div>
                </div>
                {/* Author */}
                <div className="text-neutral-400 w-[480px]">
                    <label className="block text-sm  mb-2">
                        Author name
                    </label>
                    <input
                        disabled
                        value="Thompson P."
                        className="w-full border border-neutral-200 rounded-md px-4 py-2 bg-neutral-200 text-sm"
                    />
                </div>

                {/* Title */}
                <div className="mb-6">
                    <label className="block text-sm text-neutral-600 mb-2">
                        Title
                    </label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Article title"
                        className="w-full border border-neutral-300 bg-white rounded-md px-4 py-2 text-sm focus:outline-none"
                    />
                </div>

                {/* Introduction */}
                <div className="mb-6">
                    <label className="block text-sm text-neutral-600 mb-2">
                        Introduction (max 120 letters)
                    </label>
                    <textarea
                        value={intro}
                        onChange={(e) => setIntro(e.target.value)}
                        placeholder="Introduction"
                        rows={3}
                        maxLength={120}
                        className="w-full border border-neutral-300 bg-white rounded-md px-4 py-2 text-sm resize-none focus:outline-none"
                    />
                </div>

                {/* Content */}
                <div className="mb-6">
                    <label className="block text-sm text-neutral-600 mb-2">
                        Content
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Content"
                        rows={10}
                        className="w-full border border-neutral-300 bg-white rounded-md px-4 py-3 text-sm focus:outline-none"
                    />
                </div>
            </div>
        </div >
    );
}

export default AdminCreateArticle;
