import { orderAPI } from "../../api";

export const useGetPendingOrders = (restaurantId: string) => {
    const getPendingOrders = async () => {
        try {
            const response = await orderAPI.get(`/pending/${restaurantId}`);
            return response.data;
        } catch (err: any) {
            console.error(err);
        }
    };

    const ordersData = getPendingOrders();

    return ordersData;
};
