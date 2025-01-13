import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define el tipo de los ítems del carrito
interface CartItem {
    dishId: string;
    quantity: number;
}

interface CartState {
    restaurantId: string | null;
    items: CartItem[];
    loading: boolean;
    error: string | null;
}

// Estado inicial del carrito
const initialState: CartState = {
    restaurantId: null,
    items: [],
    loading: false,
    error: null,
};

// Creamos el cartSlice
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setCart: (state, { payload }) => {
            state.restaurantId = payload.restaurantId;
            state.items = payload.items;
        },
        addItemToCart: (state, { payload }) => {
            const itemIndex = state.items.findIndex((item) => item.dishId === payload.dishId);
            if (itemIndex >= 0) {
                state.items[itemIndex].quantity += 1;
            } else {
                state.items.push({ dishId: payload.dishId, quantity: 1 });
            }
            if (state.restaurantId == null) {
                state.restaurantId = payload.restaurantId;
            }
        },
        removeItemFromCart: (state, { payload }) => {
            const itemIndex = state.items.findIndex((item) => item.dishId === payload.dishId);
            if (itemIndex >= 0 && state.items[itemIndex].quantity > 1) {
                state.items[itemIndex].quantity -= 1;
            } else if (itemIndex >= 0 && state.items[itemIndex].quantity === 1) {
                state.items = state.items.filter((item) => item.dishId !== payload.dishId);
            } else {
                console.error("Item not found in cart");
            }
        },
        restartCart: (state, { payload }) => {
            state.restaurantId = null;
            state.items = [];
        },
        updateItemQuantity: (state, { payload }) => {
            const item = state.items.find((item) => item.dishId === payload.dishId);
            if (item) {
                item.quantity = payload.quantity;
            }
        },
    },
});

export const { setLoading, setError, setCart, addItemToCart, removeItemFromCart, restartCart, updateItemQuantity } =
    cartSlice.actions;

export default cartSlice.reducer;
