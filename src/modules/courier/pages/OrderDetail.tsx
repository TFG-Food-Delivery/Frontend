import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import { GoogleMapReact } from "../../common/components";
import { useLocationTracking, useOrderDetail } from "../hooks";
import { useSelector } from "react-redux";
import { OrderStatus } from "../../common/enum";
import { useOrderDialogs } from "../hooks/useOrderDetailDialogs";
import { AcceptDialog, DeliveryDialog, PickUpDialog } from "../components";
import { io, Socket } from "socket.io-client";

export const OrderDetailPage = () => {
    // State
    const { orderId } = useParams<{ orderId: string }>();
    const { uid: courierId } = useSelector((state: any) => state.auth);

    // Hooks
    const navigate = useNavigate();
    const { loading, orderData, setOrderData, restaurantData } = useOrderDetail(orderId!);
    const { coords, locationError, fetchLocation } = useLocationTracking();
    const {
        openAcceptDialog,
        setOpenAcceptDialog,
        openPickUpDialog,
        setOpenPickUpDialog,
        openDeliverDialog,
        setOpenDeliverDialog,
        pin,
        setPin,
        errorDeliverDialog,
        handleConfirmAccept,
        handleConfirmPickUp,
        handleConfirmDeliver,
        customerData,
    } = useOrderDialogs(orderData!, courierId, navigate);

    useEffect(() => {
        const socket: Socket = io("http://localhost:3007", {
            query: { orderId },
        });

        socket.on("connect", () => {
            console.log("Socket connected for courierId:", courierId);
        });

        socket.on("order_status_change", (data) => {
            console.log("Order status update:", data);
            setOrderData((prevData) =>
                prevData
                    ? {
                          ...prevData,
                          status: data.newStatus,
                      }
                    : null
            );
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

    useEffect(() => {
        if (restaurantData) {
            fetchLocation({ restaurantData, customerData });
        }
        console.log(customerData);
    }, [restaurantData, customerData]);

    // Dialog handlers
    const handleDialogToggle = (dialogSetter: (value: boolean) => void, value: boolean) => {
        dialogSetter(value);
    };

    const renderActionButton = () => {
        if (!orderData) return null;

        if (orderData.courierId === "") {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDialogToggle(setOpenAcceptDialog, true)}
                    sx={{ mt: 2 }}
                >
                    Accept Order
                </Button>
            );
        }

        if (orderData.status === OrderStatus.READY_FOR_DELIVERY && orderData.courierId === courierId) {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDialogToggle(setOpenPickUpDialog, true)}
                    sx={{ mt: 2 }}
                >
                    Pick up Order
                </Button>
            );
        }

        if (orderData.status === OrderStatus.OUT_FOR_DELIVERY && orderData.courierId === courierId) {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDialogToggle(setOpenDeliverDialog, true)}
                    sx={{ mt: 2 }}
                >
                    Deliver Order
                </Button>
            );
        }

        return (
            <Typography variant="body1" color="error">
                This order has been accepted by another courier.
            </Typography>
        );
    };

    return (
        <Container maxWidth="xl">
            <h1>Order Detail</h1>
            {loading ? (
                <CircularProgress />
            ) : locationError ? (
                <Typography variant="body1" color="error">
                    {locationError}
                </Typography>
            ) : (
                <>
                    {orderData && <p>Order ID: {orderData.id}</p>}
                    {restaurantData && <p>Restaurant: {restaurantData.name}</p>}

                    {coords && coords.length > 0 ? (
                        <Box style={{ width: "100%" }}>
                            <GoogleMapReact
                                coordsCourier={coords[0]}
                                coordsCustomer={
                                    orderData?.status === OrderStatus.OUT_FOR_DELIVERY ? coords[1] : undefined
                                }
                                coordsRestaurant={
                                    orderData?.status === OrderStatus.READY_FOR_DELIVERY ? coords[1] : undefined
                                }
                            />
                        </Box>
                    ) : (
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40vh" }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {renderActionButton()}

                    <AcceptDialog
                        open={openAcceptDialog}
                        onClose={() => setOpenAcceptDialog(false)}
                        onConfirm={handleConfirmAccept}
                    />

                    <PickUpDialog
                        open={openPickUpDialog}
                        onClose={() => setOpenPickUpDialog(false)}
                        onConfirm={handleConfirmPickUp}
                    />

                    <DeliveryDialog
                        open={openDeliverDialog}
                        onClose={() => setOpenDeliverDialog(false)}
                        onConfirm={handleConfirmDeliver}
                        pin={pin}
                        onPinChange={(pin) => setPin(pin)}
                        error={errorDeliverDialog}
                    />
                </>
            )}
        </Container>
    );
};
