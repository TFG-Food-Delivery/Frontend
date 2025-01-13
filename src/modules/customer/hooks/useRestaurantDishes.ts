import { useEffect, useState } from "react";
import { restaurantAPI } from "../../api";

type Props = {
    id: string | undefined;
};

export const useRestaurantDishes = ({ id }: Props) => {
    const [data, setData] = useState<any[]>([]); // Estado para los datos
    const [loading, setLoading] = useState(true); // Estado para controlar el loading
    const [error, setError] = useState(null); // Estado para errores

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await restaurantAPI.get(`/${id}/menu`);
                console.log("response:", response.data.data);
                setData(response.data.data);
            } catch (err: any) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error, setData }; // Devuelve los estados
};
