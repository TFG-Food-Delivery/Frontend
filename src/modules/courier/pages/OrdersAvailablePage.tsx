import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Order } from "../../common/types";
import { io, Socket } from "socket.io-client";
import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import { Inbox } from "@mui/icons-material";
import { useGetPendingOrdersToDeliver } from "../hooks";
import { useNavigate } from "react-router";

type Props = {};

export const OrdersAvailablePage = ({}: Props) => {
    const { uid: courierId } = useSelector((state: any) => state.auth);
    const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const socket: Socket = io("http://localhost:3007", {
            query: { courier: "courier" },
        });

        socket.on("connect", () => {
            console.log("Socket connected for courierId:", courierId);
        });

        socket.on("order_ready_for_delivery", (data) => {
            console.log("Order status update:", data);
            setPendingOrders((prevOrders) => {
                const updatedOrders = [...prevOrders, data];
                return updatedOrders;
            });
        });

        socket.on("order_created", (data) => {
            console.log("Order created:", data);
            setPendingOrders((prevOrders) => [...prevOrders, data]);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected.");
        });

        socket.on("error", (err) => {
            console.error("Error from server:", err);
        });

        return () => {
            socket.disconnect();
        };
    }, [courierId]);

    // const handleUpdateStatus = (orderId: string, payload: any) => {
    //     useUpdateOrderStatus(orderId, payload);
    // };

    useEffect(() => {
        const getPendingOrders = async () => {
            const pendingOrders = await useGetPendingOrdersToDeliver();

            setPendingOrders(pendingOrders.data);
        };
        getPendingOrders();
    }, []);

    const handleClick = (orderId: string) => {
        navigate(`/orders/available/${orderId}`);
    };

    return (
        <Container maxWidth="xl">
            <Typography variant="h3" component={"h1"} gutterBottom>
                Pending Orders
            </Typography>
            <Stack alignItems="center" justifyContent="center" height="70vh" spacing={2}>
                {pendingOrders.length === 0 ? (
                    <Box textAlign="center">
                        <Inbox color="disabled" sx={{ fontSize: 80, mb: 2 }} />
                        <Typography variant="h6" color="textSecondary">
                            No pending orders
                        </Typography>
                        <Typography variant="body2" color="textSecondary" mt={1}>
                            You’re all caught up! Check back later for new orders.
                        </Typography>
                    </Box>
                ) : (
                    pendingOrders.map((order, index) => (
                        <Paper
                            key={index}
                            elevation={3}
                            sx={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                p: 2,
                                backgroundColor: "#f9f9f9",
                            }}
                        >
                            <Typography variant="h5" fontWeight={"bold"}>
                                {order.restaurantName}
                            </Typography>
                            <Button variant="contained" color="primary" onClick={() => handleClick(order.id)}>
                                See Details
                            </Button>
                        </Paper>
                    ))
                )}
            </Stack>
        </Container>
    );
};
