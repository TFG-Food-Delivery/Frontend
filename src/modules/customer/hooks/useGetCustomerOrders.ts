import { orderAPI } from "../../api";

export const useGetCustomerOrders = (customerId: string, page: number) => {
    const getCustomerOrders = async () => {
        try {
            const response = await orderAPI.get(`/customers/${customerId}?page=${page}`);
            return response.data;
        } catch (err: any) {
            console.error(err);
        }
    };

    const orderData = getCustomerOrders();

    return orderData;
};
