import { Search, Pencil, Trash2, Plus } from "lucide-react";
import Button from "@/components/common/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const parseCategoriesResponse = (response) => {
    const raw = response?.data?.categories ?? response?.data?.data ?? response?.data ?? [];
    const list = Array.isArray(raw) ? raw : [];
    return list.map((item) => ({
        id: item.id ?? item.name,
        name: item.name ?? item.category_name ?? item.title ?? String(item.id ?? ""),
    }));
};

function AdminCategoryManagement() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${API_BASE_URL}/categories`);
            setCategories(parseCategoriesResponse(response));
        } catch {
            setCategories([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async () => {
        if (!selectedCategory?.id) return;
        try {
            setIsDeleting(true);
            await axios.delete(`${API_BASE_URL}/admin/categories/${selectedCategory.id}`);
            setOpenDelete(false);
            setSelectedCategory(null);
            fetchCategories();
            toast.success("Category deleted successfully");
        } catch (err) {
            toast.error(err.response?.data?.message ?? "Failed to delete category");
        } finally {
            setIsDeleting(false);
        }
    };

    const filteredCategories = searchKeyword.trim()
        ? categories.filter((cat) => cat.name.toLowerCase().includes(searchKeyword.trim().toLowerCase()))
        : categories;

    return (
        <div className="flex bg-neutral-100 min-h-screen">

            <main className="flex-1 flex-col">
                {/* Header */}
                <div className="flex flex-row justify-between items-center px-[60px] py-[24px] border-b border-neutral-300 ">
                    <h2 className="text-headline-3 font-semibold">Category management</h2>
                    <Button buttonText="Create category" buttonStyle="primary" icon={Plus} className="flex flex-row" onClick={() => navigate("create-category")} />
                </div>

                {/* Filters */}
                <div className="flex flex-col px-[60px] py-[40px] pb-[120px]">
                    <div className="flex items-center justify-between mb-4">

                        <div className="relative w-[360px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search category..."
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                className="w-full py-[12px] pr-[12px] pl-[32px] rounded-[8px] border border-neutral-300 bg-white text-sm focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-white text-neutral-500">
                                <tr>
                                    <th className="text-left px-4 py-3">category</th>
                                    <th className="px-4 py-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <TableSkeleton rows={6} />
                                ) : filteredCategories.length === 0 ? (
                                    <tr>
                                        <td colSpan={2} className="px-4 py-12 text-center text-neutral-400">
                                            No categories found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCategories.map((category) => (
                                        <tr key={category.id} className="border-t">
                                            <td className="px-4 py-3">{category.name}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-3 justify-end">
                                                    <Pencil
                                                        size={16}
                                                        className="cursor-pointer text-neutral-600"
                                                        onClick={() =>
                                                            navigate("edit-category", { state: { category } })
                                                        }
                                                    />
                                                    <Trash2
                                                        size={16}
                                                        className="cursor-pointer text-neutral-400"
                                                        onClick={() => {
                                                            setSelectedCategory(category);
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

export default AdminCategoryManagement;



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
                        Delete category
                    </AlertDialogTitle>
                    <AlertDialogTitle className="text-body-1 text-neutral-400 text-center">
                        Do you want to delete this category?
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
  
  
  



