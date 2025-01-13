import { Card, CardContent, Typography, Button, CardMedia } from "@mui/material";
import { Dish } from "../types";

interface RestaurantDishCardProps {
    dish: Dish;
    openDialog: ({ dish, categoryId }: { dish?: Dish; categoryId?: string }) => void;
}

const RestaurantDishCard = ({ dish, openDialog }: RestaurantDishCardProps) => {
    return (
        <Card
            sx={{
                maxWidth: 345,
                m: { xs: "auto", md: 1 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <CardMedia component="img" height="140" image={dish.image as string} alt={dish.name} />
            <CardContent>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ height: { xs: "auto", md: "2.5rem", lg: "2.5rem" }, overflow: "clip" }}
                >
                    {dish.name}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mt: 1,
                        display: { xs: "block", sm: "none", md: "block" },
                        height: { xs: "auto", md: "5.5rem", lg: "7rem" },
                    }}
                >
                    {dish.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                    {dish.price?.toFixed(2) ?? 0}€
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => openDialog({ dish })}
                    sx={{ mt: 2 }}
                    fullWidth
                >
                    Añadir
                </Button>
            </CardContent>
        </Card>
    );
};

export default RestaurantDishCard;
