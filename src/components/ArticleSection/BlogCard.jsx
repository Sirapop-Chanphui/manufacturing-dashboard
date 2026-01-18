import { Link } from "react-router-dom";
import men from "../../assets/img/men-and-cat.jpg"

const BlogCard = ({
  image,
  category,
  title,
  description,
  author,
  date,
  id
}) => {
  return (
    <div className="flex flex-col gap-[16px]">
      {/*1.image section*/}
      <Link
        to={`/article/${id}`}
        className="flex justify-center select-none rounded-[16px] overflow-hidden relative"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-[212px] 2xl:h-[360px] object-cover"
        />
        <div className="absolute inset-0 bg-[#87859b40]"></div>
      </Link>
      {/*2.buttom section*/}
      <div className="flex flex-col gap-[16px]">
        {/*2.1text section*/}
        <div className="flex flex-col gap-[8px]">
          <span className="text-body-2 text-brand-green px-[12px] py-[4px] rounded-full bg-brand-green-light w-fit h-fit">
            {category}
          </span>
          <Link to={`/article/${id}`}>
            <h4 className="text-headline-4 text-neutral-600 2xl:line-clamp-1 hover:line-clamp-2">
              {title}
            </h4>
          </Link>
          <span className="text-body-2 text-neutral-400 line-clamp-2">
            {description}
          </span>
        </div>

        {/*2.2author and date section*/}
        <div className=" flex flex-row gap-[16px] ">
          <div className="flex flex-row gap-[8px]">
            <img
              src={men}
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
