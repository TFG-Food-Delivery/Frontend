import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
import { authStatus, RolesList } from "../../store/auth";
import { CourierDashboardPage, OrderDetailPage, OrdersAvailablePage } from "../pages";

export const CourierRoutes = () => {
    const { status, role } = useSelector((state: any) => state.auth);
    if (status === authStatus.authenticated && role === RolesList.COURIER) {
        return (
            <Routes>
                <Route path="/" element={<Navigate to={"/dashboard"} replace />} />
                <Route path="/dashboard" element={<CourierDashboardPage />} />
                <Route path="/orders/available" element={<OrdersAvailablePage />} />
                <Route path="/orders/available/:orderId" element={<OrderDetailPage />} />
            </Routes>
        );
    } else {
        return <Navigate to="/auth/login" />;
    }
};
