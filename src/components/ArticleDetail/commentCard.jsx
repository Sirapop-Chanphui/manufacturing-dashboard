import React from "react";

const DEFAULT_AVATAR =
    "data:image/svg+xml," +
    encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="22" fill="#e5e5e5"/><text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="#737373" font-size="14" font-family="system-ui,sans-serif">?</text></svg>`,
    );

function formatCommentDate(iso) {
    if (!iso) return "";
    try {
        const d = new Date(iso);
        const day = d.getDate();
        const month = d.toLocaleString("en-GB", { month: "long" });
        const year = d.getFullYear();
        const hours = String(d.getHours()).padStart(2, "0");
        const minutes = String(d.getMinutes()).padStart(2, "0");
        return `${day} ${month} ${year} at ${hours}:${minutes}`;
    } catch {
        return String(iso);
    }
}

function CommentCard({ comment }) {
    const username = comment.username ?? comment.author ?? "User";
    const text = comment.comment_text ?? comment.content ?? "";
    const dateLabel = comment.created_at
        ? formatCommentDate(comment.created_at)
        : comment.date ?? "";
    const avatarSrc = comment.profile_pic ?? comment.avatar ?? DEFAULT_AVATAR;

    return (
        <div className="flex flex-col gap-[16px] pb-[24px] border-b border-neutral-300">
            <div className="flex items-center gap-[12px]">
                <img
                    src={avatarSrc}
                    alt=""
                    className="h-[44px] w-[44px] shrink-0 rounded-full object-cover"
                />

                <div className="flex flex-col">
                    <span className="text-headline-4 text-neutral-500">{username}</span>
                    <span className="text-body-3 text-neutral-400">{dateLabel}</span>
                </div>
            </div>

            <p className="text-body-1 text-neutral-400">{text}</p>
        </div>
    );
}

export default CommentCard;
