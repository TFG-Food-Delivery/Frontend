import { orderAPI } from "../../api";

export const useVerifyPin = (pin: string, orderId: string) => {
    const verifyPin = async () => {
        try {
            const response = await orderAPI.post(`/verify/${orderId}`, { pin });
            return response.data;
        } catch (err: any) {
            console.error(err);
        }
    };

    const restaurantData = verifyPin();

    return restaurantData;
};
