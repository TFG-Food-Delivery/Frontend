import { Inbox, Refresh } from "@mui/icons-material";
import { Box, Container, IconButton, Pagination, Stack, Typography } from "@mui/material";
import { OrderDetailsDialog, OrderListItem, SearchOrdersBar } from "../components";
import { useEffect, useState } from "react";
import { useGetCompletedOrders } from "../hooks";
import { useSelector } from "react-redux";
import { Order } from "../../common/types";
import { useLocation, useNavigate } from "react-router";

type Props = {};

export const CompletedOrdersPage = (props: Props) => {
    const { uid: restaurantId } = useSelector((state: any) => state.auth);
    const location = useLocation();
    const navigate = useNavigate();
    const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [maxPages, setMaxPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const initialQuery = params.get("q") || "";
        setSearchTerm(initialQuery);
    }, [location.search]);

    useEffect(() => {
        const getCompletedOrders = async () => {
            const completedOrders = await useGetCompletedOrders(restaurantId, currentPage, searchTerm);

            setCompletedOrders(completedOrders.data);
            setMaxPages(completedOrders.meta.lastPage);
        };
        getCompletedOrders();
    }, [currentPage, restaurantId, searchTerm]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const handleResetSearch = (event: React.ChangeEvent<unknown>) => {
        setSearchTerm("");
        navigate(`/orders/completed`, { replace: true });
    };

    return (
        <Container maxWidth="xl">
            <Typography variant="h3" component={"h1"} gutterBottom>
                Completed Orders
            </Typography>
            <Box sx={{ display: "flex", mb: 2 }}>
                <SearchOrdersBar />
                <IconButton onClick={handleResetSearch}>
                    <Refresh />
                </IconButton>
            </Box>
            <Stack alignItems="center" justifyContent="center">
                {completedOrders.length === 0 ? (
                    <Box textAlign="center" height="70vh">
                        <Inbox color="disabled" sx={{ fontSize: 80, mb: 2 }} />
                        <Typography variant="h6" color="textSecondary">
                            No orders found
                        </Typography>
                    </Box>
                ) : (
                    completedOrders.map((order) => (
                        <OrderListItem key={order.id} order={order} setSelectedOrder={setSelectedOrder} />
                    ))
                )}
            </Stack>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Pagination count={maxPages} page={currentPage} onChange={handleChange} />
            </Box>
            <OrderDetailsDialog selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
        </Container>
    );
};
