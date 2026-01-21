import { Link } from "react-router-dom";
import BlogCardLayout from "./ฺBlogCardLayout";
import men from "../../../assets/img/men-and-cat.jpg";

const BlogCard = ({
  id,
  image,
  category,
  title,
  description,
  author,
  date,
}) => {
  return (
    <BlogCardLayout
      image={
        <Link to={`/article/${id}`} className="w-full relative">
          <img
            src={image}
            alt={title}
            className="w-full h-[212px] 2xl:h-[360px] object-cover"
          />
          <div className="absolute inset-0 bg-[#87859b40] hover:opacity-50" />
        </Link>
      }
      category={
        <span className="text-body-2 text-brand-green px-[12px] py-[4px] rounded-full bg-brand-green-light w-fit">
          {category}
        </span>
      }
      title={
        <Link to={`/article/${id}`}>
          <h4 className="text-headline-4 text-neutral-600 line-clamp-2">
            {title}
          </h4>
        </Link>
      }
      description={
        <span className="text-body-2 text-neutral-400 line-clamp-2">
          {description}
        </span>
      }
      author={
        <>
          <img
            src={men}
            className="w-[24px] h-[24px] rounded-full object-cover"
            alt={author}
          />
          <span className="text-body-2 text-neutral-500">{author}</span>
        </>
      }
      date={
        <span className="text-body-2 text-neutral-400">{date}</span>
      }
    />
  );
};

export default BlogCard;
