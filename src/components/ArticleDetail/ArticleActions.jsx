import React from 'react'
import Button from '../common/Button'
import { Smile } from 'lucide-react';
import { Copy } from 'lucide-react';
import facebook from "../../assets/icons/icon-facebook.svg";
import linkedin from "../../assets/icons/icon-linkedin.svg"
import x from "../../assets/icons/icon-x.svg"

function ArticleActions({ onLike, onCopy }) {
  const articleUrl = encodeURIComponent(window.location.href);

  {/*
  const BASE_URL = "https://example-blog.com";
  const articleUrl = encodeURIComponent(`${BASE_URL}/article/${articleId}`);
  */}

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
        shareUrl = `https://www.twitter.com/share?&url=${articleUrl}`;;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className='flex flex-col  w-full  h-[152px] 2xl:h-[80px] bg-neutral-200 2xl:rounded-[16px]'>
      <div className='flex flex-col  2xl:flex-row 2xl:justify-between p-[16px] gap-[24px]'>
        <Button onClick={onLike} buttonText="321" buttonStyle="secondary" icon={Smile} />
        <div className='flex flex-row justify-center items-center gap-[8px]'>
          <Button onClick={onCopy} buttonText="Copy link" buttonStyle="secondary" icon={Copy} px="px-[28px]" />
          {/* Facebook */}
          <button
            onClick={() => handleShare("facebook")}
            className="w-[48px] h-[48px] hover:cursor-pointer hover:opacity-80"
          >
            <img src={facebook} alt="Share to Facebook" />
          </button>

          {/* LinkedIn */}
          <button
            onClick={() => handleShare("linkedin")}
            className="w-[48px] h-[48px] hover:cursor-pointer hover:opacity-80"
          >
            <img src={linkedin} alt="Share to LinkedIn" />
          </button>

          {/* X / Twitter */}
          <button
            onClick={() => handleShare("x")}
            className="w-[48px] h-[48px] hover:cursor-pointer hover:opacity-80"
          >
            <img src={x} alt="Share to X" />
          </button>

        </div>
      </div>
    </div>
  )
}

export default ArticleActions