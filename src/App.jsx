import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar/Navbar";
import SignUpPage from "./pages/SignUpPage";
import RegistrationSuccess from "./pages/RegistrationSuccessPage";

function App() {
  return (
    <BrowserRouter>
    <Toaster position="bottom-right" />
    <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signup/success" element={<RegistrationSuccess />} />
        <Route path="/article/:id" element={<ArticleDetailPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
