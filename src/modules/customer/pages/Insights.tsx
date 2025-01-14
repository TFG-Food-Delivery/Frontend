import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Container, Grid2 as Grid, Paper, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { orderAPI } from "../../api";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useNavigate } from "react-router";

export const InsightsPage = () => {
    const { uid: userId } = useSelector((state: any) => state.auth);
    const navigate = useNavigate();
    const [period, setPeriod] = useState<"monthly" | "daily">("monthly");
    const [orderStats, setOrderStats] = useState({
        totalSpent: 0,
        averageOrderValue: 0,
        totalOrders: 0,
        monthlySpending: [],
        dailySpending: [],
        mostOrderedRestaurant: {
            id: "",
            name: "",
            orderCount: 0,
        },
    });

    useEffect(() => {
        const fetchOrderStats = async () => {
            try {
                const response = await orderAPI.get(`/customers/stats/${userId}?period=${period}`);
                setOrderStats(response.data);
            } catch (error) {
                console.error("Error fetching order stats:", error);
            }
        };

        fetchOrderStats();
    }, [userId, period]);

    const handlePeriodChange = (_: React.MouseEvent<HTMLElement>, newPeriod: "monthly" | "daily") => {
        if (newPeriod !== null) {
            setPeriod(newPeriod);
        }
    };

    const getChartData = () => {
        return period === "monthly" ? orderStats.monthlySpending : orderStats.dailySpending;
    };

    const getDataKey = () => {
        return period === "monthly" ? "month" : "date";
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h3" component="h1" fontWeight="bold" sx={{ mb: 4, mt: 4 }}>
                Spending Insights
            </Typography>

            <Grid container spacing={3}>
                {/* Stats Cards */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, textAlign: "center" }}>
                        <Typography variant="h6" color="text.secondary">
                            Total Spent
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                            {orderStats.totalSpent.toFixed(2)}€
                        </Typography>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, textAlign: "center" }}>
                        <Typography variant="h6" color="text.secondary">
                            Average Order Value
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                            {orderStats.averageOrderValue.toFixed(2)}€
                        </Typography>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, textAlign: "center" }}>
                        <Typography variant="h6" color="text.secondary">
                            Total Orders
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                            {orderStats.totalOrders}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            cursor: "pointer",
                            transition: "transform 0.2s ease-in-out",
                            "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.03)",
                                transform: "translateY(-4px)",
                            },
                        }}
                        onClick={() => {
                            navigate(`/shop/restaurant/${orderStats.mostOrderedRestaurant.id}`);
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <RestaurantIcon sx={{ mr: 1, color: "primary.main" }} />
                            <Typography variant="h6" component="div">
                                Favourite Restaurant
                            </Typography>
                        </Box>
                        {orderStats.mostOrderedRestaurant.name ? (
                            <>
                                <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                                    {orderStats.mostOrderedRestaurant.name}
                                </Typography>
                                <Typography color="text.secondary">
                                    {orderStats.mostOrderedRestaurant.orderCount} orders made
                                </Typography>
                            </>
                        ) : (
                            <Typography color="text.secondary">You don't have a favorite restaurant yet</Typography>
                        )}
                    </Paper>
                </Grid>

                {/* Spending Chart */}
                <Grid size={12}>
                    <Paper sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                            <Typography variant="h6">{period === "monthly" ? "Monthly" : "Daily"} Spending</Typography>
                            <ToggleButtonGroup value={period} exclusive onChange={handlePeriodChange} size="small">
                                <ToggleButton value="monthly">Monthly</ToggleButton>
                                <ToggleButton value="daily">Daily</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                        <Box sx={{ width: "100%", height: 400 }}>
                            <ResponsiveContainer>
                                <BarChart
                                    data={getChartData()}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 30,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey={getDataKey()}
                                        angle={-45}
                                        textAnchor="end"
                                        height={70}
                                        interval={0}
                                    />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="amount" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
