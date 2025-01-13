import { Card, CardMedia, CardContent, Box, Typography, IconButton } from "@mui/material";
import { Dish } from "../../customer/types";
import { Delete, Edit } from "@mui/icons-material";

type Props = {
    dish: Dish;
    openDialog: ({ dish, categoryId }: { dish?: Dish; categoryId?: string }) => void;
};

export const DishCard = ({ dish, openDialog }: Props) => {
    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                "&:hover": {
                    transform: "translateY(-4px)",
                    transition: "transform 0.2s ease-in-out",
                },
            }}
        >
            <CardMedia component="img" height="140" image={dish.image as string} alt={dish.name} />
            <CardContent sx={{ flexGrow: 1 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                    }}
                >
                    <Typography gutterBottom variant="h6" component="div">
                        {dish.name}
                    </Typography>
                    <Typography variant="h6" color="primary">
                        {dish.price}€
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    {dish.description}
                </Typography>
            </CardContent>
            <Box sx={{ p: 1, display: "flex", justifyContent: "flex-end" }}>
                <IconButton size="small" onClick={() => openDialog({ dish })} sx={{ mr: 1 }}>
                    <Edit />
                </IconButton>
                <IconButton size="small" color="error">
                    <Delete />
                </IconButton>
            </Box>
        </Card>
    );
};
