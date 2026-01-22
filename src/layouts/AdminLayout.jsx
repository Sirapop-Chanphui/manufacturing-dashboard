{/*import AdminSidebar from "../components/Admin/AdminSidebar"; */}
import { Outlet } from "react-router-dom";

function AdminLayout() {
    return (
        <div className="flex">

           {/* <AdminSidebar />*/}
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;
