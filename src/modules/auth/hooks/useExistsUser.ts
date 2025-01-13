import { authAPI } from "../../api";

export const useExistsUser = async (email: string, phone: string) => {
    try {
        const response = await authAPI.get(
            `/exists?email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching completed orders:", error);
    }
};
