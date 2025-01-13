import { RestaurantDishes, RestaurantInfo, RestaurantSearchResults } from "../components";
import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetRestaurant } from "../../common/hooks";
import { useParams } from "react-router";
import { Restaurant } from "../../restaurant/types";

export const RestaurantDetail = () => {
    const { id } = useParams();
    const [searching, setSearching] = useState(false);
    const [loading, setLoading] = useState(false);
    const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null);

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

            <RestaurantInfo restaurantData={restaurantData!} />
            <RestaurantSearchResults searching={searching} setSearching={setSearching} />
            {!searching && <RestaurantDishes />}
        </Container>
    );
};
