import { orderAPI } from "../../api";

export const useGetPendingOrdersToDeliver = () => {
    const getPendingOrdersToDeliver = async () => {
        try {
            const response = await orderAPI.get(`/pending`);
            return response.data;
        } catch (err: any) {
            console.error(err);
        }
    };

    const restaurantData = getPendingOrdersToDeliver();

    return restaurantData;
};
