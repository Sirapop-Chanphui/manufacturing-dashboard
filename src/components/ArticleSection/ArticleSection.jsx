import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { formatDateEn } from "../../utils/formatDate";
import { categories } from "../../data/blogPosts";
import { getFilteredBlogs } from "../../utils/getFilterBlogs";
import BlogCard from "./BlogCard";
import CategoryTabs from "./CategoryTabs";
import CategorySelect from "./CategorySelect";
import axios from "axios";

function ArticleSection() {
  const [selectedCategory, setSelectedCategory] = useState("Highlight");
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState("");



  useEffect(() => {
    setIsLoading(true)
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`https://blog-post-project-api.vercel.app/posts?page=${page}&limit=6&${selectedCategory !== "Highlight" ? `&category=${selectedCategory}` : ""}`)
        if (page === 1) {
          setPosts(response.data.posts);
        } else {
          setPosts((prev) => [...prev, ...response.data.posts]);
        }

        if (response.data.currentPage >= response.data.totalPages) {
          setHasMore(false);
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }

    fetchPosts()
  }, [page, selectedCategory])

  useEffect(() => {
    if (search === "") {
      setHasMore(true);
    }
  }, [search]);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [selectedCategory]);



  const filteredPosts = getFilteredBlogs({
    blogPosts: posts,
    search,
    selectedCategory,
  });


  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setPage(1);
    setHasMore(true);
  };




  return (
    <div className="flex flex-col items-center 2xl:pt-[60px] pb-[80px] 2xl:pb-[120px] 2xl:px-[120px] bg-neutral-100">
      <div className="flex flex-col items-start w-full caret-transparent">
        <p className="text-headline-3 p-[16px] 2xl:p-0 2xl:pb-[32px] text-neutral-600">
          Latest articles
        </p>
        <div className="w-full flex flex-col 2xl:flex-row 2xl:justify-between p-[16px] gap-[16px] bg-neutral-200 rounded-[16px]">
          {/*catagory for destop */}
          <CategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={handleSelectCategory}
          />

          {/* wrapper search input + icon */}
          <div className="relative w-full 2xl:w-[360px]">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-body-1 border border-neutral-300 text-neutral-400  placeholder:text-neutral-400 bg-white rounded-[8px] pl-[12px] pr-[40px] py-[12px] gap-[4px] focus:outline-none focus:ring-1 focus:ring-neutral-400 w-full 2xl:w-[360px]"
            />
            {/* icon*/}
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2  w-[22px]  h-[22px] text-neutral-600"
              strokeWidth={1}
            />
          </div>

          {/*catagory for mobile */}
          <CategorySelect
            categories={categories}
            value={selectedCategory}
            onChange={handleSelectCategory}
          />
        </div>
      </div>

      {/*blog post */}
      <div className="flex flex-col 2xl:grid 2xl:grid-cols-2 2xl:justify-items-stretch pt-[24px] px-[16px] 2xl:px-0 gap-[48px] 2xl:gap-[20px]">

        <>
          {filteredPosts.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              image={blog.image}
              category={blog.category}
              title={blog.title}
              description={blog.description}
              author={blog.author}
              date={formatDateEn(blog.date)}
            />
          ))}

          {/* ปุ่ม View more แสดงเฉพาะเมื่อมีบทความ */}
          {hasMore && search === "" && (
            <div className={`pt-[80px] col-span-full flex justify-center ${isLoading ? "pb-[650px]" : ""}`}>
              <button
                onClick={handleLoadMore}
                className="text-body-1 text-neutral-600 underline hover:text-neutral-400"
              >
                {isLoading ? "Loading..." : "View more"}
              </button>
            </div>
          )}

          {filteredPosts.length === 0 && (
            <p className="text-body-1 text-neutral-400 col-span-full text-center pt-[40px]">
              No articles match your search
            </p>
          )}

        </>

      </div>
    </div>
  );
}

export default ArticleSection;
