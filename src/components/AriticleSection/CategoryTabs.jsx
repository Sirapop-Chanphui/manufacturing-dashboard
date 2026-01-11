function CategoryTabs({ categories, selectedCategory, onSelect }) {
    return (
      <div className="hidden 2xl:flex gap-[8px] select-none">
        {categories.map((category) => { 
          const isSelected = selectedCategory === category;
  
          return (
            <p
              key={category}
              onClick={() => onSelect(category)}
              className={`
                py-[12px] px-[20px] rounded-[8px]
                ${
                  isSelected
                    ? "bg-neutral-300 text-neutral-500 pointer-events-none"
                    : "text-neutral-400 hover:text-neutral-500 hover:bg-neutral-300 cursor-pointer"
                }
              `}
            >
              {category}
            </p>
          );
        })}
      </div>
    );
  }
  
  export default CategoryTabs;
   