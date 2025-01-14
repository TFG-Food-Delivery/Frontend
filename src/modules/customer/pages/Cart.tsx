import { Box, Button, Checkbox, Container, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import QuantitySelector from "../components/QuantitySelector";
import { AppDispatch } from "../../store";
import { fetchCart } from "../../store/cart";
import { CartViewItem } from "../types";
import { useCheckout } from "../hooks";
import { useNavigate } from "react-router";
import { useGetCustomer } from "../../common/hooks";

export const CartPage = () => {
    const { uid: userId } = useSelector((state: any) => state.auth);
    const [loyaltyPoints, setLoyaltyPoints] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(2.99);
    const [useLoyaltyPoints, setUseLoyaltyPoints] = useState(false);
    const { restaurantId, items: cartItems } = useSelector((state: any) => state.cart); // Estado del carrito desde Redux
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        if (cartItems.length > 0) {
            dispatch(fetchCart(userId));
        }

        const getCustomer = async () => {
            try {
                const res = await useGetCustomer(userId);
                if (res) {
                    setLoyaltyPoints(res.loyaltyPoints);
                }
            } catch (error) {
                console.error("Error fetching customer data:", error);
            }
        };

        getCustomer();
    }, [userId]);

    const handleLoyaltyPointsToggle = () => {
        setUseLoyaltyPoints((prev) => !prev);
        if (!useLoyaltyPoints) {
            setLoyaltyPoints((prev) => prev - deliveryFee * 100);
        } else {
            setLoyaltyPoints((prev) => prev + deliveryFee * 100);
        }
    };

    async function handleCheckout(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
        const orderId = await useCheckout(userId, restaurantId, cartItems, useLoyaltyPoints);

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
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1rem",
                                    justifyContent: { xs: "center", md: "flex-end" },
                                    alignItems: { xs: "center", md: "flex-end" },
                                }}
                            >
                                <Typography variant="body1" fontWeight={"bold"} sx={{ color: "info.dark" }}>
                                    Loyalty Points: {loyaltyPoints}
                                </Typography>
                                <Typography variant="body1" fontWeight={"bold"} sx={{ color: "info.dark" }}>
                                    Delivery Fees:
                                    <Typography
                                        variant="body1"
                                        component={"span"}
                                        fontWeight={"bold"}
                                        sx={{
                                            color: useLoyaltyPoints ? "text.disabled" : "info.dark",
                                            textDecoration: useLoyaltyPoints ? "line-through" : "none",
                                            ml: "0.5rem",
                                        }}
                                    >
                                        {deliveryFee}€
                                    </Typography>
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    mt: "2rem",
                                    textAlign: "right",
                                    display: "flex",
                                    flexDirection: { xs: "column", md: "row" },
                                    justifyContent: { xs: "center", md: "flex-end" },
                                    alignItems: { xs: "center", md: "flex-end" },
                                    gap: { xs: "1rem", md: "2rem" },
                                }}
                            >
                                {loyaltyPoints >= deliveryFee * 100 && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                        }}
                                    >
                                        <Checkbox checked={useLoyaltyPoints} onChange={handleLoyaltyPointsToggle} />
                                        <Typography variant="body2" component="span">
                                            Use Loyalty Points to cover delivery fee
                                        </Typography>
                                    </Box>
                                )}
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
