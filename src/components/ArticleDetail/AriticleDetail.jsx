import { useEffect, useState } from "react";
import axios from "axios";
import ArticleHeader from "./ArticleHeader";
import ArticleContent from "./ArticleContent";
import AuthorCard from "./AuthorCard";
import ArticleActions from "./ArticleActions";
import ArticleCommentSection from "./ArticleCommentSection";

import LoginRequiredDialog from "../common/LoginRequiredDialog"
import { toast } from "sonner"

const ArticleDetail = ({ articleId }) => {
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showLoginDialog, setShowLoginDialog] = useState(false)

    const isLoggedIn = false

    const handleLike = () => {
        if (!isLoggedIn) {
            setShowLoginDialog(true)
            return
        }
    }

    const handleComment = () => {
        if (!isLoggedIn) {
            setShowLoginDialog(true)
            return
        }
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.custom((t) => (
                <div className="flex w-fit items-start gap-[12px] rounded-[8px] bg-brand-green p-4 shadow-lg relative">


                    <div className="flex flex-col gap-1">
                        <p className="text-headline-4 text-white">
                            Copied!
                        </p>
                        <p className="text-body-2 text-white">
                            Thsi article has been copied to your clipboard.
                        </p>
                    </div>
                    <button
                        onClick={() => toast.dismiss(t)}
                        className="absolute top-4 right-6 text-white opacity-80 hover:opacity-100"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>
            ), {
                duration: 5000, 
            });
        } catch (err) {
            toast.error("Failed to copy link");
        }
    };

    useEffect(() => {
        if (!isLoading) {
            window.scrollTo(0, 0);
        }
    }, [isLoading]);



    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(
                    `https://blog-post-project-api.vercel.app/posts/${articleId}`
                );
                setArticle(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticle();
    }, [articleId]);

    if (isLoading) return <p className="py-[320px] 2xl:py-[500px] text-center">Loading article...</p>;
    if (error) return <p className="py-[320px] 2xl:py-[500px] text-center">{error}</p>;

    return (
        <article className="flex flex-col w-full 2xl:py-[60px] 2xl:px-[120px] 2xl:mt-[80px] py-[49px]">

            <div className="w-full 2xl:h-[587px] h-[184px] 2xl:rounded-[16px] overflow-hidden relative">
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full 2xl:h-[587px] h-[184px] object-cover"
                />
                <div className="absolute inset-0 bg-[#87859b40] opacity-10 "></div>
            </div>

            <div className="2xl:flex 2xl:flex-row 2xl:justify-between 2xl:gap-[80px] 2xl:px-0 px-[16px] pt-[24px]">

                {/* LEFT */}
                <div className="flex flex-col 2xl:w-full gap-[24px]">
                    <ArticleHeader article={article} />
                    <ArticleContent content={article.content} />

                    <div className="-mx-[16px] 2xl:m-0">
                        <ArticleActions
                            onLike={handleLike}
                            onCopy={handleCopy}
                            articleId={article.id}
                        />
                    </div>

                    <ArticleCommentSection onClick={handleComment} />
                </div>

                {/* RIGHT */}
                <AuthorCard author={article.author} />
            </div>

            <LoginRequiredDialog
                open={showLoginDialog}
                onOpenChange={setShowLoginDialog}
            />
        </article>



    );
};

export default ArticleDetail;

