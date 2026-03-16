import men from "../../assets/img/men-and-cat.jpg";

const AuthorCard = ({ author }) => {
  return (
    <div className="flex flex-col 2xl:w-[305px] 2xl:h-fit bg-neutral-200 p-[24px] rounded-[16px] gap-[20px] 2xl:sticky  2xl:top-[100px]">
      <div className="flex gap-[12px]">
        <img
          src={men}
          className="w-[44px] h-[44px] rounded-full object-cover"
          alt={author}
        />
        <div className="flex flex-col">
          <span className="text-body-3 text-neutral-500">Author</span>
          <span className="text-headline-4 text-neutral-500">
            {author}
          </span>
        </div>
      </div>

      <div className="bg-neutral-300 w-full h-px" />

      <p className="text-body-1 text-neutral-400">
        I am a pet enthusiast and freelance writer who specializes in animal
        behavior and care. With a deep love for cats, I enjoy sharing insights
        on feline companionship and wellness.
      </p>

      <p className="text-body-1 text-neutral-400">
        When I'm not writing, I spend time volunteering at my local animal
        shelter, helping cats find loving homes.
      </p>
    </div>
  );
};

export default AuthorCard;
