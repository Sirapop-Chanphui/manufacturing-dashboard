import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function CategorySelect({ categories, value, onClick }) {
  return (
    <div className="flex flex-col 2xl:hidden text-body-1">
      <p className="text-neutral-400 pb-2 caret-transparent">Category</p>
      <Select value={value} onValueChange={onClick}>
        <SelectTrigger className="h-auto! w-full border border-neutral-300 text-neutral-400 bg-white rounded-[8px] px-[16px] py-[12px] hover:cursor-pointer focus:ring-1 focus:ring-neutral-400">
          <SelectValue
            className="text-neutral-400  data-placeholder:text-neutral-400"
          />
        </SelectTrigger>

        <SelectContent position="popper">
          <SelectGroup>
            <SelectLabel className="text-body-1 text-neutral-600 caret-transparent">
              Category
            </SelectLabel>
            {categories.map((category) => (
              <SelectItem
                key={category}
                value={category}
                className="text-body-1 text-neutral-400 hover:cursor-pointer"
              >
                {category}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default CategorySelect;
