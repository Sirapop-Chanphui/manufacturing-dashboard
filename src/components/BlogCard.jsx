const BlogCard = ({
  image,
  category,
  title,
  description,
  author,
  authorImage,
  date,
}) => {
  return (
    <div className="flex flex-col gap-[16px]">
      {/*1.image section*/}
      <a href="#" className="flex justify-center">
        <img
          src={image}
          alt="blog image"
          className="w-full h-[212px] 2xl:h-[360px] rounded-[16px] object-cover"
        />
      </a>
      {/*2.buttom section*/}
      <div className="flex flex-col gap-[16px]">
        {/*2.1text section*/}
        <div className="flex flex-col gap-[8px]">
          <span className="text-body-2 text-brand-green px-[12px] py-[4px] rounded-full bg-brand-green-light w-fit h-fit">
            {category}
          </span>
          <a href="#">
            <h4 className="text-headline-4 text-neutral-600 2xl:line-clamp-1 hover:line-clamp-2">
              {title}
            </h4>
          </a>
          <span className="text-body-2 text-neutral-400 line-clamp-2">
            {description}
          </span>
        </div>

        {/*2.2author and date section*/}
        <div className=" flex flex-row gap-[16px] ">
          <div className="flex flex-row gap-[8px]">
            <img
              src={authorImage}
              className="w-[24px] h-[24px] rounded-full object-cover"
              alt={author}
            />
            <span className="text-body-2 text-neutral-500">{author}</span>
          </div>

          <div className="h-[18px] w-px bg-neutral-300"></div>
          <span className="text-body-2 text-neutral-400">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
