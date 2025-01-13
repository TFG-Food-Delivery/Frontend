import React, { useState } from "react";
import { IconButton, Paper, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { addItemToCartThunk, removeItemFromCartThunk } from "../../store/cart";

import { Delete, Add, Remove } from "@mui/icons-material";

interface QuantitySelectorProps {
    userId: string;
    dishId: string;
    initialQuantity: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ userId, dishId, initialQuantity }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, items } = useSelector((state: any) => state.cart);
    const [localQuantity, setLocalQuantity] = useState(initialQuantity);

    const handleIncrease = async () => {
        const newQuantity = localQuantity + 1;
        setLocalQuantity(newQuantity);
        if (items.length == 0) {
            dispatch(addItemToCartThunk(userId, dishId, true));
            return;
        }
        dispatch(addItemToCartThunk(userId, dishId));
    };

    const handleDecrease = async () => {
        const newQuantity = Math.max(localQuantity - 1, 0);
        setLocalQuantity(newQuantity);
        dispatch(removeItemFromCartThunk(userId, dishId));
    };

    return (
        <Paper
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: "fit-content",
                borderRadius: "25px",
            }}
        >
            <IconButton color="primary" onClick={handleDecrease} disabled={loading}>
                {localQuantity === 1 ? <Delete /> : <Remove />}
            </IconButton>
            <Typography
                variant="body1"
                sx={{ minWidth: 32, textAlign: "center", fontWeight: "bold", color: "info.dark" }}
            >
                {localQuantity > 0 && localQuantity}
            </Typography>
            <IconButton color="primary" onClick={handleIncrease} disabled={loading}>
                <Add />
            </IconButton>
        </Paper>
    );
};

export default QuantitySelector;
