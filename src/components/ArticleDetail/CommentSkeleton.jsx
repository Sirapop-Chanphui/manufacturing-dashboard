import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

function CommentSkeleton() {
  return (
    <div className="flex flex-col gap-[16px] pb-[24px] border-b border-neutral-300">
      <div className="flex items-center gap-[12px]">
        <Skeleton className="w-[44px] h-[44px] rounded-full bg-neutral-300" />
        <div className="flex flex-col gap-[4px]">
          <Skeleton className="h-[18px] w-[120px] bg-neutral-300" />
          <Skeleton className="h-[14px] w-[80px] bg-neutral-300" />
        </div>
      </div>
      <div className="flex flex-col gap-[8px]">
        <Skeleton className="h-[16px] w-full bg-neutral-300" />
        <Skeleton className="h-[16px] w-4/5 bg-neutral-300" />
      </div>
    </div>
  )
}

export default CommentSkeleton
