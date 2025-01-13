import { Box, Container, Typography } from "@mui/material";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Restaurant } from "../types";
import { useGetRestaurant } from "../../common/hooks";
import { DashboardCard } from "../components";

export const RestaurantDashboardPage = () => {
    const { uid: restaurantId } = useSelector((state: any) => state.auth);
    const [restaurantData, setRestaurantData] = useState<Restaurant>({} as Restaurant);
    useEffect(() => {
        const getRestaurantData = async () => {
            const restaurantData = await useGetRestaurant(restaurantId);

            setRestaurantData(restaurantData);
        };

        getRestaurantData();
    }, [restaurantId]);
    return (
        <Container
            maxWidth="xl"
            sx={{
                padding: "2rem",
            }}
        >
            <Box
                component={"h1"}
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "center",
                    alignItems: "center",
                    gap: { xs: 1, sm: 2 },
                    marginBottom: "3rem",
                }}
            >
                <Typography
                    variant="h3"
                    component={"span"}
                    fontWeight={"bold"}
                    sx={{
                        color: "#333",
                        textAlign: "center",
                    }}
                >
                    {restaurantData?.name}
                </Typography>
                <Typography
                    variant="h3"
                    component={"span"}
                    fontWeight={"bold"}
                    sx={{
                        color: "#333",
                        display: { xs: "none", sm: "block" },
                    }}
                >
                    -
                </Typography>
                <Typography
                    variant="h3"
                    component={"span"}
                    fontWeight={"bold"}
                    sx={{
                        color: "#333",
                        textAlign: "center",
                    }}
                >
                    Dashboard
                </Typography>
            </Box>

            <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="space-evenly"
                gap={3}
                sx={{
                    rowGap: "2rem",
                }}
            >
                {[
                    {
                        title: "Pending Orders",
                        description: "View and manage all pending orders",
                        link: "/orders/pending",
                    },
                    {
                        title: "Completed Orders",
                        description: "Review all completed orders",
                        link: "/orders/completed",
                    },
                    { title: "Revenue", description: "Track your revenue and financial performance", link: "/revenue" },
                    {
                        title: "Customer Feedback",
                        description: "Read feedback from your customers",
                        link: "/customer-feedback",
                    },
                    { title: "Your Menu", description: "Update and manage your restaurant menu", link: "/menu" },
                ].map((card, index) => (
                    <Box
                        key={index}
                        width={{ xs: "100%", sm: "48%", lg: "30%" }}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <DashboardCard title={card.title} description={card.description} link={card.link} />
                    </Box>
                ))}
            </Box>
        </Container>
    );
};
