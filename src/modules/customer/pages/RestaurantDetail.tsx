import {
    DifferentRestaurantDialog,
    DishDialog,
    RestaurantDishes,
    RestaurantInfo,
    RestaurantSearchResults,
} from "../components";
import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetRestaurant } from "../../common/hooks";
import { useParams } from "react-router";
import { Restaurant } from "../../restaurant/types";
import { Dish } from "../types";

export const RestaurantDetail = () => {
    const { id } = useParams();
    const [searching, setSearching] = useState(false);
    const [loading, setLoading] = useState(false);
    const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
    const [openDifferentRestDialog, setOpenDifferentRestDialog] = useState(false);
    const [dishIdOpt, setDishIdOpt] = useState<string | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                setLoading(true);
                const restaurantDataRetrieved = await useGetRestaurant(id);
                setRestaurantData(restaurantDataRetrieved);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    function handleOpenDialog({
        dish,
        categoryId,
    }: {
        dish?: Dish | undefined;
        categoryId?: string | undefined;
    }): void {
        console.log("handleOpenDialog", dish, categoryId);
        setSelectedDish(dish || null);
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedDish(null);
    };

    return (
        <Container maxWidth="xl" sx={{ position: "relative" }}>
            <Box
                sx={{
                    position: "absolute",
                    padding: "0",
                    top: "-150px",
                    left: "0",
                    width: "100%",
                    height: "300px",
                    backgroundImage: `url(${restaurantData?.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    zIndex: -10,
                    filter: "blur(3px)",
                }}
            />

            <RestaurantInfo restaurantData={restaurantData!} handleOpenDialog={handleOpenDialog} />
            <RestaurantSearchResults
                searching={searching}
                setSearching={setSearching}
                handleOpenDialog={handleOpenDialog}
            />
            {!searching && <RestaurantDishes handleOpenDialog={handleOpenDialog} />}
            <DishDialog
                open={openDialog}
                setOpen={setOpenDialog}
                onClose={handleCloseDialog}
                selectedDish={selectedDish}
                setOpenDifferentRestDialog={setOpenDifferentRestDialog}
                setDishIdOpt={setDishIdOpt}
            />
            <DifferentRestaurantDialog
                dishId={dishIdOpt}
                open={openDifferentRestDialog}
                setOpen={setOpenDifferentRestDialog}
            />
        </Container>
    );
};
