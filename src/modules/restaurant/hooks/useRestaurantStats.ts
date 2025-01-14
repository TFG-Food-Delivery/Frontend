import { useState, useEffect } from "react";
import { orderAPI } from "../../api";

interface RestaurantStats {
    stats: { totalRevenue: number; totalCustomers: number; totalOrders: number; averageServiceTime: number };
    revenueData: {
        [x: string]: string | number;
        revenue: number;
    }[];
}

export const useRestaurantStats = (restaurantId: string, period: string) => {
    const [stats, setStats] = useState<RestaurantStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Here you should implement your API call
                const response = await orderAPI.get(`/restaurants/stats/${restaurantId}?period=${period}`);
                const data = response.data;
                setStats(data);
            } catch (error) {
                console.error("Error loading statistics:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [period, restaurantId]);

    return { stats, loading };
};
