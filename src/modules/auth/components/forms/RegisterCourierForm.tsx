import { Alert, Typography } from "@mui/material";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import "dayjs/locale/en-gb";
import { useDispatch, useSelector } from "react-redux";
import { RolesList, startCreatingNativeCourierUser } from "../../../store/auth";
import { useState } from "react";
import { AppDispatch } from "../../../store";
import { CourierRegistrationFormData, registerCourierSchema } from "./validation/courierRegistrationSchema";
import { useNavigate } from "react-router";
import { useRegisterFormData } from "../../hooks";
import { FormPersonalInfo } from "./FormPersonalInfo";
import { FormCourierInfo } from "./FormCourierInfo";

export const RegisterCourierForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState<string | false>("panel1");
    const { errorMessage } = useSelector((state: any) => state.auth);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        trigger,
        getValues,
    } = useForm<CourierRegistrationFormData>({
        defaultValues: { dateOfBirth: null },
        resolver: joiResolver(registerCourierSchema),
    });

    const handleChangeAccordion = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const onSubmit = async (data: any) => {
        if (errors === null || !data.vehicleType) {
            return;
        }

        const formData = await useRegisterFormData({ data, role: RolesList.COURIER });

        const error = await dispatch(startCreatingNativeCourierUser(formData));

        if (!error) navigate("/dashboard");
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
                    trigger={trigger}
                    panel="1"
                    getValues={getValues}
                />
                <FormCourierInfo
                    register={register}
                    control={control}
                    errors={errors}
                    expanded={expanded}
                    handleChange={handleChangeAccordion}
                    panel="2"
                />
                {errorMessage && <Alert severity="error">{errorMessage.message}</Alert>}
            </form>
        </>
    );
};
