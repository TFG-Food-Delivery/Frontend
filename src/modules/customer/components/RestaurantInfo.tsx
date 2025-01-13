import { Box, Paper, Typography } from "@mui/material";

import { DeliveryDining, HourglassTop, ThumbUpOffAlt } from "@mui/icons-material";
import { SearchToggle } from "./SearchToggle";
import { Restaurant } from "../../restaurant/types";
import { Dish } from "../types";

type Props = {
    restaurantData: Restaurant;
    handleOpenDialog: (dish: Dish) => void;
};

export const RestaurantInfo = ({ restaurantData, handleOpenDialog }: Props) => {
    return (
        <Paper
            elevation={5}
            sx={{
                position: "relative",
                padding: { xs: "1rem 1rem 3rem", sm: "1rem 3rem 3rem" },
                borderRadius: "0 25px 25px",
                zIndex: 1,
            }}
        >
            <SearchToggle restaurantName={restaurantData?.name || ""} />

            <Typography
                variant="h3"
                component={"h1"}
                fontWeight={"bold"}
                sx={{ textAlign: { xs: "center", sm: "left" } }}
            >
                {restaurantData?.name}
            </Typography>
            <Box
                sx={{
                    width: { xs: "75%", sm: "25%", md: "20%", lg: "15%" },
                    margin: { xs: "2rem auto 0", sm: "2rem 0 0" },
                    display: "flex",
                    justifyContent: "space-around",
                }}
            >
                <Typography
                    variant={"body2"}
                    sx={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "5px" }}
                    fontWeight={"bold"}
                >
                    <ThumbUpOffAlt
                        sx={{
                            bgcolor: "#fbeefc",
                            width: "30px",
                            height: "30px",
                            borderRadius: "25px",
                        }}
                    />
                    {restaurantData?.ratingAvg}
                </Typography>
                <Typography
                    variant={"body2"}
                    sx={{
                        display: "inline-flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "5px",
                    }}
                    fontWeight={"bold"}
                >
                    <HourglassTop
                        sx={{
                            bgcolor: "#fbeefc",
                            width: "30px",
                            height: "30px",
                            borderRadius: "25px",
                        }}
                    />
                    20-30'
                </Typography>
                <Typography
                    variant={"body2"}
                    sx={{
                        display: "inline-flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "5px",
                    }}
                    fontWeight={"bold"}
                >
                    <DeliveryDining
                        sx={{
                            bgcolor: "#fbeefc",
                            width: "30px",
                            height: "30px",
                            borderRadius: "25px",
                        }}
                    />
                    2.99€
                </Typography>
            </Box>
        </Paper>
    );
};
