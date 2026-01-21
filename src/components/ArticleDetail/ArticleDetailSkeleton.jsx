const ArticleDetailSkeleton = () => {
    return (
      <article className="flex flex-col w-full 2xl:py-[60px] 2xl:px-[120px] 2xl:mt-[80px] py-[49px] animate-pulse">
  
        {/* Image */}
        <div className="w-full 2xl:h-[587px] h-[184px] bg-neutral-200 rounded-[16px]" />
  
        <div className="2xl:flex 2xl:flex-row 2xl:justify-between 2xl:gap-[80px] px-[16px] 2xl:px-0 pt-[24px]">
  
          {/* LEFT */}
          <div className="flex flex-col 2xl:w-full gap-[24px]">
  
            {/* Title */}
            <div className="h-[36px] w-3/4 bg-neutral-200 rounded-md" />
  
            {/* Meta */}
            <div className="flex gap-4">
              <div className="h-[16px] w-[120px] bg-neutral-200 rounded-md" />
              <div className="h-[16px] w-[80px] bg-neutral-200 rounded-md" />
            </div>
  
            {/* Content */}
            <div className="flex flex-col gap-3">
              <div className="h-[16px] bg-neutral-200 rounded" />
              <div className="h-[16px] bg-neutral-200 rounded" />
              <div className="h-[16px] w-5/6 bg-neutral-200 rounded" />
              <div className="h-[16px] bg-neutral-200 rounded" />
              <div className="h-[16px] w-4/6 bg-neutral-200 rounded" />
            </div>
  
            {/* Actions */}
            <div className="flex gap-4 mt-4">
              <div className="h-[40px] w-[120px] bg-neutral-200 rounded-full" />
              <div className="h-[40px] w-[120px] bg-neutral-200 rounded-full" />
            </div>
  
            {/* Comment */}
            <div className="h-[80px] bg-neutral-200 rounded-lg mt-6" />
          </div>
  
          {/* RIGHT - Author */}
          <div className="hidden 2xl:block w-[320px]">
            <div className="p-4 border border-neutral-200 rounded-lg">
              <div className="h-[64px] w-[64px] bg-neutral-200 rounded-full mb-4" />
              <div className="h-[16px] w-2/3 bg-neutral-200 rounded mb-2" />
              <div className="h-[14px] w-full bg-neutral-200 rounded" />
            </div>
          </div>
  
        </div>
      </article>
    );
  };
  
  export default ArticleDetailSkeleton;
  