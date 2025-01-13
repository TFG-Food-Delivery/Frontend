import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { cartSlice } from "./cart/cartSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        cart: cartSlice.reducer,
    },
});

// Exporta el tipo de dispatch
export type AppDispatch = typeof store.dispatch;

// Exporta el tipo de estado
export type RootState = ReturnType<typeof store.getState>;
