import { Navigate, Route, Routes } from "react-router";
import { ExceptionsRouter } from "../../exceptions/router/ExceptionsRouter";
import {
    CartPage,
    FeedPage,
    OrdersPage,
    OrderStatusPage,
    PaymentsCancelPage,
    PaymentsPage,
    ProfileManagement,
    RestaurantDetail,
    SearchResultsPage,
} from "../pages";

export const CustomerRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/feed" />} />

            <Route path="/feed" element={<FeedPage />} />
            <Route path="/shop/restaurant/:id" element={<RestaurantDetail />} />

            <Route path="/profile" element={<ProfileManagement />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/customer/order/payment/:orderId" element={<PaymentsPage />} />
            <Route path="/payments/success" element={<OrderStatusPage />} />
            <Route path="/payments/cancel" element={<PaymentsCancelPage />} />
            <Route path="/orders" element={<OrdersPage />} />

            <Route path="/search" element={<SearchResultsPage />} />

            {/* Rutas para manejar excepciones */}
            {/* <Route path="/*" element={<ExceptionsRouter />} /> */}
        </Routes>
    );
};
