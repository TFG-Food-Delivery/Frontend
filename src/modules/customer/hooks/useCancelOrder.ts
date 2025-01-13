import { orderAPI } from "../../api";

export const useCancelOrder = (orderId: string) => {
    const cancelOrder = async () => {
        try {
            const response = await orderAPI.delete(`/${orderId}`);
            return response.data;
        } catch (err: any) {
            console.error(err);
        }
    };

    const orderData = cancelOrder();

    return orderData;
};
