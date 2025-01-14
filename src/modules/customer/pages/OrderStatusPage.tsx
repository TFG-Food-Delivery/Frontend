import { useState, useEffect } from "react";

import { Box, Typography, CircularProgress, Button, LinearProgress, Divider, Container } from "@mui/material";
import { io, Socket } from "socket.io-client";
import { useLocation, useNavigate } from "react-router";

import { useGetCoords, useGetCustomer, useGetOrder, useGetRestaurant } from "../../common/hooks";
import { formatOrderStatus } from "../../common/utils";
import { OrderStatus } from "../../common/enum";
import CancelOrderDialog from "../components/CancelOrderDialog";
import { Order } from "../../common/types";
import { Restaurant } from "../../restaurant/types";
import { GoogleMapReact } from "../../common/components";
import { useSetCart } from "../hooks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchCart } from "../../store/cart";

const statuses = [
    OrderStatus.PENDING,
    OrderStatus.CONFIRMED,
    OrderStatus.PREPARING,
    OrderStatus.READY_FOR_DELIVERY,
    OrderStatus.OUT_FOR_DELIVERY,
    OrderStatus.DELIVERED,
];
const failedOrCanceledOrDelivered = [OrderStatus.CANCELLED, OrderStatus.FAILED, OrderStatus.DELIVERED];
const googleKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;
export const OrderStatusPage = () => {
    const location = useLocation();

    const getQueryParam = (param: string) => {
        const urlParams = new URLSearchParams(location.search);
        return urlParams.get(param);
    };
    const orderId = getQueryParam("orderId");
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(true);
    const [orderData, setOrderData] = useState<Order>();
    const [restaurantData, setRestaurantData] = useState<Restaurant>();
    const [customerData, setCustomerData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [openCancelDialog, setOpenCancelDialog] = useState(false);
    const [coords, setCoords] = useState<any>(null);
    const currentIndex = orderData ? statuses.indexOf(orderData.status) : -1;
    const navigate = useNavigate();
    useEffect(() => {
        const fetchOrderData = async () => {
            if (orderId) {
                try {
                    const orderDataReceived = await useGetOrder(orderId);
                    const restaurantDataReceived = await useGetRestaurant(orderDataReceived.restaurantId);
                    const customerDataReceived = await useGetCustomer(orderDataReceived.customerId);
                    const coords1 = await useGetCoords(customerDataReceived.address, googleKey);
                    const coords2 = await useGetCoords(restaurantDataReceived.address, googleKey);
                    setOrderData(orderDataReceived);
                    setRestaurantData(restaurantDataReceived);
                    setCustomerData(customerDataReceived);
                    setCoords([coords1, coords2]);
                    setLoading(false);
                } catch (error) {
                    console.error("Failed to fetch order data:", error);
                    setError("Failed to retrieve order details.");
                    setLoading(false);
                }
            }
        };

        fetchOrderData();
    }, [orderId]);

    useEffect(() => {
        if (!orderId) {
            setError("Order ID is missing.");
            setLoading(false);
            return;
        }

        const socket: Socket = io("http://localhost:3007", {
            query: { orderId },
        });

        socket.on("connect", () => {
            console.log("Socket connected for orderId:", orderId);
        });

        socket.on("order_status_change", (data) => {
            console.log("Order status update:", data);
            setOrderData((prevData) =>
                prevData
                    ? {
                          ...prevData,
                          status: data.newStatus,
                      }
                    : undefined
            );
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected.");
        });

        socket.on("error", (err) => {
            console.error("Error from server:", err);
            setError("Failed to retrieve order details.");
            setLoading(false);
        });

        return () => {
            socket.disconnect();
        };
    }, [orderId]);

    const handleReorder = async () => {
        if (orderData && customerData) {
            await useSetCart(orderData.items, customerData.id);
            await dispatch(fetchCart(customerData.id));
            navigate(`/cart`);
        }
    };

    return (
        <Container maxWidth={"xl"} sx={{ padding: { xs: "0 1rem", xl: "2rem 0rem" } }}>
            <Typography variant="h3" component={"h1"} fontWeight={"bold"} gutterBottom>
                Order Status
            </Typography>

            {loading ? (
                <Box
                    sx={{
                        height: "40vh",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Box sx={{ textAlign: "center", marginTop: 2 }}>
                    <Typography variant="h6" color="error">
                        {error}
                    </Typography>
                </Box>
            ) : orderData ? (
                <Box>
                    <Box sx={{ width: "100%", marginTop: 2, position: "relative" }}>
                        <Typography variant="h4" sx={{ minWidth: 100, marginBottom: 3, fontWeight: "bold" }}>
                            {formatOrderStatus(orderData.status)}
                        </Typography>

                        {!failedOrCanceledOrDelivered.includes(orderData.status) && (
                            <Box sx={{ display: "flex", gap: 1, width: { xs: "100%", md: "70%" }, height: "2rem" }}>
                                {statuses.map((status, index) => (
                                    <LinearProgress
                                        key={status}
                                        variant={
                                            index === currentIndex && index !== statuses.length - 1
                                                ? "indeterminate"
                                                : "determinate"
                                        }
                                        value={
                                            index < currentIndex ||
                                            (index === currentIndex && index === statuses.length - 1)
                                                ? 100
                                                : 0
                                        }
                                        sx={{
                                            height: 10,
                                            borderRadius: "3px",
                                            flex: index === currentIndex && index !== statuses.length - 1 ? 3 : 1,
                                            marginRight: 1,
                                        }}
                                    />
                                ))}
                            </Box>
                        )}
                        <Typography variant="body1">
                            {(() => {
                                switch (orderData.status) {
                                    case "CONFIRMED":
                                        return "Your order has been confirmed and is being processed.";
                                    case "PREPARING":
                                        return "Your order is being prepared.";
                                    case "READY_FOR_DELIVERY":
                                        return "Looking for a courier to deliver your order...";
                                    case "OUT_FOR_DELIVERY":
                                        return "Your courier is on the way!";
                                    case "DELIVERED":
                                        return "Your order has been delivered.";
                                    case "CANCELLED":
                                        return "Your order has been cancelled.";
                                    case "FAILED":
                                        return "Your order has failed.";
                                    default:
                                        return "";
                                }
                            })()}
                        </Typography>
                        {!failedOrCanceledOrDelivered.includes(orderData.status) && (
                            <Typography variant="body1">
                                <strong>Estimated delivery time:</strong> {orderData.deliveryTime}m
                            </Typography>
                        )}
                        {orderData.status === OrderStatus.CONFIRMED && (
                            <Button
                                variant={"outlined"}
                                sx={{
                                    position: { xs: "static", sm: "absolute" },
                                    display: { xs: "block", sm: "inline-flex" },
                                    right: { sm: "2%" },
                                    bottom: { sm: 0 },
                                    width: { xs: "100%", sm: "auto" },
                                    mt: { xs: 2, sm: 0 },
                                }}
                                color={"error"}
                                onClick={() => setOpenCancelDialog(true)}
                            >
                                Cancel Order
                            </Button>
                        )}
                        {failedOrCanceledOrDelivered.includes(orderData.status) && (
                            <Button
                                variant={"outlined"}
                                sx={{
                                    position: { xs: "static", sm: "absolute" },
                                    display: { xs: "block", sm: "inline-flex" },
                                    right: { sm: "2%" },
                                    bottom: { sm: 0 },
                                    width: { xs: "100%", sm: "auto" },
                                    mt: { xs: 2, sm: 0 },
                                }}
                                color={"primary"}
                                onClick={handleReorder}
                            >
                                Reorder
                            </Button>
                        )}
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    {restaurantData && customerData && (
                        <Box sx={{ width: "100%", margin: "2rem 0" }}>
                            <GoogleMapReact coordsCustomer={coords[0]} coordsRestaurant={coords[1]} />
                        </Box>
                    )}

                    <Typography variant="h6">Order Details</Typography>
                    <Typography variant="body1">
                        <strong>Restaurant:</strong> {orderData.restaurantName}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Total:</strong> {orderData.totalAmount.toFixed(2)}€
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6">Need Help?</Typography>
                    <Typography variant="body1">Contact us at:</Typography>
                    <Typography variant="body1">
                        <strong>Email:</strong> support@foodtodoor.com
                    </Typography>
                    <Typography variant="body1">
                        <strong>Phone:</strong> 666 777 666
                    </Typography>
                </Box>
            ) : (
                <Box sx={{ textAlign: "center", marginTop: 2 }}>
                    <Typography variant="h6" color="error">
                        Unexpected Error Occurred.
                    </Typography>
                </Box>
            )}

            <Box sx={{ marginTop: 3 }}>
                <Button variant="contained" color="primary" onClick={() => navigate("/orders")}>
                    See all orders
                </Button>
            </Box>
            {orderData?.id && (
                <CancelOrderDialog orderId={orderData.id} open={openCancelDialog} setOpen={setOpenCancelDialog} />
            )}
        </Container>
    );
};
