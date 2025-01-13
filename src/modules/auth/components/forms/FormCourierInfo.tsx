import { ExpandMore, NavigateBefore, NavigateNext } from "@mui/icons-material";
import {
    Accordion,
    AccordionSummary,
    Box,
    Button,
    FormControlLabel,
    Grid2 as Grid,
    Paper,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import "dayjs/locale/en-gb";

type Props = {
    register: UseFormRegister<any>;
    control: Control<any>;
    errors: FieldErrors<any>;
    expanded: string | false;
    handleChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
    panel: string;
};

export const FormCourierInfo = ({ register, errors, expanded, handleChange, panel }: Props) => {
    const [vehicleType, setVehicleType] = useState<string>("");
    const handleVehicleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setVehicleType((event.target as HTMLInputElement).value);
    };

    const handleExpandPanel2 = (event: any) => {
        if (expanded !== `panel${parseInt(panel)}` && expanded !== `panel${parseInt(panel) - 1}`) {
            handleChange(`panel${parseInt(panel)}`)(event, true);
        }
    };

    return (
        <Paper elevation={4} sx={{ p: 2, mb: 4 }}>
            <Accordion
                sx={{ boxShadow: 0 }}
                expanded={expanded === `panel${parseInt(panel)}`}
                onChange={handleExpandPanel2}
            >
                <Box>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls={`panel${parseInt(panel)}-content`}
                        id={`panel${parseInt(panel)}-header`}
                        sx={{ p: 0, pr: 2 }}
                    >
                        <Typography variant="h4" fontWeight={"bold"}>
                            Courier Information
                        </Typography>
                    </AccordionSummary>
                    {expanded === `panel${parseInt(panel)}` && <hr />}
                </Box>
                <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6" sx={{ mb: 3 }}>
                            Which type of vehicle will you use?
                        </Typography>

                        <RadioGroup value={vehicleType} onChange={handleVehicleTypeChange}>
                            <FormControlLabel
                                value="Bicycle"
                                control={<Radio />}
                                label="Bicycle"
                                {...register("vehicleType")}
                            />
                            <FormControlLabel
                                value="Motorbike"
                                control={<Radio />}
                                label="Motorbike"
                                {...register("vehicleType")}
                            />
                        </RadioGroup>
                        {errors.vehicleType && <Typography color="error">A vehicle type is required</Typography>}
                    </Grid>

                    <Grid
                        size={12}
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            justifyContent: { xs: "center", sm: "flex-end" },
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ margin: { xs: "1rem 0", sm: "0 1rem" }, width: { xs: "100%", sm: "25%", md: "15%" } }}
                            startIcon={<NavigateBefore />}
                            onClick={(event) => handleChange(`panel${parseInt(panel) - 1}`)(event, true)}
                        >
                            Previous Step
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ margin: { xs: "1rem 0", sm: "0 1rem" }, width: { xs: "100%", sm: "25%", md: "15%" } }}
                            endIcon={<NavigateNext />}
                        >
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </Accordion>
        </Paper>
    );
};
