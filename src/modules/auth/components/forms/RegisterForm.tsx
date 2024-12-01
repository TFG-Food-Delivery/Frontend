import { Button, Grid2 as Grid, OutlinedInput, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import "../style.css";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const RegisterForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(dayjs("2022-04-17"));
    const [password, setPassword] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        throw new Error("Function not implemented.");
    }

    return (
        <>
            <Typography
                variant="h2"
                sx={{ margin: "4rem 0", fontFamily: "Pacifico, Roboto", color: "secondary.main", textAlign: "center" }}
            >
                Be Part Of Us!
            </Typography>

            <form onSubmit={handleSubmit} className="register-form">
                <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid size={12}>
                        <Typography variant="h4">Personal Information</Typography>
                        <hr />
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="h6">Name:</Typography>
                        <OutlinedInput id="name" placeholder="Name" fullWidth />
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="h6">Last Name:</Typography>
                        <OutlinedInput id="lastName" placeholder="Last Name" fullWidth />
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="h6">Phone Number:</Typography>
                        <OutlinedInput id="phoneNumber" placeholder="Phone Number" fullWidth />
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="h6">Date of Birth:</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                            <DatePicker
                                value={dateOfBirth}
                                onChange={setDateOfBirth}
                                name="dateOfBirth"
                                sx={{ width: "40%" }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="h6">Email:</Typography>
                        <OutlinedInput id="email" placeholder="Email" fullWidth />
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="h6">Password:</Typography>
                        <OutlinedInput id="password" placeholder="Password" type="password" fullWidth />
                    </Grid>
                    <Grid size={12}>
                        <Typography variant="h4">Address Information</Typography>
                        <hr />
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="h6">Street Name:</Typography>
                        <OutlinedInput id="street" placeholder="Street" fullWidth />
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="h6">Street Number:</Typography>
                        <OutlinedInput id="streetNumber" placeholder="Street Number" fullWidth />
                    </Grid>

                    <Grid size={4}>
                        <Typography variant="h6">City:</Typography>
                        <OutlinedInput id="city" placeholder="City" fullWidth />
                    </Grid>
                    <Grid size={4}>
                        <Typography variant="h6">Province:</Typography>
                        <OutlinedInput id="province" placeholder="Province" fullWidth />
                    </Grid>
                    <Grid size={4}>
                        <Typography variant="h6">ZIP Code:</Typography>
                        <OutlinedInput id="zipcode" placeholder="ZIP Code" fullWidth />
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="h6">Additional Address Information:</Typography>
                        <OutlinedInput id="addressAdditional" placeholder="Apartment / Floor / Others" fullWidth />
                    </Grid>
                    <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ margin: "2rem 0 4rem", width: "30%" }}
                        >
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};
