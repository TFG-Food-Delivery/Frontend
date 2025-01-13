import { Grid2 as Grid, Box, Card, CardActionArea, CardContent, CardMedia, Skeleton, Typography } from "@mui/material";

import { Grade } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useFeaturedRestaurants } from "../hooks";

export const FeaturedRestaurants = () => {
    const navigate = useNavigate();
    const { data, loading } = useFeaturedRestaurants();

    return (
        <>
            <Typography variant={"h4"} fontWeight={"bold"} textAlign={"center"} sx={{ margin: "3rem 0" }}>
                Featured Restaurants
            </Typography>
            <Box>
                {loading || data === null ? (
                    Array.from({ length: 4 }).map((_, index) => (
                        <div key={index}>
                            <Skeleton
                                variant="rounded"
                                width="100%"
                                height={150}
                                animation="wave"
                                style={{ marginBottom: "6px" }}
                            />
                            <Skeleton
                                variant="text"
                                width="50%"
                                height={30}
                                animation="wave"
                                style={{ marginBottom: "6px" }}
                            />
                            <Skeleton
                                variant="text"
                                width="80%"
                                height={60}
                                animation="wave"
                                style={{ marginBottom: "6px" }}
                            />
                        </div>
                    ))
                ) : (
                    <Grid container rowSpacing={4} columnSpacing={5} sx={{ justifyContent: "center" }}>
                        {data.map((item) => (
                            <Grid key={item.name} size={{ xs: 11, sm: 6, md: 5, lg: 3 }}>
                                <Card elevation={0}>
                                    <CardActionArea
                                        onClick={() => navigate(`/shop/restaurant/${item.id}`)}
                                        disableRipple
                                        sx={{
                                            ".MuiCardActionArea-focusHighlight": {
                                                background: "transparent",
                                            },
                                        }}
                                    >
                                        <CardMedia
                                            sx={{ height: { xs: 180, md: 140 }, borderRadius: "25px" }}
                                            component={"img"}
                                            image={`${item.image}`}
                                            title={item.name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {item.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: "text.secondary",
                                                    display: "inline-flex",
                                                    alignItems: "flex-start",
                                                    gap: "4px",
                                                }}
                                            >
                                                <Grade fontSize={"small"} color="success"></Grade>
                                                {item.ratingAvg}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </>
    );
};
