import { useParams } from "react-router-dom";
import ArticleDetail from "../components/ArticleDetail/AriticleDetail";
import { Footer } from "@/components/Websection";

const ArticleDetailPage = () => {
  const { id } = useParams();

  return (
    <>
      <ArticleDetail articleId={id} />
      <Footer />
    </>
  )
};

export default ArticleDetailPage;

