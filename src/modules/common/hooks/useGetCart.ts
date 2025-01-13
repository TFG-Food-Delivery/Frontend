import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { AppDispatch } from "../../store";
import { fetchCart } from "../../store/cart";

export const useGetCart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { uid, role, status } = useSelector((state: any) => state.auth);
    const { items: cartItems } = useSelector((state: any) => state.cart);

    useEffect(() => {
        if (status === "authenticated" && role === "CUSTOMER" && uid && cartItems.length > 0) {
            dispatch(fetchCart(uid));
        }
    }, [dispatch, uid]); // Ejecuta el efecto solo si el uid cambia
};
