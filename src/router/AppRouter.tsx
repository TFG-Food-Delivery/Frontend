import { Route, Routes } from "react-router";
import { AuthRoutes } from "../modules/auth/router/AuthRoutes";
import { HomePage } from "../modules/home/pages/Home";
import { ExceptionsRouter } from "../modules/exceptions/router/ExceptionsRouter";

import { authStatus, checkAuth, clearErrorThunk, RolesList } from "../modules/store/auth";
import { CheckingAuth } from "../modules/core/components";
import { RestaurantRoutes } from "../modules/restaurant/router/RestaurantRoutes";
import { CourierRoutes } from "../modules/courier/router/CourierRoutes";
import { CustomerRouter } from "../modules/customer/router/CustomerRouter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../modules/store";
import { useEffect } from "react";
import { fetchCart } from "../modules/store/cart";

export const AppRouter = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { uid, status, role } = useSelector((state: any) => state.auth);

    useEffect(() => {
        dispatch(checkAuth());
        dispatch(clearErrorThunk());
    }, []);

    useEffect(() => {
        if (role === RolesList.CUSTOMER) {
            dispatch(fetchCart(uid));
        }
    }, [uid]);

    if (status === authStatus.checking) {
        return <CheckingAuth />;
    }

    return (
        <Routes>
            {/* Si no está autenticado */}
            {status !== authStatus.authenticated ? (
                <>
                    <Route path="/auth/*" element={<AuthRoutes />} />
                    <Route path="/" element={<HomePage />} />
                </>
            ) : (
                <>
                    {/* Redirigir a la ruta correspondiente según el rol */}
                    {role === RolesList.CUSTOMER && <Route path="/*" element={<CustomerRouter />} />}
                    {role === RolesList.RESTAURANT && <Route path="/*" element={<RestaurantRoutes />} />}
                    {role === RolesList.COURIER && <Route path="/*" element={<CourierRoutes />} />}
                </>
            )}

            {/* Rutas para manejar excepciones */}
            {/* <Route path="/*" element={<ExceptionsRouter />} /> */}
        </Routes>
    );
};
