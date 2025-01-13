import { orderAPI } from "../../api";

export const useGetOrder = (orderId: string) => {
    const getOrder = async () => {
        try {
            const response = await orderAPI.get(`/${orderId}`);
            return response.data;
        } catch (err: any) {
            console.error(err);
        }
    };

    const orderData = getOrder();

    return orderData;
};
