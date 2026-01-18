import { Footer, HeroSection } from "../components/Websection";
import ArticleSection from "../components/ArticleSection/ArticleSection";
import Navbar from "../components/Navbar/Navbar";

const HomePage = () => {
    return (
        <main className="pt-[48px] 2xl:pt-[76px]">
            <Navbar />
            <HeroSection />
            <ArticleSection />
            <Footer />
        </main>
    );
};

export default HomePage;
