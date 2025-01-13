import { ArrowRightAlt } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";

type Props = {
    dish: {
        id: string;
        name: string;
        description: string;
        price: number;
        image: string;
    };
};

export const DishItem = ({ dish }: Props) => {
    return (
        <Paper
            key={dish.id}
            elevation={2}
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "20px",
                    width: { xs: "70%", lg: "80%" },
                }}
            >
                <Typography variant="h6" fontWeight={"bold"}>
                    {dish.name}
                </Typography>
                <Typography variant="body1" display={{ xs: "none", sm: "block" }}>
                    {dish.description}
                </Typography>
                <Typography variant="body1" fontWeight={"bold"} sx={{ mt: 2, textAlign: "right" }}>
                    {dish.price}€
                </Typography>
            </Box>
            <Box
                component="img"
                src={dish.image}
                alt={dish.name}
                sx={{
                    width: { xs: "10rem", md: "10rem" },
                    height: { xs: "10rem", md: "10rem" },
                    objectFit: "cover",
                    overflow: "hidden",
                    borderRadius: "8px",
                }}
            />
        </Paper>
    );
};
