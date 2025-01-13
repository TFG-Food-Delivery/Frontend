import { customerAPI, restaurantAPI } from "../../api";
import { AppDispatch } from "../store";
import {
    addItemToCart,
    removeItemFromCart,
    restartCart,
    setCart,
    setError,
    setLoading,
    updateItemQuantity,
} from "./cartSlice";

export const fetchCart = (userId: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await customerAPI.get(`${userId}/cart`);
            const { restaurantId, cart } = response.data;

            dispatch(setCart({ restaurantId, items: cart }));
        } catch (error) {
            dispatch(setError("Failed to load cart"));
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const addItemToCartThunk = (userId: string, dishId: string, firstItem?: boolean) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setLoading(true));
        try {
            const newDish = await customerAPI.post(`${userId}/cart`, { dishId });
            let restaurantId;
            if (firstItem) {
                const restaurantDish = await restaurantAPI.get(`/menu/${newDish.data.dishId}`);
                restaurantId = restaurantDish.data.restaurantId;
            }
            const payload: { dishId: string; restaurantId?: string } = {
                dishId: dishId,
            };
            if (restaurantId) {
                payload.restaurantId = restaurantId;
            }
            dispatch(addItemToCart(payload));
        } catch (error) {
            console.error("Error adding item", error);
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const removeItemFromCartThunk = (userId: string, dishId: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setLoading(true));
        try {
            await customerAPI.delete(`${userId}/cart?dishId=${dishId}`);

            dispatch(removeItemFromCart({ dishId }));
        } catch (error) {
            console.error("Error removing item", error);
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const restartCartThunk = (userId: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await customerAPI.delete(`${userId}/cart/restart`);
            dispatch(restartCart({}));
            return response.data;
        } catch (error) {
            console.error("Error removing item", error);
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const updateItemQuantityThunk = (userId: string, dishId: string, quantity: number) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await customerAPI.put(`${userId}/cart`, { dishId, quantity });

            dispatch(updateItemQuantity({ dishId, quantity: response.data.quantity }));
        } catch (error) {
            console.error("Error updating quantity item", error);
        } finally {
            dispatch(setLoading(false));
        }
    };
};
