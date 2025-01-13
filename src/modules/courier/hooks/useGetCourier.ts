import { courierAPI } from "../../api";

export const useGetCourier = (courierId: string) => {
    const getCourier = async () => {
        try {
            const response = await courierAPI.get(`/${courierId}`);
            return response.data;
        } catch (err: any) {
            console.error(err);
        }
    };

    const courierData = getCourier();

    return courierData;
};
