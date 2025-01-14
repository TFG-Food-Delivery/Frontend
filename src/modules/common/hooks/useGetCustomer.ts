import { customerAPI } from "../../api";

export const useGetCustomer = (customerId: string) => {
    const getCustomer = async () => {
        try {
            const response = await customerAPI.get(`/${customerId}`);
            return response.data;
        } catch (err: any) {
            console.error(err);
        }
    };

    const customerData = getCustomer();

    return customerData;
};
