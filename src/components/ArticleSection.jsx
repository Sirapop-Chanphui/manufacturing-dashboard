import { Search } from "lucide-react";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BlogCard from "./BlogCard";
import { blogPosts } from "@/data/blogPosts";

const categories = [
  "All",
  "Production",
  "Quality",
  "Maintenance",
  "Planning",
  "Safety",
  "Utility",
];


function ArticleSection() {
  return (
    <div className="flex flex-col items-center 2xl:pt-[60px] pb-[80px] 2xl:pb-[120px] 2xl:px-[120px] bg-neutral-100">
      <div className="flex flex-col items-start w-full">
        <p className="text-headline-3 p-[16px] 2xl:p-0 2xl:pb-[32px] text-neutral-600">
          Latest articles
        </p>
        <div className="w-full flex flex-col 2xl:flex-row 2xl:justify-between p-[16px] gap-[16px] bg-neutral-200 rounded-[16px]">
          {/*catagory for destop */}
          <div className="hidden 2xl:flex 2xl:flex-row justify-space-between gap-[8px]">
            {categories.map((category) => {
              return (
                <p
                  key={category}
                  className="py-[12px] px-[20px] text-neutral-400 hover:text-neutral-500 hover:bg-neutral-300 hover:rounded-[8px] hover:cursor-pointer"
                >
                  {category}
                </p>
              );
            })}
          </div>

          {/* wrapper search input + icon */}
          <div className="relative w-full 2xl:w-[360px]">
            <input
              type="text"
              placeholder="Search"
              className="text-body-1 border border-neutral-300 text-neutral-400  placeholder:text-neutral-400 bg-white rounded-[8px] pl-[12px] pr-[40px] py-[12px] gap-[4px] focus:outline-none focus:ring-1 focus:ring-neutral-400 w-full 2xl:w-[360px]"
            />
            {/* icon 1*/}
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2  w-[22px]  h-[22px] text-neutral-600"
              strokeWidth={1}
            />
          </div>

          {/*catagory for mobile */}
          <div className="flex flex-col 2xl:hidden text-body-1">
            <p className=" text-neutral-400"> Category </p>
            <Select>
              <SelectTrigger className=" !h-auto w-full  border border-neutral-300 text-neutral-400  bg-white rounded-[8px] pl-[16px] pr-[12px] py-[12px] gap-[4px] focus:outline-none focus:ring-1 focus:ring-neutral-400 ">
                <SelectValue
                  placeholder="All"
                  className="text-neutral-400  data-[placeholder]:text-neutral-400"
                />
              </SelectTrigger>

              <SelectContent position="popper">
                <SelectGroup>
                  <SelectLabel className="text-body-1 text-neutral-600">
                    Category
                  </SelectLabel>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.toLowerCase()}
                      value={category.toLowerCase()}
                      className="text-body-1 text-neutral-400"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/*blog post */}
      <div className="flex flex-col 2xl:grid 2xl:grid-cols-2 2xl:justify-items-stretch pt-[24px] px-[16px] 2xl:px-0 pb-[80px] gap-[48px] 2xl:gap-[20px]">
        {blogPosts.map((blog) => (
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
      </div>

      <button className="text-body-1 text-neutral-600 underline hover:text-neutral-400 hover:cursor-pointer w-fit h-fit">
        View more
      </button>
    </div>
  );
}

export default ArticleSection;
