import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Button from "@/components/common/Button";
import { toast } from "sonner"
import { useNavigate } from "react-router-dom";

const categories = ["all", "Highlight", "Cat", "Inspiration", "General"];

function AdminCreateArticle() {
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [intro, setIntro] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSave = (type) => {
        navigate("/login/admin/article-management")
        const isDraft = type === "draft";
        toast.custom((t) => (
            <div className="flex w-[700px] items-start gap-[12px] rounded-[8px] bg-brand-green p-4 shadow-lg relative">

                <div className="flex flex-col gap-1">
                    <p className="text-headline-4 text-white">
                        {isDraft
                            ? "Create article and saved as draft"
                            : "Create article and published"}
                    </p>
                    <p className="text-body-2 text-white">
                        {isDraft
                            ? "You can publish article later"
                            : "Your article has been successfully published"}
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
    }

    return (
        <div className="min-h-screen bg-neutral-100">
            {/* Header */}
            <div className="flex items-center justify-between px-[60px] py-[24px] border-b border-neutral-200">
                <h1 className="text-xl font-semibold">Create article</h1>

                <div className="flex gap-3">
                    <Button onClick={() => handleSave("draft")} buttonText="Save as draft" buttonStyle="secondary" />
                    <Button onClick={() => handleSave("publish")} buttonText="Save and publish" buttonStyle="primary" />
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
                        <div className="w-[460px] h-[260px] rounded-lg bg-neutral-200 flex items-center justify-center">
                            <img className="text-neutral-400 text-sm" alt="Aritcle Image"></img>
                        </div>

                        <button className="px-4 py-2 text-sm self-end border border-neutral-300 rounded-full bg-white">
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
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat === "all" ? "Select category" : cat}
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
