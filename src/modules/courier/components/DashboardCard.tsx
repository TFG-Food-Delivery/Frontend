import { ArrowRightAlt } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router";

type Props = {
    title: string;
    description: string;
    link: string;
};

export const DashboardCard = (props: Props) => {
    const navigate = useNavigate();
    function handleClick(event: any): void {
        navigate(props.link);
    }

    return (
        <Card
            elevation={3}
            sx={{
                borderRadius: 2,
                width: "95%",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                },
            }}
        >
            <CardActionArea sx={{ padding: 2 }} onClick={handleClick}>
                <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
                        {props.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#555", marginBottom: 2 }}>
                        {props.description}
                    </Typography>
                </CardContent>
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", margin: "1rem 0" }}>
                    <ArrowRightAlt
                        color="primary"
                        sx={{ fontSize: 40, transition: "color 0.3s", "&:hover": { color: "primary.light" } }}
                    />
                </div>
            </CardActionArea>
        </Card>
    );
};
