import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Container, Typography } from "@mui/material";
import { DashboardCard } from "../components";
import { Courier } from "../types";
import { useGetCourier } from "../hooks";

export const CourierDashboardPage = () => {
    const { uid: courierId } = useSelector((state: any) => state.auth);
    const [courier, setCourierData] = useState<Courier>({} as Courier);
    useEffect(() => {
        const getCourierData = async () => {
            const courierData = await useGetCourier(courierId);

            setCourierData(courierData);
        };

        getCourierData();
    }, [courierId]);

    return (
        <Container
            maxWidth="xl"
            sx={{
                padding: "2rem",
                marginTop: "2rem",
            }}
        >
            <Typography
                variant="h3"
                component={"h1"}
                fontWeight={"bold"}
                gutterBottom
                sx={{
                    color: "#333",
                    textAlign: "center",
                    marginBottom: "3rem",
                }}
            >
                Dashboard
            </Typography>

            <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="space-between"
                gap={3}
                sx={{
                    rowGap: "2rem",
                }}
            >
                {[
                    courier.orderAssigned
                        ? {
                              title: "Active Order",
                              description: "View your current active order",
                              link: `/orders/available/${courier.orderAssigned}`,
                          }
                        : {
                              title: "Available Orders",
                              description: "Browse and accept available delivery orders",
                              link: "/orders/available",
                          },
                    {
                        title: "Completed Orders",
                        description: "Review all completed orders",
                        link: "/orders/completed",
                    },
                    {
                        title: "Customer Feedback",
                        description: "Read feedback from your customers",
                        link: "/customer-feedback",
                    },
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
