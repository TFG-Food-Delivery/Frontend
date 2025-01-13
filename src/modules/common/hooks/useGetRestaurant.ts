import { restaurantAPI } from "../../api";

export const useGetRestaurant = (restaurantId: string) => {
    const getRestaurant = async () => {
        try {
            const response = await restaurantAPI.get(`/${restaurantId}`);
            return response.data;
        } catch (err: any) {
            console.error(err);
        }
    };

    const restaurantData = getRestaurant();

    return restaurantData;
};
