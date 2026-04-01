import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Button from "../common/Button";
import drag from "../../assets/icons/icon-drag.svg";
import CommentCard from "./commentCard";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const COMMENTS_PAGE_SIZE = 3;

function parseCommentsPayload(axiosResponse) {
    const raw = axiosResponse?.data?.data ?? axiosResponse?.data ?? {};
    const list = raw.comments ?? [];
    return {
        comments: Array.isArray(list) ? list : [],
        totalComments: raw.totalComments ?? 0,
        totalPages: raw.totalPages ?? 1,
        currentPage: raw.currentPage ?? 1,
        limit: raw.limit ?? COMMENTS_PAGE_SIZE,
        nextPage: raw.nextPage ?? null,
    };
}

function ArticleCommentSection({ articleId, isAuthenticated, onRequireLogin }) {
    const textareaRef = useRef(null);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [nextPage, setNextPage] = useState(null);
    const [totalComments, setTotalComments] = useState(0);

    const requireAuth = useCallback(() => {
        onRequireLogin?.();
    }, [onRequireLogin]);

    const fetchComments = useCallback(
        async (page, append) => {
            if (!articleId) return;
            const isAppend = Boolean(append);
            try {
                if (isAppend) {
                    setLoadingMore(true);
                } else {
                    setLoading(true);
                }
                const res = await axios.get(
                    `${API_BASE_URL}/posts/${articleId}/comments`,
                    { params: { page, limit: COMMENTS_PAGE_SIZE } },
                );
                const parsed = parseCommentsPayload(res);
                setComments((prev) =>
                    isAppend ? [...prev, ...parsed.comments] : parsed.comments,
                );
                setNextPage(parsed.nextPage);
                setTotalComments(parsed.totalComments);
            } catch {
                if (!isAppend) {
                    setComments([]);
                }
                toast.error("Failed to load comments");
            } finally {
                if (isAppend) {
                    setLoadingMore(false);
                } else {
                    setLoading(false);
                }
            }
        },
        [articleId],
    );

    useEffect(() => {
        setCommentText("");
        fetchComments(1, false);
    }, [fetchComments]);

    const handleSend = async () => {
        if (!isAuthenticated) {
            requireAuth();
            return;
        }
        const trimmed = commentText.trim();
        if (!trimmed) {
            toast.error("Please enter a comment");
            return;
        }
        try {
            setSubmitting(true);
            await axios.post(`${API_BASE_URL}/posts/${articleId}/comments`, {
                comment_text: trimmed,
            });
            toast.success("Comment posted");
            setCommentText("");
            await fetchComments(1, false);
        } catch (err) {
            toast.error(err.response?.data?.message ?? "Failed to post comment");
        } finally {
            setSubmitting(false);
        }
    };

    const handleLoadMore = () => {
        if (nextPage == null || loadingMore) return;
        fetchComments(nextPage, true);
    };

    const handleCommentAreaClick = () => {
        if (!isAuthenticated) {
            requireAuth();
        }
    };

    return (
        <div className="flex flex-col px-[16px] pb-[40px] pt-[24px]">
            <div className="flex flex-col">
                <label className="text-body-1 text-neutral-400" htmlFor="article-comment-input">
                    Comment
                </label>
                <div
                    className="relative mb-[12px] mt-[8px]"
                    onClick={handleCommentAreaClick}
                    onKeyDown={(e) => {
                        if (!isAuthenticated && (e.key === "Enter" || e.key === " ")) {
                            e.preventDefault();
                            requireAuth();
                        }
                    }}
                    role={isAuthenticated ? undefined : "button"}
                    tabIndex={isAuthenticated ? undefined : 0}
                >
                    <textarea
                        id="article-comment-input"
                        ref={textareaRef}
                        value={commentText}
                        onChange={(e) => {
                            if (isAuthenticated) setCommentText(e.target.value);
                        }}
                        readOnly={!isAuthenticated}
                        placeholder={
                            isAuthenticated
                                ? "What are your thoughts?"
                                : "Log in to leave a comment"
                        }
                        rows={3}
                        className="min-h-[102px] w-full resize-none rounded-[8px] border border-neutral-300 bg-white p-[12px] pr-[40px] text-body-1 text-neutral-600 placeholder:text-neutral-400 focus:border-neutral-600 focus:outline-none read-only:cursor-pointer read-only:bg-neutral-50"
                    />
                    <img
                        src={drag}
                        alt=""
                        className="pointer-events-none absolute bottom-[12px] right-[8px] w-[28px]"
                    />
                </div>
            </div>
            <div>
                <Button
                    onClick={handleSend}
                    buttonText={submitting ? "Sending…" : "Send"}
                    buttonStyle="primary"
                    disabled={submitting}
                />
            </div>

            <div className="mt-[24px] flex flex-col gap-2">
                {totalComments > 0 && (
                    <p className="text-body-2 text-neutral-500">
                        {totalComments} {totalComments === 1 ? "comment" : "comments"}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-[44px] pt-[44px]">
                {loading ? (
                    <p className="text-body-2 text-neutral-400">Loading comments…</p>
                ) : comments.length === 0 ? (
                    <p className="text-body-2 text-neutral-400">No comments yet.</p>
                ) : (
                    comments.map((comment) => (
                        <CommentCard key={comment.id} comment={comment} />
                    ))
                )}
            </div>

            {nextPage != null && !loading && (
                <div className="pt-[24px]">
                    <Button
                        onClick={handleLoadMore}
                        buttonText={loadingMore ? "Loading…" : "Load more"}
                        buttonStyle="secondary"
                        disabled={loadingMore}
                    />
                </div>
            )}
        </div>
    );
}

export default ArticleCommentSection;
