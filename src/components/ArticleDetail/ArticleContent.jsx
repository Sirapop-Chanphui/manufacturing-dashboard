import ReactMarkdown from "react-markdown";

const normalizeLineBreaks = (text) => {
  if (typeof text !== "string") return "";
  return text.replace(/\\n/g, "\n").replace(/\\r\\n/g, "\n").replace(/\\r/g, "\n");
};

const ArticleContent = ({ content }) => {
  const safeContent = normalizeLineBreaks(content ?? "");
  return (
    <div className="markdown prose prose-neutral max-w-none text-neutral-600">
      <ReactMarkdown>{safeContent}</ReactMarkdown>
    </div>
  );
};

export default ArticleContent;