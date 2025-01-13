import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { io, Socket } from "socket.io-client";

export const PaymentsPage = () => {
    const [status, setStatus] = useState<"waiting" | "redirecting" | "error">("waiting");

    const { orderId } = useParams<{ orderId: string }>();

    if (!orderId) {
        return <p>Error: Missing orderId</p>;
    }

    useEffect(() => {
        const socket: Socket = io("http://localhost:3006", {
            query: { orderId },
        });

        socket.on("connect", () => {
            console.log(`Connected to WebSocket for orderId: ${orderId}`);
        });

        socket.on("payment_session_created", (data: { orderId: string; paymentSessionUrl: string }) => {
            console.log("Payment session created:", data);

            if (data.orderId === orderId) {
                setStatus("redirecting");
                window.location.href = data.paymentSessionUrl;
            }
        });

        socket.on("payment_success", (data) => {
            console.log("Payment succeeded:", data);
            window.location.href = `/success?orderId=${data.orderId}`;
        });

        socket.on("disconnect", (reason) => {
            if (reason === "io server disconnect") {
                setStatus("error");
                console.error("Disconnected by server.");
            }
        });

        socket.on("connect_error", (error) => {
            setStatus("error");
            console.error("Connection error:", error);
        });

        return () => {
            socket.emit("user_disconnected", { orderId });
            socket.disconnect();
        };
    }, [orderId]);

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40vh" }}>
            {status !== "error" && <CircularProgress />}
            {status === "error" && (
                <p>An error occurred while connecting to the payment service. Please try again later.</p>
            )}
        </Box>
    );
};
