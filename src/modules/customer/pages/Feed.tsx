import { Container, Typography } from "@mui/material";
import { Carousel, FeaturedRestaurants } from "../components";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const FeedPage = () => {
    const { displayName } = useSelector((state: RootState) => state.auth);
    return (
        <Container maxWidth={"xl"}>
            <Typography
                variant={"h4"}
                component={"h1"}
                fontWeight={"bold"}
                sx={{
                    display: { xs: "block", sm: "inline" },
                    textAlign: { xs: "center", sm: "left" },
                }}
            >
                Welcome,{" "}
                <Typography
                    component="span"
                    variant="h4"
                    fontWeight="bold"
                    sx={{ display: { xs: "block", sm: "inline" } }}
                >
                    {displayName}
                </Typography>
            </Typography>
            <Carousel />
            <FeaturedRestaurants />
        </Container>
    );
};
