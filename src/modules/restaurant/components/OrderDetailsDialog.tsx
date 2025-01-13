import { FC } from "react";
import { Dialog, DialogTitle, DialogContent, Box, Typography, DialogActions, Button, Divider } from "@mui/material";
import { OrderStatus } from "../../common/enum";
import { Order } from "../../common/types";
import { formatDate, formatOrderStatus } from "../../common/utils";
import { useUpdateOrderStatus } from "../hooks";

type Props = {
    selectedOrder: Order | null;
    setSelectedOrder: (order: Order | null) => void;
};

export const OrderDetailsDialog: FC<Props> = ({ selectedOrder, setSelectedOrder }) => {
    const handleStatusChange = (newStatus: OrderStatus) => {
        if (selectedOrder) {
            const payload: any = { newStatus };
            if (newStatus === OrderStatus.READY_FOR_DELIVERY) {
                payload.location = { latitude: 0, longitude: 0 };
            }
            handleUpdateStatus(selectedOrder.id, payload);
            handleCloseDialog();
        }
    };

    const handleCloseDialog = () => {
        setSelectedOrder(null);
    };

    const handleUpdateStatus = async (orderId: string, payload: any) => {
        await useUpdateOrderStatus(orderId, payload);
    };

    return (
        <Dialog open={!!selectedOrder} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
            <DialogTitle>Order Details</DialogTitle>
            <DialogContent>
                {selectedOrder && (
                    <Box>
                        <Typography variant="body1">
                            <strong>Order ID:</strong> {selectedOrder.id}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Order Date:</strong> {formatDate(selectedOrder.date)}h
                        </Typography>
                        <Typography variant="body1">
                            <strong>Status:</strong>{" "}
                            {selectedOrder.courierId != ""
                                ? "Incoming Courier"
                                : formatOrderStatus(selectedOrder.status)}
                        </Typography>

                        <Typography variant="h6" sx={{ mt: 2 }}>
                            <strong>Items:</strong>
                        </Typography>
                        {selectedOrder.items.map((item, index) => (
                            <>
                                <Box key={item.name} sx={{ display: "flex", justifyContent: "space-between", my: 1 }}>
                                    <Typography variant="body1">{item.name}</Typography>
                                    <Typography variant="body1">
                                        {item.quantity} x {item.price}€
                                    </Typography>
                                </Box>
                                <Divider sx={{ mb: 2 }} />
                            </>
                        ))}
                        <Typography variant="body1" textAlign={"right"}>
                            <strong>Total Amount:</strong> {selectedOrder.totalAmount}€
                        </Typography>
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                    Close
                </Button>

                {/* Botones según el estado de la orden */}
                {selectedOrder?.status === "CONFIRMED" && (
                    <Button
                        onClick={() => handleStatusChange(OrderStatus.PREPARING)}
                        color="secondary"
                        variant="contained"
                    >
                        Mark as Preparing
                    </Button>
                )}

                {selectedOrder?.status === "PREPARING" && (
                    <Button
                        onClick={() => handleStatusChange(OrderStatus.READY_FOR_DELIVERY)}
                        color="secondary"
                        variant="contained"
                    >
                        Mark as Ready for Delivery
                    </Button>
                )}

                {selectedOrder?.status === "OUT_FOR_DELIVERY" && (
                    <Typography variant="body2" color="textSecondary">
                        The order is already out for delivery.
                    </Typography>
                )}
            </DialogActions>
        </Dialog>
    );
};
