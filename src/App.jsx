import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import HomePage from "./pages/HomePage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import SignUpPage from "./pages/SignUpPage";
import RegistrationSuccess from "./pages/RegistrationSuccessPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
{/*import AdminArticleManagement from "./pages/Admin/AdminArticleManagement";*/}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" richColors />

      <Routes>
        <Route path="*" element={<NotFound />} />

        {/* USER LAYOUT */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signup/success" element={<RegistrationSuccess />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/profile" element={<ProfilePage />} />
          <Route path="/login/reset-password" element={<ResetPasswordPage />} />
          <Route path="/article/:id" element={<ArticleDetailPage />} />
        </Route>

        {/* ADMIN LAYOUT */}
        <Route path="/login/admin" element={<AdminLayout />}>
          {/*<Route path="article-management"element={<AdminArticleManagement />}/>*/}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
