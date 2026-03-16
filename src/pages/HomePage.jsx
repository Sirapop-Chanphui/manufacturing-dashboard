import { Footer, HeroSection } from "../components/Websection";
import ArticleSection from "../components/ArticleSection/ArticleSection";

const HomePage = () => {
    return (
        <main className="pt-[48px] 2xl:pt-[76px]">
            <HeroSection />
            <ArticleSection />
            <Footer />
        </main>
    );
};

export default HomePage;
