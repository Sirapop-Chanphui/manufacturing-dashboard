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
    const [isLoading, setIsLoading] = useState(false);
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
            toast.success("Link copied to clipboard");
        } catch (err) {
            toast.error("Failed to copy link");
        }
    };




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

    if (isLoading) return <p>Loading article...</p>;
    if (error) return <p>{error}</p>;
    if (!article) return null;

    return (
        <article className="flex flex-col w-full 2xl:py-[60px] 2xl:px-[120px] 2xl:mt-[80px] py-[49px]">
            <img
                src={article.image}
                alt={article.title}
                className="w-full 2xl:h-[587px] h-[184px] object-cover"
            />

            <div className="2xl:flex 2xl:flex-row 2xl:justify-between 2xl:gap-[80px] px-[16px] pt-[24px]">

                {/* LEFT */}
                <div className="flex flex-col 2xl:w-[815px] gap-[24px]">
                    <ArticleHeader article={article} />
                    <ArticleContent content={article.content} />

                    <div className="-mx-[16px] 2xl:m-0">
                        <ArticleActions
                            onLike={handleLike}
                            onCopy={handleCopy}
                            articleId={article.id}
                        />
                    </div>

                    <ArticleCommentSection onSubmit={handleComment} />
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

