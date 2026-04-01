import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Button from "../common/Button";
import { Heart, Copy } from "lucide-react";
import facebook from "../../assets/icons/icon-facebook.svg";
import linkedin from "../../assets/icons/icon-linkedin.svg";
import x from "../../assets/icons/icon-x.svg";
import { useAuth } from "@/context/authentication";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function parseLikePayload(res) {
    return res?.data?.data ?? res?.data ?? {};
}

function ArticleActions({ articleId, likes: initialLikes, onCopy, onRequireLogin }) {
    const { isAuthenticated } = useAuth();
    const articleUrl = encodeURIComponent(window.location.href);

    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(initialLikes ?? 0);
    const [likeLoading, setLikeLoading] = useState(false);
    const [statusLoading, setStatusLoading] = useState(true);

    useEffect(() => {
        setLikesCount(initialLikes ?? 0);
    }, [initialLikes, articleId]);

    useEffect(() => {
        if (articleId == null) return;
        setIsLiked(false);
        let cancelled = false;
        (async () => {
            try {
                setStatusLoading(true);
                const res = await axios.get(`${API_BASE_URL}/posts/${articleId}/like-status`);
                const payload = parseLikePayload(res);
                if (!cancelled) setIsLiked(Boolean(payload.isLiked));
            } catch {
                if (!cancelled) setIsLiked(false);
            } finally {
                if (!cancelled) setStatusLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [articleId, isAuthenticated]);

    const handleLike = async () => {
        if (!isAuthenticated) {
            toast.info("Please log in to like this article");
            onRequireLogin?.();
            return;
        }
        try {
            setLikeLoading(true);
            const res = await axios.post(`${API_BASE_URL}/posts/${articleId}/like`);
            const payload = parseLikePayload(res);
            setIsLiked(Boolean(payload.isLiked));
            if (typeof payload.likes_count === "number") {
                setLikesCount(payload.likes_count);
            }
        } catch (err) {
            toast.error(err.response?.data?.message ?? "Could not update like");
        } finally {
            setLikeLoading(false);
        }
    };

    const handleShare = (platform) => {
        let shareUrl = "";

        switch (platform) {
            case "facebook":
                shareUrl = `https://www.facebook.com/share.php?u=${articleUrl}`;
                break;
            case "linkedin":
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${articleUrl}`;
                break;
            case "x":
                shareUrl = `https://www.twitter.com/share?&url=${articleUrl}`;
                break;
            default:
                return;
        }

        window.open(shareUrl, "_blank", "noopener,noreferrer");
    };

    const likedVisual = isLiked && !statusLoading;

    return (
        <div className="flex h-[152px] w-full flex-col bg-neutral-200 2xl:h-[80px] 2xl:rounded-[16px]">
            <div className="flex flex-col gap-[24px] p-[16px] 2xl:flex-row 2xl:justify-between">
                <button
                    type="button"
                    onClick={handleLike}
                    disabled={likeLoading || articleId == null}
                    aria-pressed={likedVisual}
                    aria-label={likedVisual ? "Unlike this article" : "Like this article"}
                    className={`flex flex-row items-center justify-center gap-[6px] rounded-full border py-[12px] px-[40px] text-body-1 transition-colors hover:cursor-pointer hover:underline disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:no-underline ${
                        likedVisual
                            ? "border-neutral-600 bg-neutral-600 text-white hover:border-neutral-500 hover:bg-neutral-500 hover:text-white"
                            : "border border-neutral-400 bg-white text-neutral-600 hover:text-neutral-400"
                    }`}
                >
                    <Heart
                        size={24}
                        strokeWidth={1.5}
                        className={`relative -top-px shrink-0 ${likedVisual ? "fill-white text-white" : ""}`}
                        aria-hidden
                    />
                    {likeLoading ? "…" : likesCount}
                </button>
                <div className="flex flex-row items-center justify-center gap-[8px]">
                    <Button onClick={onCopy} buttonText="Copy link" buttonStyle="secondary" icon={Copy} px="px-[28px]" />
                    <button
                        type="button"
                        onClick={() => handleShare("facebook")}
                        className="h-[48px] w-[48px] hover:cursor-pointer hover:opacity-80"
                    >
                        <img src={facebook} alt="Share to Facebook" />
                    </button>

                    <button
                        type="button"
                        onClick={() => handleShare("linkedin")}
                        className="h-[48px] w-[48px] hover:cursor-pointer hover:opacity-80"
                    >
                        <img src={linkedin} alt="Share to LinkedIn" />
                    </button>

                    <button
                        type="button"
                        onClick={() => handleShare("x")}
                        className="h-[48px] w-[48px] hover:cursor-pointer hover:opacity-80"
                    >
                        <img src={x} alt="Share to X" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ArticleActions;
