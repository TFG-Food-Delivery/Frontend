import { Box, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetPendingOrders } from "../hooks";
import { Inbox } from "@mui/icons-material";
import "./styles/styles.css";
import { OrderDetailsDialog, OrderListItem } from "../components";
import { io, Socket } from "socket.io-client";
import { Order } from "../../common/types";
import { OrderStatus } from "../../common/enum";

const failedOrCanceledOrDelivered = [OrderStatus.CANCELLED, OrderStatus.FAILED, OrderStatus.DELIVERED];

export const PendingOrdersPage = () => {
    const { uid: restaurantId } = useSelector((state: any) => state.auth);
    const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        const socket: Socket = io("http://localhost:3007", {
            query: { restaurantId },
        });

        socket.on("connect", () => {
            console.log("Socket connected for restaurantId:", restaurantId);
        });

        socket.on("order_status_change", (data) => {
            console.log("Order status update:", data);
            setPendingOrders((prevOrders) => {
                const updatedOrders = prevOrders.map((order) => {
                    if (order.id === data.orderId) {
                        return {
                            ...order,
                            status: data.newStatus,
                        };
                    }
                    return order;
                });
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
    }, [restaurantId]);

    useEffect(() => {
        const getPendingOrders = async () => {
            const pendingOrders = await useGetPendingOrders(restaurantId);

            setPendingOrders(pendingOrders.data);
        };
        getPendingOrders();
    }, []);
    return (
        <Container maxWidth="xl">
            <Typography variant="h3" component={"h1"} gutterBottom>
                Pending Orders
            </Typography>
            <Stack alignItems="center" justifyContent="center" height="70vh">
                {pendingOrders.filter((order) => !failedOrCanceledOrDelivered.includes(order.status)).length === 0 ? (
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
                    pendingOrders
                        .filter((order) => !failedOrCanceledOrDelivered.includes(order.status))
                        .map((order) => (
                            <OrderListItem key={order.id} order={order} setSelectedOrder={setSelectedOrder} />
                        ))
                )}
            </Stack>

            <OrderDetailsDialog selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
        </Container>
    );
};
