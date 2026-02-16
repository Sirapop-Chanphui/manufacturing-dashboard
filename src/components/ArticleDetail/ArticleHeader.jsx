import { formatDateEn } from "@/utils/formatDate";

const ArticleHeader = ({ article }) => {
    const dateStr = article?.date ?? article?.created_at;
    return (
        <>
            <div className="flex items-center 2xl:pb-[16px] gap-[16px]">
                <span className="py-[4px] px-[12px] text-body-2 text-brand-green bg-brand-green-light rounded-full">
                    {article.category}
                </span>
                <span className="text-body-1 text-neutral-400">
                {formatDateEn(dateStr)}
                </span>
            </div>

            <h1 className="text-headline-3 text-neutral-600">
                {article.title}
            </h1>
        </>
    );
};

export default ArticleHeader;
