import { FeaturedDishes } from "./FeaturedDishes";
import { DifferentRestaurantDialog } from "./DifferentRestaurantDialog";
import { useParams } from "react-router";
import { useRestaurantDishes } from "../hooks";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { addItemToCartThunk } from "../../store/cart";
import { Dish } from "../types";

export const RestaurantDishes = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();
    const { uid: userId } = useSelector((state: any) => state.auth);
    const { restaurantId: cartRestaurantId, items } = useSelector((state: any) => state.cart);
    const { data: dishes, loading, error } = useRestaurantDishes({ id });
    const [openDifferentRestDialog, setOpenDifferentRestDialog] = useState(false);
    const [dishIdOpt, setDishIdOpt] = useState<string | null>(null);

    const handleAddToCart = (dish: Dish) => {
        if (cartRestaurantId != null) {
            if (dish.restaurantId !== cartRestaurantId) {
                setOpenDifferentRestDialog(true);
                setDishIdOpt(dish.id);
                return;
            }
        }
        if (items.length == 0) {
            dispatch(addItemToCartThunk(userId, dish.id, true));
            return;
        }
        dispatch(addItemToCartThunk(userId, dish.id));
    };

    return (
        <>
            <FeaturedDishes
                dishes={dishes != null ? dishes.slice(0, 4) : []}
                loading={loading}
                error={error}
                handleAddToCart={handleAddToCart}
            />
            <DifferentRestaurantDialog
                dishId={dishIdOpt}
                open={openDifferentRestDialog}
                setOpen={setOpenDifferentRestDialog}
            />
        </>
    );
};
