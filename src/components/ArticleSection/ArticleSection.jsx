import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { formatDateEn } from "../../utils/formatDate";
import { Spinner } from "@/components/ui/spinner"

import BlogCard from "./BlogCard/BlogCard";
import CategoryTabs from "./CategoryTabs";
import CategorySelect from "./CategorySelect";
import SearchSuggestion from "./SearchSuggestion";
import { useClickOutside } from "../../utils/useClickOutside";
import BlogCardSkeleton from "./BlogCard/BlogCardSkeleton";

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const parseCategoriesResponse = (response) => {
    const raw = response?.data?.categories ?? response?.data?.data ?? response?.data ?? [];
    const list = Array.isArray(raw) ? raw : [];
    return list.map((item) => item.name ?? item.category_name ?? item.title ?? String(item.id ?? ""));
};

function ArticleSection() {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState(["Highlight"]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("Highlight");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const searchRef = useRef(null);

    const [showSuggestion, setShowSuggestion] = useState(false);
    const [suggestionPosts, setSuggestionPosts] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/categories`);
                const names = parseCategoriesResponse(response);
                setCategories(["Highlight", ...names]);
            } catch {
                setCategories(["Highlight"]);
            }
        };
        fetchCategories();
    }, []);

    const fetchByKeyword = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/posts`, {
                params: {
                    page: 1,
                    limit: 30,
                    keyword: searchKeyword,
                    ...(selectedCategory !== "Highlight" && { category: selectedCategory })
                }
            }
            )
            
            setSuggestionPosts(response.data?.posts ?? [])
        } catch (error) {
            console.log("fetchSugeestion: ", error)
        } finally {
            setHasSearched(true);
        }
    }

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/posts`, {
                params: {
                    page: page,
                    limit: 6,
                    keyword: searchKeyword,
                    ...(selectedCategory !== "Highlight" && { category: selectedCategory })
                }
            }
            );

            const postsData = response.data?.posts ?? [];
            if (page === 1) {
                setPosts(postsData);
            } else {
                setPosts((prevPosts) => [...(prevPosts ?? []), ...postsData]);
            }

            if ((response.data?.currentPage ?? 0) >= (response.data?.totalPages ?? 1)) {
                setHasMore(false);
            } else { setHasMore(true) }
        } catch (error) {
            console.log("fetchPosts: ", error)

        } finally {
            setIsLoading(false)
            setIsRefreshing(false);
        }
    }

    useEffect(() => {
        setPage(1);
        setIsLoading(true)
        if (!searchKeyword) {
            setShowSuggestion(false);
            setSuggestionPosts([]);
            setIsLoading(false);
            setHasSearched(false);
            return;
        }
        const timeout = setTimeout(() => { fetchByKeyword(); }, 400);

        return () => {
            clearTimeout(timeout);
        };

    }, [searchKeyword])

    
    useEffect(() => {
        setIsLoading(true)
        setIsRefreshing(true)
        fetchPosts();

    }, [selectedCategory, page, searchKeyword])





    const handleViewMore = () => {
        setPage((prevPage) => prevPage + 1)
    }

    useClickOutside(searchRef, () => setShowSuggestion(false));
    return (
        <div className="flex flex-col items-center 2xl:pt-[60px] pb-[80px] 2xl:pb-[120px] 2xl:px-[120px] bg-neutral-100">
            <div className="flex flex-col items-start w-full">
                <p className="text-headline-3 p-[16px] 2xl:p-0 2xl:pb-[32px] text-neutral-600 caret-transparent">
                    Latest articles
                </p>

                <div className="w-full flex flex-col 2xl:flex-row 2xl:justify-between p-[16px] gap-[16px] bg-neutral-200 rounded-[16px]">
                    {/*catagory for destop */}
                    <CategoryTabs
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onClick={(category) => {
                            setSelectedCategory(category);
                            setPage(1);
                            setPosts([]);
                            setIsRefreshing(true);

                        }}
                    />

                    {/* wrapper search input + icon */}
                    <div ref={searchRef} className="relative w-full 2xl:w-[360px] caret-transparent">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchKeyword}
                            onChange={(e) => {
                                setSearchKeyword(e.target.value)
                                setShowSuggestion(true);
                            }}
                            onFocus={() => searchKeyword && setShowSuggestion(true)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setShowSuggestion(false);
                                    e.currentTarget.blur();
                                }
                            }}
                            className="text-body-1 border border-neutral-300 text-neutral-400 placeholder:text-neutral-400 bg-white rounded-[8px] pl-[12px] pr-[40px] py-[12px] gap-[4px] focus:outline-none focus:ring-1 focus:ring-neutral-400 w-full 2xl:w-[360px] focus:caret-neutral-400"
                        />
                        {isLoading ? (
                            <Spinner className="absolute right-3 top-1/2 -translate-y-1/2 w-[22px] h-[22px] text-neutral-600" />
                        ) : (
                            <Search
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-[22px] h-[22px] text-neutral-600"
                                strokeWidth={1}
                            />)}


                        {showSuggestion && hasSearched && (
                            <SearchSuggestion
                                suggestions={suggestionPosts}
                                onClick={() => {
                                    setSearchKeyword("");
                                    setShowSuggestion(false);
                                }}
                            />
                        )}
                    </div>

                    {/*catagory for mobile */}
                    <CategorySelect
                        categories={categories}
                        value={selectedCategory}
                        onClick={(category) => {
                            setSelectedCategory(category);
                            setPage(1);
                            setIsRefreshing(true);

                        }}
                    />
                </div>
            </div>

            {/*blog post */}
            <div className="flex flex-col w-full 2xl:grid 2xl:grid-cols-2 2xl:justify-items-stretch pt-[24px] px-[16px] 2xl:px-0 gap-[48px] 2xl:gap-[20px] caret-transparent">
                <>

                    {(posts ?? []).map((blog) => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            image={blog.image}
                            category={blog.category}
                            title={blog.title}
                            description={blog.description}
                            author={blog.author}
                            date={formatDateEn(blog.created_at)}
                        />
                    ))}
                    {isRefreshing && (
                        <>
                            {Array.from({ length: 6 }).map((_, i) => (
                                <BlogCardSkeleton key={i} />
                            ))}
                        </>
                    )}



                    {hasMore && !isLoading && posts.length > 0 && (
                        <div className="2xl:pt-[80px] h-[10px] col-span-full flex justify-center">
                            <button
                                onClick={handleViewMore}
                                className="text-body-1 text-neutral-600 underline hover:text-neutral-400 hover:cursor-pointer"
                            >
                                View more
                            </button>
                        </div>
                    )}

                    {isLoading && page > 1 && (
                        <div className="2xl:pt-[80px] h-[10px] col-span-full flex justify-center">
                            <Spinner />
                        </div>
                    )}


                    {searchKeyword && !isLoading && posts.length === 0 && (
                        <p className="text-body-1 text-neutral-400 col-span-full text-center pt-[40px] pb-[450px]">
                            No articles match your search
                        </p>
                    )}
                </>
            </div>
        </div>
    )
}

export default ArticleSection