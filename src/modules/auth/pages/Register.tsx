import { Container } from "@mui/material";

import { useSearchParams } from "react-router";
import { ChooseRegister } from "../components/ChooseRegister";
import { RegisterLayout } from "../components/RegisterLayout";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const RegisterPage = () => {
    const [urlParams] = useSearchParams();
    let hasFormParam = urlParams.has("form");

    return (
        <Container maxWidth="xl">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                {hasFormParam ? <RegisterLayout urlParams={urlParams} /> : <ChooseRegister />}
            </LocalizationProvider>
        </Container>
    );
};
