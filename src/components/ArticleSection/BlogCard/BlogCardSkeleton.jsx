import { Skeleton } from "@/components/ui/skeleton";
import BlogCardLayout from "./ฺBlogCardLayout";
import man from "../../../assets/img/men-and-cat.jpg";

const BlogCardSkeleton = () => {
  return (
    <BlogCardLayout
      image={
        <Skeleton className="w-full h-[212px] 2xl:h-[360px] bg-neutral-300" />
      }
      category={
        <Skeleton className="h-[24px] w-[80px] rounded-full bg-neutral-300" />
      }
      title={
        <Skeleton className="h-[28px] w-3/4 bg-neutral-300" />
      }
      description={
        <>
          <Skeleton className="h-[16px] w-full bg-neutral-300" />
          <Skeleton className="h-[16px] w-5/6 bg-neutral-300" />
        </>
      }
      author={
        <>
          <img
            src={man}
            className="w-[24px] h-[24px] rounded-full object-cover"
            alt="author image"
          />
          <Skeleton className="h-[14px] w-[80px] bg-neutral-300" />
          <>
         
        </>
        </>
      }
      date={
        <Skeleton className="h-[14px] w-[70px] bg-neutral-300" />
      }
    />
  );
};

export default BlogCardSkeleton;
