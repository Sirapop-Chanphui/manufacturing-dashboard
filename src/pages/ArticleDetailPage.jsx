import { useParams } from "react-router-dom";
import ArticleDetail from "../components/ArticleDetail/AriticleDetail";
import Navbar from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Websection";

const ArticleDetailPage = () => {
  const { id } = useParams();

  return (
    <>
      <Navbar />
      <ArticleDetail articleId={id} />
      <Footer />
    </>
  )
};

export default ArticleDetailPage;

