import { Add } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Dish } from "../types";

type Props = {
    dish: Dish;
    handleAddToCart: (dish: Dish) => void;
};

export const FeaturedDish = ({ dish, handleAddToCart }: Props) => {
    return (
        <Card sx={{ maxWidth: 345, margin: "0 auto" }} elevation={0}>
            <CardActionArea
                disableRipple
                sx={{
                    ".MuiCardActionArea-focusHighlight": {
                        background: "transparent",
                    },
                }}
            >
                <CardMedia
                    sx={{
                        height: 140,
                        borderRadius: "15px",
                        objectFit: "cover",
                        position: "relative",
                    }}
                    image={dish.image}
                >
                    <Add
                        onClick={() => handleAddToCart(dish)}
                        sx={{
                            position: "absolute",
                            bottom: "5px",
                            right: "5px",
                            color: "black",
                            bgcolor: "white",
                            fontSize: "40px",
                            borderRadius: "50%",
                            transition: "0.3s",
                            "&:hover": {
                                color: "background.default",
                                bgcolor: "info.dark",
                            },
                        }}
                    />
                </CardMedia>
                <CardContent
                    sx={{
                        padding: "1rem 0",
                    }}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {dish.name}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "text.secondary",
                            display: "inline-flex",
                            alignItems: "flex-start",
                            height: "50px",
                            gap: "4px",
                        }}
                    >
                        {dish.description}
                    </Typography>
                    <Typography variant={"body1"} sx={{ mt: 1, bottom: "0" }}>
                        {dish.price} €
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
