import { Done, ExpandMore, NavigateBefore, NavigateNext } from "@mui/icons-material";
import {
    Accordion,
    AccordionSummary,
    Box,
    Button,
    Chip,
    Grid2 as Grid,
    OutlinedInput,
    Paper,
    Typography,
} from "@mui/material";
import { Control, Controller, FieldErrors, UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { CuisineType } from "../../../common/types";
import { TimeField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { useState } from "react";

type Props = {
    register: UseFormRegister<any>;
    control: Control<any>;
    errors: FieldErrors<any>;
    expanded: string | false;
    handleChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
    selectedCuisine: CuisineType | null;
    setSelectedCuisine: (cuisine: CuisineType | null) => void;
    selectedCuisineError: string | null;
    setSelectedCuisineError: (error: string | null) => void;
    trigger: UseFormTrigger<any>;
    panel: string;
    selectedRestaurantImage: File | undefined;
    setSelectedRestaurantImage: (image: File | undefined) => void;
};

export const FormRestaurantInfo = ({
    register,
    control,
    errors,
    expanded,
    handleChange,
    selectedCuisine,
    setSelectedCuisine,
    selectedCuisineError,
    setSelectedCuisineError,
    trigger,
    panel,
    selectedRestaurantImage,
    setSelectedRestaurantImage,
}: Props) => {
    const [selectedRestaurantImageError, setSelectedRestaurantImageError] = useState<string | null>(null);
    const handleClickCuisineType = (event: React.MouseEvent<HTMLDivElement>) => {
        setSelectedCuisine(event.currentTarget.innerText as CuisineType);
        setSelectedCuisineError(null);
    };

    const handleChangeRestaurantImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedRestaurantImage(file);
            setSelectedRestaurantImageError(null);
        }
    };

    const handleNextStep = async (event: any) => {
        const isValid = await trigger(["restaurantName", "openHour", "closeHour"]);
        if (!selectedCuisine) {
            setSelectedCuisineError("Cuisine type is required");
            return;
        }
        if (!selectedRestaurantImage) {
            setSelectedRestaurantImageError("Restaurant Image is required");
            return;
        }
        if (!isValid) {
            return;
        }
        handleChange(`panel${parseInt(panel) + 1}`)(event, true);
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
                            Restaurant Information
                        </Typography>
                    </AccordionSummary>
                    {expanded === `panel${parseInt(panel)}` && <hr />}
                </Box>
                <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6">Restaurant Name:</Typography>
                        <OutlinedInput
                            error={!!errors.restaurantName}
                            placeholder="Restaurant Name"
                            fullWidth
                            {...register("restaurantName")}
                        />
                        {errors.restaurantName && <Typography color="error">Restaurant Name is required</Typography>}
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6">Restaurant Image:</Typography>
                        <OutlinedInput
                            error={!!selectedRestaurantImageError}
                            placeholder="Restaurant Image"
                            fullWidth
                            type="file"
                            onChange={handleChangeRestaurantImage}
                        />
                        {selectedRestaurantImageError && (
                            <Typography color="error">{selectedRestaurantImageError}</Typography>
                        )}
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                        <Typography variant="h6">Opening Hour:</Typography>
                        <Controller
                            name="openHour"
                            control={control}
                            render={({ field, fieldState }) => (
                                <>
                                    <TimeField
                                        value={field.value ? dayjs(field.value, "HH:mm") : null}
                                        onChange={(hour) => {
                                            if (hour) {
                                                const formattedTime = hour.format("HH:mm");
                                                field.onChange(formattedTime);
                                            } else {
                                                field.onChange(null);
                                            }
                                        }}
                                        format="HH:mm"
                                        sx={{ width: "100%" }}
                                    />
                                    {fieldState.error && (
                                        <Typography color="error">{fieldState.error.message}</Typography>
                                    )}
                                </>
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                        <Typography variant="h6">Closing Hour:</Typography>

                        <Controller
                            name="closeHour"
                            control={control}
                            render={({ field, fieldState }) => (
                                <>
                                    <TimeField
                                        value={field.value ? dayjs(field.value, "HH:mm") : null}
                                        onChange={(hour) => {
                                            if (hour) {
                                                const formattedTime = hour.format("HH:mm");
                                                field.onChange(formattedTime);
                                            } else {
                                                field.onChange(null);
                                            }
                                        }}
                                        format="HH:mm"
                                        sx={{ width: "100%" }}
                                    />
                                    {fieldState.error && (
                                        <Typography color="error">{fieldState.error.message}</Typography>
                                    )}
                                </>
                            )}
                        />
                    </Grid>
                    <Grid size={12}>
                        <Typography variant="h6">What type of food do you make?</Typography>
                        {Object.values(CuisineType).map((cuisineType) => (
                            <Chip
                                key={cuisineType}
                                label={cuisineType}
                                color={selectedCuisine === cuisineType ? "success" : "default"} // Cambia el color si está seleccionado
                                variant={selectedCuisine === cuisineType ? "filled" : "outlined"} // Cambia el variante si está seleccionado
                                onClick={handleClickCuisineType}
                                icon={selectedCuisine === cuisineType ? <Done /> : undefined}
                                sx={{
                                    margin: "0.5rem 2rem 0 0",
                                    padding: "0.5rem",
                                    color: selectedCuisine === cuisineType ? "info.main" : "default",
                                    fontWeight: selectedCuisine === cuisineType ? "bold" : "normal",
                                }}
                                size={"medium"}
                            />
                        ))}
                        {selectedCuisineError && (
                            <Typography color="error" sx={{ mt: 2 }}>
                                {selectedCuisineError}
                            </Typography>
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
                            sx={{ margin: { xs: "1rem 0", sm: "2rem" }, width: { xs: "100%", sm: "25%", md: "15%" } }}
                            startIcon={<NavigateBefore />}
                            onClick={(event) => handleChange("panel1")(event, true)}
                        >
                            Previous Step
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ margin: { xs: "1rem 0", sm: "2rem" }, width: { xs: "100%", sm: "25%", md: "15%" } }}
                            endIcon={<NavigateNext />}
                            onClick={handleNextStep}
                        >
                            Next Step
                        </Button>
                    </Grid>
                </Grid>
            </Accordion>
        </Paper>
    );
};
