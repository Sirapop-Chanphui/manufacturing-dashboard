import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import Button from "@/components/common/Button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

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
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            toast.error("Please upload a valid image (JPEG, PNG, GIF, WebP).");
            return;
        }
        if (file.size > MAX_IMAGE_SIZE) {
            toast.error("Image must be smaller than 5MB.");
            return;
        }
        setImageFile({ file });
        setImagePreview(URL.createObjectURL(file));
    };

    const handleRemoveImage = () => {
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

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

    useEffect(() => () => {
        if (imagePreview) URL.revokeObjectURL(imagePreview);
    }, [imagePreview]);

    const handleSave = async (type) => {
        if (!title.trim()) {
            toast.error("Please enter a title");
            return;
        }
        if (!category) {
            toast.error("Please select a category");
            return;
        }
        if (!imageFile?.file) {
            toast.error("Please select an image");
            return;
        }
        const categoryObj = categories.find((c) => c.name === category);
        const categoryId = categoryObj?.id ?? category;
        const statusId = type === "draft" ? 1 : 3; // 1=Draft, 3=Published
        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append("title", title.trim());
            formData.append("category_id", categoryId);
            formData.append("description", intro.trim() || title.trim());
            formData.append("content", content.trim() || "");
            formData.append("status_id", statusId);
            formData.append("imageFile", imageFile.file);

            console.log(formData)
            await axios.post(`${API_BASE_URL}/admin/posts`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success(type === "draft" ? "Article saved as draft" : "Article published successfully");
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
                        <div className="w-[460px] h-[260px] rounded-lg bg-neutral-200 overflow-hidden flex items-center justify-center">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Thumbnail preview"
                                    className="w-full h-full object-cover object-center"
                                />
                            ) : (
                                <p className="text-body-1 text-neutral-400">No image selected</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 self-end">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/gif,image/webp"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <Button
                                buttonText="Upload thumbnail image"
                                buttonStyle="secondary"
                                onClick={() => fileInputRef.current?.click()}
                            />
                            {imageFile && (
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="text-body-2 text-neutral-400 hover:text-neutral-600 underline hover:cursor-pointer"
                                >
                                    Remove image
                                </button>
                            )}
                        </div>
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
