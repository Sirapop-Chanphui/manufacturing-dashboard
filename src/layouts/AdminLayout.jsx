import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Admin/AdminSidebar";

/**
 * Admin layout: structure and UI only. Access control is in AdminRoute (SoC).
 */
function AdminLayout() {
    return (
        <div>
            <AdminSidebar />
            <main className="ml-[280px] min-h-screen">
                <Outlet />
            </main>
        </div>
    );
}


export default AdminLayout;
