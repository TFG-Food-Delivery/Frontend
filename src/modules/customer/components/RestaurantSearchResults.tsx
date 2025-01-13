import { Grid2 as Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { DishItem } from "./DishItem";
import { useSearchRestaurantDishes } from "../hooks";

type Props = {
    searching: boolean;
    setSearching: (searching: boolean) => void;
};

export const RestaurantSearchResults = ({ searching, setSearching }: Props) => {
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");

    const { id: restaurantId } = useParams();
    const { results, loading, error } = useSearchRestaurantDishes({ restaurantId, searchTerm });

    useEffect(() => {
        const newParams = new URLSearchParams(location.search);
        const newQuery = newParams.get("q") || "";

        setSearchTerm(newQuery);

        if (newQuery && newQuery != "") {
            setSearching(true);
        } else {
            setSearching(false);
        }
    }, [location.search, setSearching]);

    if (!searching) return null;

    return (
        <Grid sx={{ mt: 4 }} container spacing={3} justifyContent={{ xs: "center", md: "flex-start" }}>
            {results.length > 0 ? (
                <>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5" fontWeight={"bold"}>
                            {results.length} results found
                        </Typography>
                    </Grid>

                    {results.map((dish) => (
                        <Grid size={{ xs: 12, sm: 8, md: 6 }} key={dish.id}>
                            <DishItem dish={dish}></DishItem>
                        </Grid>
                    ))}
                </>
            ) : (
                <Typography variant="h5" sx={{ m: "auto", mt: "5%", color: "info.light" }}>
                    No results found.
                </Typography>
            )}
        </Grid>
    );
};
