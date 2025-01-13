import { useState, useEffect } from "react";
import { useGetOrder, useGetRestaurant } from "../../common/hooks";
import { Order } from "../../common/types";
import { Restaurant } from "../../restaurant/types";

export const useOrderDetail = (orderId: string) => {
    const [loading, setLoading] = useState(false);
    const [orderData, setOrderData] = useState<Order | null>(null);
    const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null);

    useEffect(() => {
        const fetchOrderAndCourierLocation = async () => {
            if (!orderId) return;

            setLoading(true);
            try {
                const orderDataReceived = await useGetOrder(orderId);
                const restaurantDataReceived = await useGetRestaurant(orderDataReceived.restaurantId);

                setOrderData(orderDataReceived);
                setRestaurantData(restaurantDataReceived);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderAndCourierLocation();
    }, [orderId]);

    return { loading, orderData, restaurantData, setOrderData };
};
