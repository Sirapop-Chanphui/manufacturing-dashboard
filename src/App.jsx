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
import AdminArticleManagement from "./pages/Admin/AdminArticleManagement";
import AdminCreateArticle from "./pages/Admin/AdminCreateArticle";
import AdminEditArticle from "./pages/Admin/AdminEditArticle";
import AdminCategoryManagement from "./pages/Admin/AdminCategoryManagement";
import AdminCreateCategory from "./pages/Admin/AdminCreateCategory";
import AdminEditCategory from "./pages/Admin/AdminEditCategory";
import AdminProfile from "./pages/Admin/AdminProfile";
import AdminNotification from "./pages/Admin/AdminNotification";
import AdminResetPassword from "./pages/Admin/AdminResetPassword";

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
          <Route path="article-management">
            <Route index element={<AdminArticleManagement />} />
            <Route path="create-article" element={<AdminCreateArticle />} />
            <Route path="edit-article" element={<AdminEditArticle />} />
          </Route>
          <Route path="category-management">
            <Route index element={<AdminCategoryManagement />} />
            <Route path="create-category" element={<AdminCreateCategory />} />
            <Route path="edit-category" element={<AdminEditCategory />} />
          </Route>
          <Route path="profile" element={<AdminProfile />}/>
          <Route path="notification" element={<AdminNotification />}/>
          <Route path="reset-password" element={<AdminResetPassword />}/>
           
          
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
