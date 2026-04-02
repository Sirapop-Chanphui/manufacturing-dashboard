import { useState, useEffect, useRef } from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import Button from "@/components/common/Button";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { validateImageFile } from "@/utils/imageFileValidation";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1761839259112-aaea03db3633?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const CATEGORY_MAP = {
    1: "Quality", 2: "Compliance", 3: "Production", 4: "Maintenance",
    5: "ProblemSolving", 6: "Lean", 7: "Highlight",
};

const parseCategoriesResponse = (response) => {
    const raw = response?.data?.categories ?? response?.data?.data ?? response?.data ?? [];
    const list = Array.isArray(raw) ? raw : [];
    return list.map((item) => ({
        id: item.id ?? item.name,
        name: item.name ?? item.category_name ?? item.title ?? String(item.id ?? ""),
    }));
};

function AdminEditArticle() {
    const { state } = useLocation();
    const articleFromState = state?.article;
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [intro, setIntro] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(PLACEHOLDER_IMAGE);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [openDelete, setOpenDelete] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const fileInputRef = useRef(null);

    const articleId = articleFromState?.id;

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const result = validateImageFile(file);
        if (!result.ok) {
            toast.error(result.message);
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
        if (!articleFromState?.id) {
            setIsLoading(false);
            navigate("/login/admin/article-management", { replace: true });
            return;
        }
        setTitle(articleFromState.title ?? "");
        setIntro(articleFromState.description ?? "");
        setCategory(articleFromState.category ?? "");
        setImage(articleFromState.image ?? PLACEHOLDER_IMAGE);

        const fetchFullArticle = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/posts/${articleId}`);
                const raw = response.data?.data ?? response.data;
                if (raw) {
                    setContent(raw.content ?? "");
                    setTitle((prev) => prev || (raw.title ?? ""));
                    setIntro((prev) => prev || (raw.description ?? ""));
                    setImage((prev) => prev || (raw.image ?? PLACEHOLDER_IMAGE));
                    const catName = (raw.category ?? CATEGORY_MAP[raw.category_id]) ?? articleFromState.category;
                    if (catName) setCategory(catName);
                }
            } catch {
                toast.error("Failed to load article details");
            } finally {
                setIsLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/categories`);
                setCategories(parseCategoriesResponse(response));
            } catch {
                setCategories([]);
            }
        };

        fetchFullArticle();
        fetchCategories();
    }, [articleId, articleFromState, navigate]);

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
            if (imageFile?.file) {
                formData.append("imageFile", imageFile.file);
            }

            await axios.put(`${API_BASE_URL}/admin/posts/${articleId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success(type === "draft" ? "Article saved as draft" : "Article updated and published");
            navigate("/login/admin/article-management");
        } catch (err) {
            toast.error(err.response?.data?.message ?? "Failed to update article");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await axios.delete(`${API_BASE_URL}/admin/posts/${articleId}`);
            setOpenDelete(false);
            toast.success("Article deleted successfully");
            navigate("/login/admin/article-management");
        } catch (err) {
            toast.error(err.response?.data?.message ?? "Failed to delete article");
        } finally {
            setIsDeleting(false);
        }
    };

    if (!articleFromState) {
        return (
            <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
                <p className="text-body-1 text-neutral-400">
                    {isLoading ? "Redirecting..." : "Loading..."}
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-100">
            <div className="flex items-center justify-between px-[60px] py-[24px] border-b border-neutral-200">
                <h1 className="text-xl font-semibold">Edit article</h1>

                <div className="flex gap-3">
                    <Button onClick={() => handleSave("draft")} buttonText="Save as draft" buttonStyle="secondary" disabled={isSubmitting} />
                    <Button onClick={() => handleSave("publish")} buttonText="Save and publish" buttonStyle="primary" disabled={isSubmitting} />
                </div>
            </div>

            <div className="flex flex-col px-[60px] py-[40px] max-w-[900px] gap-[28px]">
                <div className="mb-6">
                    <label className="block text-body-1 text-neutral-400 mb-2">Thumbnail image</label>
                    <div className="flex items-center gap-6">
                        <div className="w-[460px] h-[260px] rounded-lg bg-neutral-200 flex items-center justify-center overflow-hidden">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Thumbnail preview"
                                    className="w-full h-full object-cover object-center"
                                />
                            ) : (
                                <img
                                    src={image || PLACEHOLDER_IMAGE}
                                    alt={title || "Article"}
                                    className="w-full h-full object-cover object-center"
                                />
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

                <div className="flex flex-col gap-[4px]">
                    <p className="text-body-1 text-neutral-400">Category</p>
                    <div className="relative w-[480px]">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full appearance-none border border-neutral-300 rounded-[8px] pl-[16px] pr-[12px] py-[12px] text-body-1 text-neutral-400 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-400"
                        >
                            <option value="">Select category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                        <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                    </div>
                </div>
                {/* Author */}
                <div className="text-neutral-400 w-[480px] opacity-40">
                    <label className="block text-body-1 text-neutral-400 mb-2">
                        Author name
                    </label>
                    <input
                        disabled
                        value="Thompson P."
                        className="w-full border border-neutral-200 rounded-md px-4 py-2 bg-neutral-200 text-body-1 text-neutral-400"
                    />
                </div>

                {/* Title */}
                <div className="mb-6 text-body-1 text-neutral-400">
                    <label className="block mb-2">
                        Title
                    </label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Article title"
                        className="w-full border border-neutral-300 bg-white rounded-md px-4 py-2 focus:outline-none"
                    />
                </div>

                {/* Introduction */}
                <div className="mb-6 ">
                    <label className="block text-body-1 text-neutral-400 mb-2">
                        Introduction (max 120 letters)
                    </label>
                    <textarea
                        value={intro}
                        onChange={(e) => setIntro(e.target.value)}
                        placeholder="Introduction"
                        rows={3}
                        maxLength={120}
                        className="w-full border border-neutral-300 bg-white rounded-md text-body-1 text-neutral-600 px-4 py-2 text-sm resize-none focus:outline-none"
                    />
                </div>

                {/* Content */}
                <div className="mb-6">
                    <label className="block text-body-1 text-neutral-400 mb-2">
                        Content
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Content"
                        rows={10}
                        className="w-full border border-neutral-300 bg-white rounded-md px-4 py-3 text-body-1 text-neutral-600 mb-2 focus:outline-none"
                    />
                </div>

                {/*Delete */}
                <div className="flex flex-row items-center gap-1 hover:cursor-pointer caret-transparent"
                    onClick={() => {
                        setOpenDelete(true);
                    }}>
                    <Trash2
                        size={16}
                        className="cursor-pointer text-neutral-400"

                    />
                    <span className="text-neutral-600 text-sm underline underline-offset-2">Delete article</span>
                </div>
            </div>
            <DeleteConfirmDialog
                open={openDelete}
                onOpenChange={setOpenDelete}
                onConfirm={handleDelete}
                isDeleting={isDeleting}
            />
        </div >

    );
}

export default AdminEditArticle;

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog"

function DeleteConfirmDialog({ open, onOpenChange, onConfirm, isDeleting = false }) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="w-[477px] rounded-[16px] pt-[16px] px-[16px] pb-[40px] gap-[24px]">
                <div className="flex justify-end">
                    <AlertDialogCancel aria-label="Close" className="flex justify-end items-end w-fit h-[24px] p-0 text-xl text-neutral-500 border-none shadow-none hover:cursor-pointer hover:bg-transparent hover:scale-125" disabled={isDeleting}>
                        ✕
                    </AlertDialogCancel>
                </div>
                <AlertDialogHeader className="flex flex-col justify-center items-center h-[168px] gap-[16px]">
                    <AlertDialogTitle className="text-[24px] font-semibold text-center">
                        Delete article
                    </AlertDialogTitle>
                    <AlertDialogTitle className="text-body-1 text-neutral-400 text-center">
                        Do you want to delete this article?
                    </AlertDialogTitle>
                    <div className="flex flex-row gap-4 mt-2">
                        <Button buttonText="Cancel" buttonStyle="secondary" className="w-fit" onClick={() => onOpenChange(false)} disabled={isDeleting} />
                        <Button buttonText={isDeleting ? "Deleting..." : "Delete"} buttonStyle="primary" className="w-fit" onClick={onConfirm} disabled={isDeleting} />
                    </div>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
}
