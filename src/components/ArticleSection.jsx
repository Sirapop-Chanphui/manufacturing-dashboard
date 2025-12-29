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

function ArticleSection() {
  return (
    <div className="flex flex-col md:pt-[60px] md:pb-[120px] md:px-[120px]">
      <p className="text-headline-3 p-[16px] md:p-0 md:pb-[32px] text-brown-600">
        Latest articles
      </p>

      <div className="flex flex-col md:flex-row md:justify-between p-[16px] gap-[16px] bg-brown-200 rounded-[16px]">
        {/*catagory for destop */}
        <div className="hidden md:flex md:flex-row justify-space-between gap-[8px]">
          <p className="py-[12px] px-[20px] text-brown-400 hover:text-brown-500 hover:bg-brown-300 hover:rounded-[8px] hover:">
            Awards
          </p>
          <p className="py-[12px] px-[20px] text-brown-400 hover:text-brown-500 hover:bg-brown-300 hover:rounded-[8px]">
            Gamba
          </p>
          <p className="py-[12px] px-[20px] text-brown-400 hover:text-brown-500 hover:bg-brown-300 hover:rounded-[8px]">
            Audit
          </p>
          <p className="py-[12px] px-[20px] text-brown-400 hover:text-brown-500 hover:bg-brown-300 hover:rounded-[8px]">
            Issue
          </p>
        </div>

        {/* wrapper search input + icon */}
        <div className="relative w-full md:w-[360px]">
          <input
            type="text"
            placeholder="Search"
            className="text-body-1 border border-brown-300 text-brown-400  placeholder:text-brown-400 bg-white rounded-[8px] pl-[12px] pr-[40px] py-[12px] gap-[4px] focus:outline-none focus:ring-1 focus:ring-brown-400 w-full md:w-[360px]"
          />
          {/* icon 1*/}
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2  w-[24px]  h-[24px] text-brown-400"
            strokeWidth={1}
          />
        </div>

        {/*catagory for mobile */}
        <div className="flex flex-col md:hidden">
          <p className="text-body-1 text-brown-400"> Category </p>
          <Select>
            <SelectTrigger className=" !h-auto w-full text-body-1 border border-brown-300 text-brown-400  bg-white rounded-[8px] pl-[16px] pr-[12px] py-[12px] gap-[4px] focus:outline-none focus:ring-1 focus:ring-brown-400 ">
              <SelectValue
                placeholder="Highlight"
                className="text-brown-400 text-body-1 data-[placeholder]:text-brown-400"
              />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="Awards">Awards</SelectItem>
                <SelectItem value="gamba">Gamba</SelectItem>
                <SelectItem value="audit">Audit</SelectItem>
                <SelectItem value="minor problem">Issue</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

export default ArticleSection;