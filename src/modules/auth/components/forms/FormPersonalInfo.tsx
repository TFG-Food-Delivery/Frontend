import { ExpandMore, NavigateNext } from "@mui/icons-material";
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { Control, Controller, FieldErrors, UseFormGetValues, UseFormRegister, UseFormTrigger } from "react-hook-form";
import { useExistsUser } from "../../hooks";
import { useState } from "react";

type Props = {
    register: UseFormRegister<any>;
    control: Control<any>;
    errors: FieldErrors<any>;
    isGoogleUser?: boolean;
    googleUser?: {
        name: string | null;
        lastName: string | null;
        email: string | null;
        photoURL: string | null;
    };
    expanded: string | false;
    handleChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
    trigger: UseFormTrigger<any>;
    panel: string;
    getValues: UseFormGetValues<any>;
};

export const FormPersonalInfo = ({
    register,
    control,
    errors,
    isGoogleUser,
    googleUser,
    expanded,
    handleChange,
    trigger,
    panel,
    getValues,
}: Props) => {
    let name, lastName, email, photoURL;
    const [errorUserExists, setErrorUserExists] = useState<string | null>(null);
    if (isGoogleUser && googleUser) {
        ({ name, lastName, email, photoURL } = googleUser);
    }

    const handleNextStep = async (event: any) => {
        const fieldsToValidate = isGoogleUser
            ? ["name", "lastName", "phoneNumber", "dateOfBirth", "email"]
            : [
                  "name",
                  "lastName",
                  "phoneNumber",
                  "dateOfBirth",
                  "email",
                  "confirmEmail",
                  "password",
                  "confirmPassword",
              ];

        const isValid = await trigger(fieldsToValidate);
        if (!isValid) {
            return;
        }
        const { email: emailValue, phoneNumber: phoneValue } = getValues();
        const error = await useExistsUser(emailValue, phoneValue);
        if (error) {
            setErrorUserExists("User with this email or phone number already exists");
            return;
        }
        handleChange(`panel${parseInt(panel) + 1}`)(event, true);
    };

    const handleExpandPanel1 = (event: any) => {
        if (expanded !== `panel${panel}`) {
            handleChange(`panel${panel}`)(event, true);
        }
    };

    return (
        <Paper elevation={4} sx={{ p: 2, mb: 4 }}>
            <Accordion sx={{ boxShadow: 0 }} expanded={expanded === `panel${panel}`} onChange={handleExpandPanel1}>
                <Box>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ p: 0, pr: 2 }}
                    >
                        <Typography variant="h4" fontWeight={"bold"}>
                            Personal Information
                        </Typography>
                    </AccordionSummary>
                    {expanded === `panel${panel}` && <hr />}
                </Box>
                <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6">Name:</Typography>
                        <OutlinedInput
                            error={!!errors.name}
                            placeholder="Name"
                            fullWidth
                            {...register("name")}
                            defaultValue={name || ""}
                            readOnly={isGoogleUser}
                        />
                        {errors.name && <Typography color="error">Name is required</Typography>}
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6">Last Name:</Typography>
                        <OutlinedInput
                            error={!!errors.lastName}
                            placeholder="Last Name"
                            fullWidth
                            {...register("lastName")}
                            defaultValue={lastName || ""}
                            readOnly={isGoogleUser}
                        />
                        {errors.lastName && <Typography color="error">Last name is required</Typography>}
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6">Phone Number:</Typography>
                        <OutlinedInput
                            error={!!errors.phoneNumber}
                            placeholder="Phone Number"
                            fullWidth
                            {...register("phoneNumber")}
                        />
                        {errors.phoneNumber && <Typography color="error">Phone Number is required</Typography>}
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6">Date of Birth:</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                            <Controller
                                name="dateOfBirth"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <DatePicker
                                            value={dayjs(field.value)}
                                            onChange={(date) => field.onChange(date?.toDate().toISOString())}
                                            sx={{ width: { xs: "100%", sm: "40%" } }}
                                        />
                                        {fieldState.error && (
                                            <Typography color="error">{fieldState.error.message}</Typography>
                                        )}
                                    </>
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6">Email:</Typography>
                        <OutlinedInput
                            error={!!errors.email}
                            placeholder="Email"
                            fullWidth
                            {...register("email")}
                            defaultValue={email || ""}
                            readOnly={isGoogleUser}
                        />
                        {errors.email && <Typography color="error">Email is required</Typography>}
                    </Grid>
                    {!isGoogleUser && (
                        <>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="h6">Confirm email:</Typography>
                                <OutlinedInput
                                    error={!!errors.confirmEmail}
                                    placeholder="Confirm Email"
                                    fullWidth
                                    {...register("confirmEmail")}
                                />
                                {errors.confirmEmail && <Typography color="error">Emails don't match</Typography>}
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="h6">Password:</Typography>
                                <OutlinedInput
                                    error={!!errors.password}
                                    placeholder="Password"
                                    type="password"
                                    fullWidth
                                    {...register("password")}
                                />
                                {errors.password && <Typography color="error">Password is required</Typography>}
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="h6">Confirm password:</Typography>
                                <OutlinedInput
                                    error={!!errors.confirmEmail}
                                    placeholder="Confirm Password"
                                    type="password"
                                    fullWidth
                                    {...register("confirmPassword")}
                                />
                                {errors.confirmPassword && <Typography color="error">Passwords don't match</Typography>}
                            </Grid>
                        </>
                    )}
                    <Grid
                        size={12}
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            justifyContent: "flex-end",
                            alignItems: "center",
                        }}
                    >
                        {errorUserExists && <Typography color="error">{errorUserExists}</Typography>}
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ margin: "2rem", width: { xs: "100%", md: "25%", lg: "15%" } }}
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
