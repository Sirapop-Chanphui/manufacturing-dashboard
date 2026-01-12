import { HeroSection, Footer } from "./components/Websection";
import ArticleSection from "./components/AriticleSection/ArticleSection";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main className="pt-[48px] 2xl:pt-[76px]">
        <HeroSection />
        <ArticleSection />
        <Footer />
      </main>
    </>
  );
}

export default App;
