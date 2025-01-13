import { orderAPI } from "../../api";

export const useGetCompletedOrders = async (restaurantId: string, page: number, searchTerm: string) => {
    try {
        const response = await orderAPI.get(
            `/completed/${restaurantId}?page=${page}&search=${encodeURIComponent(searchTerm)}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching completed orders:", error);
        return {
            data: [],
            meta: {
                lastPage: 1,
                page: 1,
            },
        };
    }
};
