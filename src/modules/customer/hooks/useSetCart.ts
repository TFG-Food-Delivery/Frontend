import { customerAPI } from "../../api";

export const useSetCart = async (items: any, userId: string) => {
    try {
        const { data } = await customerAPI.patch(`/${userId}/cart`, {
            items: items.map((item: any) => ({
                dishId: item.dishId,
                quantity: item.quantity,
            })),
        });

        return data;
    } catch (error) {
        console.error("Error updating cart:", error);
        throw error;
    }
};
