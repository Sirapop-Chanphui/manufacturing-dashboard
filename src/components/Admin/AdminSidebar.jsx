import {
  FileText,
  Folder,
  User,
  Bell,
  Lock,
  LogOut,
  ExternalLink,
} from "lucide-react";
import logohh from "../../assets/icons/logo-hh.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authentication";

function AdminSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      label: "Article management",
      icon: <FileText size={18} />,
      path: "/login/admin/article-management",
    },
    {
      label: "Category management",
      icon: <Folder size={18} />,
      path: "/login/admin/category-management",
    },
    {
      label: "Profile",
      icon: <User size={18} />,
      path: "/login/admin/profile",
    },
    {
      label: "Notification",
      icon: <Bell size={18} />,
      path: "/login/admin/notification",
    },
    {
      label: "Reset password",
      icon: <Lock size={18} />,
      path: "/login/admin/reset-password",
    },
  ];

  return (
    <aside className="w-[280px] min-h-screen bg-neutral-200 text-neutral-400 flex flex-col justify-between">
      {/* TOP */}
      <div>
        <div
          className="px-[24px] py-[60px] cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logohh}
            alt="Logo hh"
            className="w-[44px] h-[44px]"
          />
          <p className="text-headline-4 text-brand-orange">Admin panel</p>
        </div>

        <nav className="mt-4">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              to={item.path}
            />
          ))}
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="px-4 py-4">
        <button
          onClick={() => window.open("/", "_blank")}
          className="flex items-center gap-[12px] px-[24px] py-[20px] text-body-1 transition-all duration-200 ease-out hover:translate-x-1 hover:cursor-pointer w-full"
        >
          <ExternalLink size={18} />
          hh. website
        </button>
        <div className="h-px w-[280px] -ml-[16px] -mr-[16px] bg-neutral-300"></div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-[12px] px-[24px] py-[20px] text-body-1 transition-all duration-200 ease-out hover:translate-x-1 hover:cursor-pointer w-full"
        >
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar


function SidebarItem({ icon, label, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-[12px] px-[24px] py-[20px] text-body-1 caret-transparent 
        ${isActive
          ? "bg-neutral-300 "
          : "hover:bg-neutral-300"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}


