import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Socket, io } from "socket.io-client";

export const PaymentsCancelPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [orderId, setOrderId] = useState<string | null>(null);

    // Función para obtener el query param
    const getQueryParam = (param: string) => {
        const urlParams = new URLSearchParams(location.search);
        return urlParams.get(param);
    };

    useEffect(() => {
        const orderId = getQueryParam("orderId");
        if (!orderId) {
            console.error("Order ID is missing.");
            return;
        }

        setOrderId(orderId);

        const socket: Socket = io("http://localhost:3006", {
            query: { orderId },
        });

        // Emitir evento cuando el usuario abandona la sesión de pago
        socket.emit("payment_session_abandoned", { orderId });

        return () => {
            socket.disconnect();
        };
    }, [location]);

    // Página de cancelación
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
            }}
        >
            <Typography variant="h4" color="error">
                Payment Cancelled
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 2 }}>
                We're sorry, but your payment has been cancelled.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Order ID: {orderId}
            </Typography>
            <Box sx={{ marginTop: 3 }}>
                <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                    Please try again or contact support if you have any questions.
                </Typography>
            </Box>
            <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 3 }}
                onClick={() => {
                    navigate("/cart");
                }}
            >
                Try Again
            </Button>
        </Box>
    );
};
