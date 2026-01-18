import React, { useRef } from 'react'
import Button from '../common/Button'
import drag from "../../assets/icons/icon-drag.svg"
import {comments} from"../../data/comments"
import CommentCard from './commentCard'

function ArticleCommentSection({ onSubmit }) {
    const textareaRef = useRef(null)

    const handleInput = (e) => {
        const el = textareaRef.current
        el.style.height = 'auto'
        el.style.height = el.scrollHeight + 'px'
    }

    return (
        <div className='flex flex-col pt-[24px] px-[16px] pb-[40px]'>

            <div className='flex flex-col '>
                <label className='text-body-1 text-neutral-400'>Comment</label>
                <div className="relative mt-[8px] mb-[12px]">
                    <textarea
                        ref={textareaRef}
                        placeholder="What are your thoughts?"
                        onInput={handleInput}
                        rows={3}
                        className=" w-full min-h-[102px] resize-none rounded-[8px] border border-neutral-300 bg-white p-[12px] pr-[40px] text-body-1 text-neutral-600 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-600"
                    />

                    {/* fake resize handle */}
                    <img
                        src={drag}
                        alt="resize"
                        className=" pointer-events-none absolute bottom-[12px] right-[8px] w-[28px] h-[28px]"
                    />
                </div>
            </div>
            <div>
                <Button onClick={onSubmit} buttonText="Send" buttonStyle="primary" />
            </div>

            <div className='flex flex-col pt-[44px] gap-[44px]'>
                {comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    )
}

export default ArticleCommentSection