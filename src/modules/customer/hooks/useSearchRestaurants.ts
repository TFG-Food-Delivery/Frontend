import { useState, useEffect } from "react";
import { restaurantAPI } from "../../api";
import { CuisineType } from "../../common/types";

interface Restaurant {
    id: number;
    name: string;
    cuisineType: CuisineType;
    image: string;
}

type Props = {
    searchTerm: string;
};

export function useSearchRestaurants({ searchTerm }: Props) {
    const [results, setResults] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!searchTerm) {
            setResults([]);
            return;
        }
        let isCancelled = false;
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Adjust the fetch URL (and the query param) to match your backend route
                const response = await restaurantAPI(`?search=${encodeURIComponent(searchTerm)}`);
                if (!(response.status === 200)) {
                    throw new Error("Network response was not ok");
                }
                const { data } = await response.data;
                if (!isCancelled) {
                    setResults(data); // assume data is an array of Restaurant
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
