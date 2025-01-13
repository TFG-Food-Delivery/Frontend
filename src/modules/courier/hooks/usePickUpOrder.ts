import { orderAPI } from "../../api";
import { OrderStatus } from "../../common/enum";

export const usePickUpOrder = (orderId: string) => {
    const pickUpOrder = async () => {
        try {
            const response = await orderAPI.patch(`/${orderId}/status`, { status: OrderStatus.OUT_FOR_DELIVERY });

            return response.data;
        } catch (err: any) {
            console.error(err);
        }
    };

    const courierData = pickUpOrder();

    return courierData;
};
