import { useState, useRef } from "react";
import { Search } from "lucide-react";
import { formatDateEn } from "../../utils/formatDate";
import { categories } from "../../data/blogPosts";

import BlogCard from "./BlogCard";
import CategoryTabs from "./CategoryTabs";
import CategorySelect from "./CategorySelect";
import SearchSuggestion from "./SearchSuggestion";
import { useSearch } from "./useSearch";
import { useArticles } from "./useArticles";
import { useClickOutside } from "./useClickOutside";

function ArticleSection() {
  const [selectedCategory, setSelectedCategory] = useState("Highlight");
  const searchRef = useRef(null);

  const { posts, hasMore, isLoading, loadMore } =
    useArticles(selectedCategory);

  const {
    search,
    setSearch,
    filteredPosts,
    suggestions,
    showSuggestion,
    setShowSuggestion,
  } = useSearch(posts);

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
            onSelect={setSelectedCategory}
          />

          {/* wrapper search input + icon */}
          <div ref={searchRef} className="relative w-full 2xl:w-[360px] caret-transparent">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => search && setShowSuggestion(true)}
              className="text-body-1 border border-neutral-300 text-neutral-400 placeholder:text-neutral-400 bg-white rounded-[8px] pl-[12px] pr-[40px] py-[12px] gap-[4px] focus:outline-none focus:ring-1 focus:ring-neutral-400 w-full 2xl:w-[360px] caret-neutral-400"
            />

            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 w-[22px] h-[22px] text-neutral-600"
              strokeWidth={1}
            />

            {showSuggestion && (
              <SearchSuggestion
                results={suggestions}
                onSelect={() => {
                  setSearch("");
                  setShowSuggestion(false);
                }}
              />
            )}
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
      <div className="flex flex-col 2xl:grid 2xl:grid-cols-2 2xl:justify-items-stretch pt-[24px] px-[16px] 2xl:px-0 gap-[48px] 2xl:gap-[20px] caret-transparent">
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

          {isLoading &&  (
            <div className="pt-[80px] pb-[650px] col-span-full flex justify-center">
              <span className="text-body-1 text-neutral-600">
                Loading...
              </span>
            </div>
          )}

          {hasMore && !search && !isLoading && filteredPosts.length > 0 &&(
            <div className="pt-[80px] col-span-full flex justify-center">
              <button
                onClick={loadMore}
                className="text-body-1 text-neutral-600 underline hover:text-neutral-400 hover:cursor-pointer"
              >
                View more
              </button>
            </div>
          )}

          {search && !isLoading && filteredPosts.length === 0 && (
            <p className="text-body-1 text-neutral-400 col-span-full text-center pt-[40px] pb-[450px]">
              No articles match your search
            </p>
          )}
        </>
      </div>
    </div>
  );
}

export default ArticleSection;
