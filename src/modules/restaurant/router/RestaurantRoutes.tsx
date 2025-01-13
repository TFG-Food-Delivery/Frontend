import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
import { authStatus, RolesList } from "../../store/auth";
import { RestaurantDashboardPage, PendingOrdersPage, CompletedOrdersPage, MenuPage } from "../pages";

export const RestaurantRoutes = () => {
    const { status, role } = useSelector((state: any) => state.auth);
    if (status === authStatus.authenticated && role === RolesList.RESTAURANT) {
        return (
            <Routes>
                <Route path="/" element={<Navigate to={"/dashboard"} replace />} />
                <Route path="/dashboard" element={<RestaurantDashboardPage />} />
                <Route path="/orders/pending" element={<PendingOrdersPage />} />
                <Route path="/orders/completed" element={<CompletedOrdersPage />} />
                <Route path="/revenue" element={<RestaurantDashboardPage />} />
                <Route path="/customer-feedback" element={<RestaurantDashboardPage />} />
                <Route path="/menu" element={<MenuPage />} />
            </Routes>
        );
    } else {
        return <Navigate to="/auth/login" />;
    }
};
