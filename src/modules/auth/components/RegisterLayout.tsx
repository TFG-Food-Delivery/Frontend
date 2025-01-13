import { AuthPage } from "../enum/auth-page.enum";
import { Navigate } from "react-router";
import { RegisterCourierForm, RegisterCustomerForm, RegisterRestaurantForm } from "./forms";

type Props = {
    urlParams: URLSearchParams;
};

export const RegisterLayout = (props: Props) => {
    const urlParams = props.urlParams;
    const registerPage = urlParams.get("form");

    if (registerPage === AuthPage.REGISTER_CUSTOMER.split("_")[1]) {
        return <RegisterCustomerForm />;
    } else if (registerPage === AuthPage.REGISTER_RESTAURANT.split("_")[1]) {
        return <RegisterRestaurantForm />;
    } else if (registerPage === AuthPage.REGISTER_COURIER.split("_")[1]) {
        return <RegisterCourierForm />;
    } else {
        return <Navigate to="/404" />;
    }
};
