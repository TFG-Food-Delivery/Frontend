import { restaurantAPI } from "../../api";

export const useCreateCategory = async (restaurantId: string, categoryName: string) => {
    try {
        const response = await restaurantAPI.post(`/${restaurantId}/category`, {
            name: categoryName,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching completed orders:", error);
    }
};
