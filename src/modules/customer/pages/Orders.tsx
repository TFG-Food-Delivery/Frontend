import { Box, Button, Container, LinearProgress, Pagination, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetCustomerOrders } from "../hooks";
import { useSelector } from "react-redux";

import { ArrowRightAlt } from "@mui/icons-material";
import { formatDate, formatOrderStatus } from "../../common/utils";

import { useNavigate } from "react-router";
import { OrderStatus } from "../../common/enum";
import { Order } from "../../common/types";

const excludedStatus = [OrderStatus.DELIVERED, OrderStatus.CANCELLED, OrderStatus.FAILED];

export const OrdersPage = () => {
    const [ordersData, setOrdersData] = useState<Order[]>([]);
    const [maxPages, setMaxPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState(false);
    const { uid } = useSelector((state: any) => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        const getCustomerOrders = async () => {
            setLoading(true);
            const ordersDataRetrieved = await useGetCustomerOrders(uid, currentPage);

            setOrdersData(ordersDataRetrieved.data);
            setLoading(false);
            setMaxPages(ordersDataRetrieved.meta.lastPage);
        };
        getCustomerOrders();
    }, [currentPage, uid]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const handleClick = (orderId: string) => {
        navigate(`/payments/success?orderId=${orderId}`);
    };

    return (
        <Container maxWidth="xl">
            <Typography variant="h3" component={"h1"} fontWeight={"bold"} gutterBottom>
                Orders
            </Typography>

            {loading ? (
                <Skeleton variant="rectangular" height={"4rem"} />
            ) : (
                <Stack spacing={3} sx={{ mt: 4 }}>
                    {ordersData.map((order, index) => {
                        return (
                            <Paper
                                key={order.id}
                                elevation={3}
                                sx={{
                                    position: "relative",
                                    padding: "1rem",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: { xs: "flex-start", sm: "center" },
                                    flexDirection: { xs: "column", sm: "row" },
                                    cursor: "pointer",
                                    overflow: "hidden",
                                    transition: "all 0.4s",
                                    "&:hover": {
                                        backgroundColor: "#f5f5f5",
                                        scale: 1.01,
                                    },
                                }}
                                onClick={() => handleClick(order.id)}
                            >
                                <Typography variant="h5" fontWeight={"bold"}>
                                    {order.restaurantName}
                                </Typography>
                                <Stack sx={{ mt: { xs: "1rem", sm: "0" } }}>
                                    <Typography variant="body1">
                                        <strong>Order Date:</strong> {formatDate(order.date)}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Status:</strong> {formatOrderStatus(order.status)}
                                    </Typography>
                                </Stack>
                                <Button
                                    onClick={() => handleClick(order.id)}
                                    sx={{ alignSelf: { xs: "flex-end", sm: "inherit" } }}
                                >
                                    See Details <ArrowRightAlt sx={{ ml: 1 }} />
                                </Button>
                                {!excludedStatus.includes(order.status) && (
                                    <LinearProgress sx={{ position: "absolute", left: 0, bottom: 0, width: "100%" }} />
                                )}
                            </Paper>
                        );
                    })}
                </Stack>
            )}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Pagination count={maxPages} page={currentPage} onChange={handleChange} />
            </Box>
        </Container>
    );
};
