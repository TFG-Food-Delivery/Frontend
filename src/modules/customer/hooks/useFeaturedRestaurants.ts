import { useEffect, useState } from "react";
import { restaurantAPI } from "../../api";
import { Restaurant } from "../../restaurant/types";

export const useFeaturedRestaurants = () => {
    const [data, setData] = useState<Restaurant[]>([]); // Estado para los datos
    const [loading, setLoading] = useState(true); // Estado para controlar el loading
    const [error, setError] = useState(null); // Estado para errores

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await restaurantAPI.get("?limit=4");
                setData(response.data.data);
            } catch (err: any) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error }; // Devuelve los estados
};
