import { Typography, Skeleton, Grid2 as Grid } from "@mui/material";
import { FeaturedDish } from "./FeaturedDish";
import { Dish } from "../types";

type Props = {
    dishes: Dish[];
    loading: boolean;
    error: any;
    handleAddToCart: (dish: Dish) => void;
};

export const FeaturedDishes = ({ dishes, loading, error, handleAddToCart }: Props) => {
    return (
        <>
            <Typography variant={"h4"} fontWeight={"bold"} textAlign={"center"} sx={{ margin: "3rem 0" }}>
                Featured Dishes
            </Typography>
            <Grid
                container
                rowSpacing={4}
                columnSpacing={5}
                sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}
            >
                {loading || dishes === null
                    ? Array.from({ length: 4 }).map((_, index) => (
                          <Grid key={index} size={{ xs: 11, sm: 6, md: 5, lg: 3 }}>
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
                          </Grid>
                      ))
                    : dishes.slice(0, 4).map((item) => (
                          <Grid key={item.name} size={{ xs: 11, sm: 6, md: 5, lg: 3 }}>
                              <FeaturedDish dish={item} handleAddToCart={handleAddToCart} />
                          </Grid>
                      ))}
            </Grid>
        </>
    );
};
