import React from "react";
import ProfileAvatar from "@/components/common/ProfileAvatar";

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
    const rawPic = comment.profile_pic ?? comment.avatar;
    const avatarImageUrl =
        rawPic && String(rawPic).trim() !== "" ? rawPic : null;

    return (
        <div className="flex flex-col gap-[16px] pb-[24px] border-b border-neutral-300">
            <div className="flex items-center gap-[12px]">
                <ProfileAvatar
                    imageUrl={avatarImageUrl}
                    alt={`${username} profile picture`}
                    size={44}
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
