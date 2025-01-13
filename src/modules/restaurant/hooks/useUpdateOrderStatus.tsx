import { orderAPI } from "../../api";
import { OrderStatus } from "../../common/enum";
import { LocationCoords } from "../types";

export const useUpdateOrderStatus = (
    orderId: string,
    payload: { newStatus: OrderStatus; location?: LocationCoords }
) => {
    const updateOrderStatus = async () => {
        try {
            const updatedPayload: any = {
                status: payload.newStatus,
            };

            if (payload.location) {
                updatedPayload.location = payload.location;
            }
            const response = await orderAPI.patch(`/${orderId}/status`, updatedPayload);
            return response.data;
        } catch (err: any) {
            console.error(err);
        }
    };

    const restaurantData = updateOrderStatus();

    return restaurantData;
};
