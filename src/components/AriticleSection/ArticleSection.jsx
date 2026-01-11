import { useState } from "react";
import { Search } from "lucide-react";
import BlogCard from "./BlogCard";
import { blogPosts } from "@/data/blogPosts";
import CategoryTabs from "./CategoryTabs";
import CategorySelect from "./CategorySelect";

const categories = [
  "All",
  "Production",
  "Quality",
  "Maintenance",
  "Planning",
  "Safety",
  "Utility",
];

function getSearchScore(blog, keyword) {
  if (!keyword) return 1;

  const k = keyword.toLowerCase();
  let score = 0;

  if (blog.title.toLowerCase().includes(k)) score += 5;
  if (blog.description.toLowerCase().includes(k)) score += 3;
  if (blog.content.toLowerCase().includes(k)) score += 2;
  if (blog.category.toLowerCase().includes(k)) score += 1.5;
  if (blog.author.toLowerCase().includes(k)) score += 1;

  return score;
}

function ArticleSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredBlogs = blogPosts
    .map((blog) => {
      const score = getSearchScore(blog, search);

      const matchCategory =
        selectedCategory === "All" || blog.category === selectedCategory;

      return {
        ...blog,
        _score: score,
        _matchCategory: matchCategory,
      };
    })
    .filter((blog) => blog._matchCategory && (search === "" || blog._score > 0))
    .sort((a, b) => b._score - a._score);

  return (
    <div className="flex flex-col items-center 2xl:pt-[60px] pb-[80px] 2xl:pb-[120px] 2xl:px-[120px] bg-neutral-100">
      <div className="flex flex-col items-start w-full select-none">
        <p className="text-headline-3 p-[16px] 2xl:p-0 2xl:pb-[32px] text-neutral-600">
          Latest articles
        </p>
        <div className="w-full flex flex-col 2xl:flex-row 2xl:justify-between p-[16px] gap-[16px] bg-neutral-200 rounded-[16px]">
          {/*catagory for destop */}
          <CategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
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
            onChange={setSelectedCategory}
          />
        </div>
      </div>

      {/*blog post */}
      <div className="flex flex-col 2xl:grid 2xl:grid-cols-2 2xl:justify-items-stretch pt-[24px] px-[16px] 2xl:px-0 gap-[48px] 2xl:gap-[20px]">
        {filteredBlogs.length > 0 ? (
          <>
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                image={blog.image}
                category={blog.category}
                title={blog.title}
                description={blog.description}
                author={blog.author}
                authorImage={blog.authorImage}
                date={blog.date}
              />
            ))}

            {/* ปุ่ม View more แสดงเฉพาะเมื่อมีบทความ */}
            <div className="pt-[80px] col-span-full flex justify-center">
              <button className="text-body-1 text-neutral-600 underline hover:text-neutral-400 hover:cursor-pointer w-fit h-fit">
                View more
              </button>
            </div>
          </>
        ) : (
          <p className="pt-[80px] text-neutral-400 text-center col-span-full">
            No articles found
          </p>
        )}
      </div>
    </div>
  );
}

export default ArticleSection;
