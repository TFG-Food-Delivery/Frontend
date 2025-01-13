import { ExpandMore, NavigateBefore, NavigateNext } from "@mui/icons-material";
import {
    Accordion,
    AccordionSummary,
    Box,
    Button,
    Grid2 as Grid,
    OutlinedInput,
    Paper,
    Typography,
} from "@mui/material";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
    register: UseFormRegister<any>;
    control: Control<any>;
    errors: FieldErrors<any>;
    expanded: string | false;
    handleChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
    panel: string;
};

export const FormAddressInfo = ({ register, control, errors, expanded, handleChange, panel }: Props) => {
    const handleExpandPanel3 = (event: any) => {
        if (expanded !== `panel${parseInt(panel) - 1}` && expanded !== `panel${parseInt(panel) - 2}`) {
            handleChange(`panel${parseInt(panel) - 1}`)(event, true);
        }
    };

    return (
        <Paper elevation={4} sx={{ p: 2, mb: 4 }}>
            <Accordion sx={{ boxShadow: 0 }} expanded={expanded === `panel${panel}`} onChange={handleExpandPanel3}>
                <Box>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls={`panel${panel}-content`}
                        id={`panel${panel}-header`}
                        sx={{ p: 0, pr: 2 }}
                    >
                        <Typography variant="h4" fontWeight={"bold"}>
                            Address Information
                        </Typography>
                    </AccordionSummary>
                    {expanded === `panel${panel}` && <hr />}
                </Box>
                <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6">Street Name:</Typography>
                        <OutlinedInput error={!!errors.street} placeholder="Street" fullWidth {...register("street")} />
                        {errors.street && <Typography color="error">Street is required</Typography>}
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6">Street Number:</Typography>
                        <OutlinedInput
                            error={!!errors.streetNumber}
                            placeholder="Street Number"
                            fullWidth
                            {...register("streetNumber")}
                        />
                        {errors.streetNumber && <Typography color="error">Street Number is required</Typography>}
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6">City:</Typography>
                        <OutlinedInput error={!!errors.city} placeholder="City" fullWidth {...register("city")} />
                        {errors.city && <Typography color="error">City is required</Typography>}
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6">Province:</Typography>
                        <OutlinedInput
                            error={!!errors.province}
                            placeholder="Province"
                            fullWidth
                            {...register("province")}
                        />
                        {errors.province && <Typography color="error">Province is required</Typography>}
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6">ZIP Code:</Typography>
                        <OutlinedInput
                            error={!!errors.zipCode}
                            placeholder="ZIP Code"
                            fullWidth
                            {...register("zipCode")}
                        />
                        {errors.zipCode && <Typography color="error">ZIP code is required</Typography>}
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6">Additional Address Information:</Typography>
                        <Controller
                            name="additionalInfo"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <OutlinedInput placeholder="Apartment / Floor / Others" fullWidth {...field} />
                            )}
                        />
                        {errors.additionalInfo && (
                            <Typography color="error">Additional address information is invalid</Typography>
                        )}
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
                            sx={{ margin: { xs: "1rem 0", sm: "0 1rem" }, width: { xs: "100%", md: "15%" } }}
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
                            sx={{ margin: { xs: "1rem 0", sm: "0 1rem" }, width: { xs: "100%", md: "15%" } }}
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
