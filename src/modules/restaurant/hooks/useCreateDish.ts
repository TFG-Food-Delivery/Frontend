import { restaurantAPI } from "../../api";
import { Dish } from "../../customer/types";

export const useCreateDish = async (restaurantId: string, dish: Dish) => {
    try {
        const response = await restaurantAPI.post(`/${restaurantId}/menu`, dish);
        return response.data;
    } catch (error) {
        console.error("Error fetching completed orders:", error);
    }
};
