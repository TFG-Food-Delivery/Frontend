import { orderAPI, restaurantAPI } from "../../api";

export const useCheckout = async (
    userId: string,
    restaurantId: string,
    items: Array<any>,
    useLoyaltyPoints: boolean
) => {
    const checkoutCart = async () => {
        try {
            const { data: restaurantData } = await restaurantAPI.get(`/${restaurantId}`);

            const response = await orderAPI.post("", {
                customerId: userId,
                restaurantId: restaurantId,
                restaurantName: restaurantData.name,
                items: items.map((item: any) => ({
                    dishId: item.dishId,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                })),
                deliveryFee: 2.99,
                useLoyaltyPoints,
            });
            const { orderId } = response.data;

            return orderId;
        } catch (err: any) {
            console.error(err);
        }
    };

    const orderID = await checkoutCart();

    return orderID; // Devuelve los estados
};
