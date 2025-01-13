import { Typography } from "@mui/material";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { googleRegistrationSchema, registerSchema, RegistrationFormData } from "./validation";

import "dayjs/locale/en-gb";
import { useDispatch } from "react-redux";
import { RolesList, startCreatingNativeCustomerUser } from "../../../store/auth";
import { useState } from "react";
import { AppDispatch } from "../../../store";
import { useGoogleSignUp, useRegisterFormData } from "../../hooks";
import { useNavigate } from "react-router";
import { FormPersonalInfo } from "./FormPersonalInfo";
import { FormAddressInfo } from "./FormAddressInfo";

export const RegisterCustomerForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [expanded, setExpanded] = useState<string | false>("panel1");
    const navigate = useNavigate();

    const { googleUser, isGoogleUser } = useGoogleSignUp();

    const { photoURL } = googleUser;

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        trigger,
        getValues,
    } = useForm<RegistrationFormData>({
        defaultValues: { dateOfBirth: null, additionalInfo: "" },
        resolver: joiResolver(isGoogleUser ? googleRegistrationSchema : registerSchema),
    });

    const handleChangeAccordion = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const onSubmit = async (data: any) => {
        if (errors === null) {
            console.log("errors:", errors);
            return;
        }
        const userData = isGoogleUser ? { ...data, photoURL } : data;
        const formData = await useRegisterFormData({ data: userData, role: RolesList.CUSTOMER });

        const error = await dispatch(startCreatingNativeCustomerUser(formData));
        if (!error) navigate("/feed");
    };

    return (
        <>
            <Typography
                variant="h2"
                sx={{ margin: "4rem 0", fontFamily: "Pacifico, Roboto", color: "secondary.main", textAlign: "center" }}
            >
                Be Part Of Us!
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                <FormPersonalInfo
                    register={register}
                    control={control}
                    errors={errors}
                    expanded={expanded}
                    handleChange={handleChangeAccordion}
                    isGoogleUser={isGoogleUser}
                    googleUser={googleUser}
                    trigger={trigger}
                    panel={"1"}
                    getValues={getValues}
                />

                <FormAddressInfo
                    register={register}
                    control={control}
                    errors={errors}
                    expanded={expanded}
                    handleChange={handleChangeAccordion}
                    panel={"2"}
                />
            </form>
        </>
    );
};
