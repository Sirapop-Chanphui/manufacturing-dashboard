const BlogCardLayout = ({
    image,
    category,
    title,
    description,
    author,
    date,
  }) => {
    return (
      <div className="flex flex-col gap-[16px] w-full ">
        {/* image */}
        <div className="flex justify-center select-none rounded-[16px] overflow-hidden relative">
          {image}
        </div>
  
        {/* bottom */}
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            {category}
            {title}
            {description}
          </div>
  
          <div className="flex flex-row items-center gap-[16px]">
            <div className="flex items-center gap-[8px]">
              {author}
            </div>
  
            <div className="h-[18px] w-px bg-neutral-300" />
  
            {date}
          </div>
        </div>
      </div>
    );
  };
  
  export default BlogCardLayout;
  