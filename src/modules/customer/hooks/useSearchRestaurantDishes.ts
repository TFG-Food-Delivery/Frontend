import { useState, useEffect } from "react";
import { restaurantAPI } from "../../api";
import { Dish } from "../types";

type Props = {
    restaurantId: string | undefined;
    searchTerm: string;
};

export function useSearchRestaurantDishes({ restaurantId, searchTerm }: Props) {
    const [results, setResults] = useState<Dish[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!searchTerm || !restaurantId) {
            setResults([]);
            return;
        }
        let isCancelled = false;
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await restaurantAPI(`${restaurantId}/menu?search=${encodeURIComponent(searchTerm)}`);

                if (!(response.status === 200)) {
                    throw new Error("Network response was not ok");
                }
                const { data } = response.data;
                const allDishes = data.reduce((acc: Dish[], category: any) => {
                    return [...acc, ...category.dishes];
                }, []);
                if (!isCancelled) {
                    setResults(allDishes); // assume data is an array of Restaurant
                }
            } catch (err: any) {
                if (!isCancelled) {
                    setError(err.message);
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        };

        fetchData();
        return () => {
            isCancelled = true;
        };
    }, [searchTerm]);

    return {
        results,
        loading,
        error,
    };
}
