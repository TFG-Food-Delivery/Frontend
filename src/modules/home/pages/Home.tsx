import { Container, Typography, Box, Button, Grid2 as Grid, Card, CardContent, CardMedia } from "@mui/material";
import { useNavigate } from "react-router";
import { imageBaseUrlS3 } from "../../api";

export const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Container maxWidth="xl" sx={{ textAlign: "center", padding: "4rem 0" }}>
                <Typography variant="h3" component={"h1"} sx={{ fontWeight: "bold", marginBottom: "1rem" }}>
                    Meals Delivered To Your Door
                </Typography>
                <Typography variant="h6" sx={{ color: "text.secondary", marginBottom: "2rem" }}>
                    Fresh, delicious meals just a click away. Discover the best food options from local restaurants.
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "3rem" }}>
                    <Button variant="contained" color="primary" size="large" onClick={() => navigate("/auth/register")}>
                        Sign Up
                    </Button>
                    <Button variant="outlined" color="primary" size="large" onClick={() => navigate("/auth/login")}>
                        Log In
                    </Button>
                </Box>

                <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>
                    Explore Our Features
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={`${imageBaseUrlS3}/img/home/feature1.jpg`}
                                alt="Wide Variety of Restaurants"
                            />
                            <CardContent>
                                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                    Wide Variety of Restaurants
                                </Typography>
                                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                                    Choose from a wide range of cuisines and local favorites.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={`${imageBaseUrlS3}/img/home/feature2.jpg`}
                                alt="Fast Delivery"
                            />
                            <CardContent>
                                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                    Fast Delivery
                                </Typography>
                                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                                    Get your meals delivered quickly and reliably.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={`${imageBaseUrlS3}/img/home/feature3.jpg`}
                                alt="Exclusive Offers"
                            />
                            <CardContent>
                                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                    Exclusive Offers
                                </Typography>
                                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                                    Enjoy great deals and discounts available only for our users.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};
