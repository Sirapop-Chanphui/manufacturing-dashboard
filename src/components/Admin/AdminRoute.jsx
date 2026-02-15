import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/authentication";
import { Spinner } from "@/components/ui/spinner";
import { isMobile } from "@/utils/device";

/**
 * Guard: only users with role "admin" can access, and only on desktop. (SoC – auth concern only)
 * - Mobile/phone → redirect to /
 * - Not logged in → redirect to /login
 * - Logged in but role !== "admin" → redirect to /
 */
function AdminRoute() {
    const { user, state } = useAuth();

    if (state.getUserLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-neutral-100" aria-busy="true">
                <Spinner className="size-8 text-neutral-500" />
            </div>
        );
    }

    if (isMobile()) {
        return <Navigate to="/" replace />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default AdminRoute;
