import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Admin/AdminSidebar";

/**
 * Admin layout: structure and UI only. Access control is in AdminRoute (SoC).
 */
function AdminLayout() {
    return (
        <div className="flex">
            <AdminSidebar />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;
