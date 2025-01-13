import { OrderStatus } from "../enum";

export type Order = {
    id: string;
    date: string;
    totalAmount: number;
    status: OrderStatus;
    deliveryTime: string;
    paid: boolean;
    stripeChargeId: string;
    restaurantId: string;
    restaurantName: string;
    customerId: string;
    courierId: string;
    items: {
        dishId: string;
        name: string;
        quantity: number;
        price: number;
    }[];
};
