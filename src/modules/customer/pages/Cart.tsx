import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import QuantitySelector from "../components/QuantitySelector";
import { AppDispatch } from "../../store";
import { fetchCart } from "../../store/cart";
import { CartViewItem } from "../types";
import { useCheckout } from "../hooks";
import { useNavigate } from "react-router";

export const CartPage = () => {
    const { uid: userId } = useSelector((state: any) => state.auth);
    const { restaurantId, items: cartItems } = useSelector((state: any) => state.cart); // Estado del carrito desde Redux
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        if (cartItems.length > 0) {
            dispatch(fetchCart(userId));
        }
    }, []);

    async function handleCheckout(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
        const orderId = await useCheckout(userId, restaurantId, cartItems);

        navigate(`/customer/order/payment/${orderId}`);
    }

    return (
        <Box sx={{ m: "2rem 0" }}>
            <Container maxWidth="lg">
                <Typography variant="h2" component={"h1"} fontWeight={"bold"}>
                    Cart
                </Typography>

                <Box sx={{ mt: "2rem" }}>
                    {cartItems.length > 0 ? (
                        <Stack spacing={4}>
                            {cartItems.map((item: CartViewItem) => (
                                <Box
                                    key={item.id}
                                    sx={{
                                        borderBottom: "2px solid #e0e0e0",

                                        padding: "1.5rem",
                                        display: "flex",
                                        flexDirection: { xs: "column", sm: "row" },
                                        justifyContent: { xs: "center", sm: "space-between" },
                                        alignItems: "center",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: "2rem",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            width: "98%",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: "80px",
                                                height: "80px",
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                alignItems: "center",
                                                overflow: "hidden",
                                                borderRadius: "10px",
                                            }}
                                        >
                                            <img
                                                src={item.image}
                                                alt="food image"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    overflow: "clip",
                                                    overflowClipMargin: "content-box",
                                                }}
                                            />
                                        </Box>

                                        <Typography variant="h6" fontWeight={"bold"} sx={{ color: "info.dark" }}>
                                            {item.name}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: { xs: "row-reverse", sm: "row" },
                                            justifyContent: { xs: "flex-start", sm: "flex-end" },
                                            gap: { xs: "1rem", sm: "2rem" },
                                            alignItems: "center",
                                            width: "98%",
                                            marginTop: { xs: "1rem", sm: "0" },
                                        }}
                                    >
                                        <QuantitySelector
                                            userId={userId}
                                            dishId={item.dishId}
                                            initialQuantity={item.quantity}
                                        />
                                        <Typography variant="body1" fontWeight={"bold"} sx={{ color: "info.dark" }}>
                                            {(item.price * item.quantity).toFixed(2)}€
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                            <Box sx={{ mt: "2rem", textAlign: "right" }}>
                                <Button variant="contained" color="primary" onClick={handleCheckout}>
                                    <Typography variant="body1" fontWeight={"bold"}>
                                        Checkout
                                    </Typography>
                                </Button>
                            </Box>
                        </Stack>
                    ) : (
                        <Box sx={{ textAlign: "center", mt: "4rem" }}>
                            <Typography variant="h5" fontWeight={"bold"} sx={{ color: "text.secondary" }}>
                                Your cart is empty. Add some items to get started!
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ mt: "2rem" }}
                                onClick={() => navigate("/feed")}
                            >
                                Browse Restaurants
                            </Button>
                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    );
};
