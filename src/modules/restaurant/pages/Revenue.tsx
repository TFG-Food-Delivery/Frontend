import { AccessTime, AttachMoney, Person, ShoppingCart } from "@mui/icons-material";
import { useRestaurantStats } from "../hooks";
import {
    Box,
    Typography,
    Grid2 as Grid,
    CardContent,
    CircularProgress,
    Card,
    Container,
    ButtonGroup,
    Button,
} from "@mui/material";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useSelector } from "react-redux";
import { useState } from "react";

export const RevenuePage = () => {
    const { uid: restaurantId } = useSelector((state: any) => state.auth);
    const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("weekly");
    const { stats, loading } = useRestaurantStats(restaurantId, period);

    const statsData = [
        {
            title: "Total Revenue",
            value: stats?.stats.totalRevenue || 0,
            icon: <AttachMoney fontSize="large" color="primary" />,
            suffix: "€",
        },
        {
            title: "Total Customers",
            value: stats?.stats.totalCustomers || 0,
            icon: <Person fontSize="large" color="primary" />,
        },
        {
            title: "Total Orders",
            value: stats?.stats.totalOrders || 0,
            icon: <ShoppingCart fontSize="large" color="primary" />,
        },
        {
            title: "Average Service Time",
            value: stats?.stats.averageServiceTime || 0,
            icon: <AccessTime fontSize="large" color="primary" />,
            suffix: "min",
        },
    ];

    return (
        <Container maxWidth="xl" sx={{ padding: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Restaurant Statistics
            </Typography>

            <Grid container spacing={3}>
                {statsData.map((stat, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                        <Card>
                            <CardContent>
                                {loading ? (
                                    <Box display="flex" justifyContent="center" alignItems="center" height={100}>
                                        <CircularProgress />
                                    </Box>
                                ) : (
                                    <>
                                        <Box display="flex" alignItems="center" marginBottom={2}>
                                            {stat.icon}
                                            <Typography variant="h6" component="div" sx={{ marginLeft: 2 }}>
                                                {stat.title}
                                            </Typography>
                                        </Box>
                                        <Typography variant="h4" component="div">
                                            {stat.value} {stat.suffix || ""}
                                        </Typography>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box mt={4}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Revenue Data ({period.charAt(0).toUpperCase() + period.slice(1)})
                </Typography>

                <ButtonGroup variant="contained" color="primary" sx={{ mb: 2 }}>
                    <Button onClick={() => setPeriod("daily")}>Daily</Button>
                    <Button onClick={() => setPeriod("weekly")}>Weekly</Button>
                    <Button onClick={() => setPeriod("monthly")}>Monthly</Button>
                </ButtonGroup>

                <Card>
                    <CardContent>
                        {loading ? (
                            <Box display="flex" justifyContent="center" alignItems="center" height={200}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={stats?.revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey={period === "daily" ? "date" : period === "weekly" ? "week" : "month"}
                                    />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="revenue" fill="#1976d2" />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};
