import { Search, Pencil, Trash2, Plus, ChevronDown } from "lucide-react";
import Button from "@/components/common/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const parseListResponse = (response, key) => {
    const raw = response?.data?.[key] ?? response?.data?.data ?? response?.data ?? [];
    const list = Array.isArray(raw) ? raw : [];
    return list.map((item) => ({
        id: item.id ?? item.name ?? item.category_name ?? item.status,
        name: item.name ?? item.category_name ?? item.status_name ?? item.status ?? item.title ?? String(item.id ?? ""),
    }));
};

function AdminArticleManagement() {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState("all");
    const [category, setCategory] = useState("all");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [openDelete, setOpenDelete] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/categories`);
                setCategories(parseListResponse(response, "categories"));
            } catch {
                setCategories([]);
            }
        };
        const fetchStatuses = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/admin/statuses`);
                setStatuses(parseListResponse(response, "statuses"));
            } catch {
                setStatuses([]);
            }
        };
        fetchCategories();
        fetchStatuses();
    }, []);

    const fetchArticles = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${API_BASE_URL}/admin/posts`, {
                params: {
                    page: 1,
                    limit: 50,
                    ...(debouncedSearch.trim() && { title: debouncedSearch.trim() }),
                    ...(category !== "all" && { category }),
                    ...(status !== "all" && { status }),
                },
            });
            const rawPosts = response.data?.posts ?? response.data?.data ?? [];
            setArticles(Array.isArray(rawPosts) ? rawPosts : []);
        } catch (err) {
            setArticles([]);
            console.error("fetchArticles:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchKeyword), 400);
        return () => clearTimeout(timer);
    }, [searchKeyword]);

    useEffect(() => {
        fetchArticles();
    }, [category, status, debouncedSearch]);

    const handleDelete = async () => {
        if (!selectedArticle?.id) return;
        try {
            setIsDeleting(true);
            await axios.delete(`${API_BASE_URL}/admin/posts/${selectedArticle.id}`);
            setOpenDelete(false);
            setSelectedArticle(null);
            fetchArticles();
            toast.success("Article deleted successfully");
        } catch (err) {
            console.error("deleteArticle:", err);
            toast.error(err.response?.data?.message ?? "Failed to delete article");
        } finally {
            setIsDeleting(false);
        }
    };

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
                                placeholder="Search by title..."
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
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
                                    <option value="all">Category</option>
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

                            <div className="relative w-[200px]">
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full appearance-none border border-neutral-300 rounded-[8px] pl-[16px] pr-[40px] py-[12px] text-body-1 text-neutral-400 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-400"
                                >
                                    <option value="all">Status</option>
                                    {statuses.map((s) => (
                                        <option key={s.id} value={s.name}>
                                            {s.name}
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
                                {isLoading ? (
                                    <TableSkeleton rows={6} columns={5} />
                                ) : articles.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-4 py-12 text-center text-neutral-400">
                                            No articles found
                                        </td>
                                    </tr>
                                ) : (
                                    articles.map((article) => (
                                        <tr key={article.id} className="border-t">
                                            <td className="px-4 py-3">{article.title}</td>
                                            <td className="px-4 py-3">{article.category}</td>
                                            <td className="px-4 py-3">
                                                <span className={`flex items-center gap-1 ${article.status === "Published" ? "text-green-600" : "text-neutral-400"}`}>
                                                    ● {article.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-3 justify-end">
                                                    <Pencil
                                                        size={16}
                                                        className="cursor-pointer text-neutral-600"
                                                        onClick={() => navigate("edit-article", { state: { article } })}
                                                    />
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
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <DeleteConfirmDialog
                open={openDelete}
                onOpenChange={setOpenDelete}
                onConfirm={handleDelete}
                isDeleting={isDeleting}
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

function DeleteConfirmDialog({ open, onOpenChange, onConfirm, isDeleting = false }) {
    const handleDeleteClick = () => {
        onConfirm();
    };

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
                        <Button buttonText={isDeleting ? "Deleting..." : "Delete"} buttonStyle="primary" className="w-fit" onClick={handleDeleteClick} disabled={isDeleting} />
                    </div>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
}


function TableSkeleton({ columns = 3, rows = 5 }) {
    return (
      <>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex} className="border-t animate-pulse">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <td key={colIndex} className="px-4 py-3">
                <div className="h-4 w-full max-w-[180px] bg-neutral-200 rounded" />
              </td>
            ))}
          </tr>
        ))}
      </>
    );
  }
