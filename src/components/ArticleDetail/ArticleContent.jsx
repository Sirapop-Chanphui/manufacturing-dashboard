import ReactMarkdown from "react-markdown";

const ArticleContent = ({ content }) => {
  return (
    <div className="prose prose-neutral max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default ArticleContent;
