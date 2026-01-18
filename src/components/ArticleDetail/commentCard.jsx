import React from "react"

function CommentCard({ comment }) {
  return (
    <div className="flex flex-col gap-[16px] pb-[24px] border-b border-neutral-300">

      {/* header */}
      <div className="flex items-center gap-[12px]">
        
        <img
          src={comment.avatar}
          alt={comment.author}
          className="w-[44px] h-[44px] rounded-full object-cover"
        />

        <div className="flex flex-col">
          <span className="text-headline-4 text-neutral-500">
            {comment.author}
          </span>
          <span className="text-body-3 text-neutral-400">
            {comment.date}
          </span>
        </div>
      </div>

      {/* content */}
      <p className="text-body-1 text-neutral-400 ">
        {comment.content}
      </p>
    </div>
  )
}

export default CommentCard
