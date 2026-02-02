import { Search, Pencil, Trash2, Plus, ChevronDown } from "lucide-react";
import Button from "@/components/common/Button";
import { useState } from "react"
import { useNavigate } from "react-router-dom";



const articles = [
    { title: "Understanding Cat Behavior: Why Your Feline Friend Acts the Way They Do", category: "Cat", status: "Published" },
    { title: "The Fascinating World of Cats: Why We Love Our Furry Friends", category: "Cat", status: "Published" },
    { title: "Finding Motivation: How to Stay Inspired Through Life's Challenges", category: "General", status: "Published" },
    { title: "The Science of the Cat's Purr: How It Benefits Cats and Humans Alike", category: "Cat", status: "Published" },
    { title: "Top 10 Health Tips to Keep Your Cat Happy and Healthy", category: "Cat", status: "Published" },
    { title: "Unlocking Creativity: Simple Habits to Spark Inspiration Daily", category: "Inspiration", status: "Published" },
];


const categories = ["all", "Highlight", "Cat", "Inspiration", "General"];
const statuses = ["all", "Published", "Draft"];

function AdminArticleManagement() {
    const [status, setStatus] = useState("all");
    const [category, setCategory] = useState("all");

    const [openDelete, setOpenDelete] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);

    const navigate = useNavigate();

    return (
        <div className="flex bg-neutral-100 min-h-screen">

            <main className="flex-1 flex-col">
                {/* Header */}
                <div className="flex flex-row justify-between items-center px-[60px] py-[24px] border-b border-neutral-300 ">
                    <h2 className="text-headline-3 font-semibold">Article management</h2>
                    <Button buttonText="Create article" buttonStyle="primary" icon={Plus} className="flex flex-row" onClick={() => navigate("create-article")} />
                </div>

                {/* Filters */}
                <div className="flex flex-col px-[60px] py-[40px] pb-[120px]">
                    <div className="flex items-center justify-between mb-4">

                        <div className="relative w-[360px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full py-[12px] pr-[12px] pl-[32px] rounded-[8px] border border-neutral-300 bg-white text-sm focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-row text-body-1 gap-[16px]">

                            <div className="relative w-[200px]">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full appearance-none border border-neutral-300 rounded-[8px] pl-[16px] pr-[40px] py-[12px] text-body-1 text-neutral-400 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-400"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat === "all" ? "Category" : cat}
                                        </option>
                                    ))}
                                </select>

                                <ChevronDown
                                    size={16}
                                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
                                />
                            </div>

                            <div className="relative w-[200px]">
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full appearance-none border border-neutral-300 rounded-[8px] pl-[16px] pr-[40px] py-[12px] text-body-1 text-neutral-400 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-400"
                                >
                                    {statuses.map((s) => (
                                        <option key={s} value={s}>
                                            {s === "all" ? "status" : s}
                                        </option>
                                    ))}
                                </select>

                                <ChevronDown
                                    size={16}
                                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-neutral-100 text-neutral-500">
                                <tr>
                                    <th className="text-left px-4 py-3">Article title</th>
                                    <th className="text-left px-4 py-3">Category</th>
                                    <th className="text-left px-4 py-3">Status</th>
                                    <th className="px-4 py-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles.map((article, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="px-4 py-3">{article.title}</td>
                                        <td className="px-4 py-3">{article.category}</td>
                                        <td className="px-4 py-3">
                                            <span className="text-green-600 flex items-center gap-1">
                                                ● {article.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-3 justify-end">
                                                <Pencil size={16} className="cursor-pointer text-neutral-600"
                                                    onClick={() => { navigate("edit-article") }} />
                                                <Trash2
                                                    size={16}
                                                    className="cursor-pointer text-neutral-400"
                                                    onClick={() => {
                                                        setSelectedArticle(article);
                                                        setOpenDelete(true);
                                                    }}
                                                />

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <DeleteConfirmDialog
                open={openDelete}
                onOpenChange={setOpenDelete}
                onConfirm={() => {
                    console.log("delete article:", selectedArticle);
                    //  เรียก API ลบจริงตรงนี้
                    setOpenDelete(false);
                }}
            />

        </div>
    );
}

export default AdminArticleManagement;



import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog"

function DeleteConfirmDialog({ open, onOpenChange, onConfirm }) {
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
                        Delete article
                    </AlertDialogTitle>
                    <AlertDialogTitle className="text-body-1 text-neutral-400 text-center">
                        Do you want to delete this article?
                    </AlertDialogTitle>

                    <div className="flex flex-row gap-4 mt-2">
                        <Button buttonText="Cancel" buttonStyle="secondary" className="w-fit" onClick={() => onOpenChange(false)} />
                        <Button buttonText="Delete" buttonStyle="primary" className="w-fit" onClick={onConfirm} />
                    </div>





                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog >
    )
}



