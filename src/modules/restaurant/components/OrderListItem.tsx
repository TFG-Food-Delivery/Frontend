import { Paper, Box, Typography, Button } from "@mui/material";
import { Order } from "../../common/types";
import { formatOrderStatus } from "../../common/utils";
import { OrderStatus } from "../../common/enum";

type Props = {
    order: Order;
    setSelectedOrder: (order: Order) => void;
};

const failedOrCanceledOrDelivered = [OrderStatus.CANCELLED, OrderStatus.FAILED, OrderStatus.DELIVERED];

export const OrderListItem = ({ order, setSelectedOrder }: Props) => {
    const handleOpenDialog = (order: Order) => {
        setSelectedOrder(order);
    };

    return (
        <Paper
            className={`order-paper ${order.status.toLowerCase()}`}
            elevation={order.courierId != "" && !failedOrCanceledOrDelivered.includes(order.status) ? 0 : 3}
        >
            <Box>
                <Typography variant="body1">
                    <strong>Order ID:</strong> {order.id}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    <strong>Status:</strong>{" "}
                    {order.courierId != "" && !failedOrCanceledOrDelivered.includes(order.status)
                        ? "Incoming Courier"
                        : formatOrderStatus(order.status)}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: { xs: "space-between", sm: "flex-end" },
                    alignItems: "center",
                    width: "98%",
                    gap: { xs: 0, sm: 3 },
                }}
            >
                <Typography variant="body1" fontWeight={"bold"}>
                    Total: ${order.totalAmount}
                </Typography>
                <Button variant="contained" color="primary" onClick={() => handleOpenDialog(order)}>
                    See Details
                </Button>
            </Box>
        </Paper>
    );
};
