import { Add, AddShoppingCart, Close, Delete, Remove, WarningAmber } from "@mui/icons-material";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Typography,
    IconButton,
    DialogActions,
    Button,
    Paper,
} from "@mui/material";
import { useState } from "react";
import { Dish } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCartThunk, removeItemFromCartThunk } from "../../store/cart";
import { AppDispatch } from "../../store";

interface DishDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onClose: () => void;
    selectedDish: Dish | null;
    setOpenDifferentRestDialog: (open: boolean) => void;
    setDishIdOpt: (dishId: string) => void;
}

export const DishDialog = ({
    open,
    onClose,
    selectedDish,
    setOpenDifferentRestDialog,
    setDishIdOpt,
}: DishDialogProps) => {
    const [quantity, setQuantity] = useState(0);
    const dispatch = useDispatch<AppDispatch>();
    const { uid: userId } = useSelector((state: any) => state.auth);
    const { restaurantId: cartRestaurantId, items } = useSelector((state: any) => state.cart);

    const handleAddToCart = (dish: Dish) => {
        if (cartRestaurantId != null) {
            if (dish.restaurantId !== cartRestaurantId) {
                setOpenDifferentRestDialog(true);
                setDishIdOpt(dish.id);
                return;
            }
        }
        if (items.length == 0) {
            dispatch(addItemToCartThunk(userId, dish.id, true));
            return;
        }
        dispatch(addItemToCartThunk(userId, dish.id));
    };

    const handleRemoveFromCart = (dish: Dish) => {
        if (cartRestaurantId != null) {
            if (dish.restaurantId !== cartRestaurantId) {
                setOpenDifferentRestDialog(true);
                setDishIdOpt(dish.id);
                return;
            }
        }
        dispatch(removeItemFromCartThunk(userId, dish.id));
    };

    if (!selectedDish) return null;

    const cartItem = items.find((item: any) => item.dishId === selectedDish.id);
    const itemQuantity = cartItem?.quantity ?? 0;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {selectedDish.name}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 3 }}>
                <Box sx={{ mb: 2 }}>
                    <img
                        src={selectedDish.image as string}
                        alt={selectedDish.name}
                        style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                            borderRadius: "8px",
                        }}
                    />
                </Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedDish.description}
                </Typography>
                {selectedDish.allergens.length > 0 && (
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <Box component={"span"}>
                            <WarningAmber color="warning" />
                        </Box>
                        <Typography variant="body1" color="warning">
                            This dish contains the following allergens:
                            <Typography variant="body1" component="span" color="warning" fontWeight="bold" ml={1}>
                                {selectedDish.allergens.map((allergen) => allergen).join(", ")}
                            </Typography>
                        </Typography>
                    </Box>
                )}
                <Typography variant="h6" color="primary">
                    {selectedDish.price?.toFixed(2) ?? 0}€
                </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "flex-end", py: 2, px: 3 }}>
                <Button onClick={onClose}>Cancelar</Button>
                {!cartItem ? (
                    <Button
                        onClick={() => handleAddToCart(selectedDish)}
                        variant="contained"
                        endIcon={<AddShoppingCart />}
                    >
                        Add to cart
                    </Button>
                ) : (
                    <Paper
                        elevation={3}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            borderRadius: "25px",
                        }}
                    >
                        <IconButton onClick={() => handleRemoveFromCart(selectedDish)}>
                            {itemQuantity === 1 ? <Delete color="error" /> : <Remove color="primary" />}
                        </IconButton>
                        <Typography variant="h6">{itemQuantity}</Typography>
                        <IconButton onClick={() => handleAddToCart(selectedDish)}>
                            <Add color="primary" />
                        </IconButton>
                    </Paper>
                )}
            </DialogActions>
        </Dialog>
    );
};
