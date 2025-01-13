import { orderAPI } from "../../api";

export const useAcceptOrder = (orderId: string, courierId: string) => {
    const acceptOrder = async () => {
        try {
            const response = await orderAPI.patch(`/${orderId}/courier/accept`, {
                courierId,
            });
            return response.data;
        } catch (err: any) {
            console.error(err);
        }
    };

    const courierData = acceptOrder();

    return courierData;
};
