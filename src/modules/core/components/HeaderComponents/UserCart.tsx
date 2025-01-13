import { ShoppingCartRounded } from "@mui/icons-material";
import { Badge, Box } from "@mui/material";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { CartViewItem } from "../../../customer/types";

export const UserCart = () => {
    const { items } = useSelector((state: any) => state.cart);
    const totalQuantity = useMemo(
        () => items.reduce((acc: number, item: CartViewItem) => acc + item.quantity, 0),
        [items]
    );
    return (
        <Box sx={{ marginRight: { xs: "0", sm: "2rem" } }}>
            <Link to="/cart" style={{ textDecoration: "none" }}>
                <Badge
                    badgeContent={totalQuantity}
                    color="success"
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                >
                    <ShoppingCartRounded style={{ fontSize: 30 }} />
                </Badge>
            </Link>
        </Box>
    );
};
