import { Alert, Typography } from "@mui/material";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { registerRestaurantSchema, RestaurantRegistrationFormData } from "./validation";
import { useDispatch, useSelector } from "react-redux";
import { CuisineType, RolesList, startCreatingNativeRestaurantUser } from "../../../store/auth";
import { useState } from "react";
import { AppDispatch } from "../../../store";
import { useNavigate } from "react-router";
import { useRegisterFormData } from "../../hooks";
import { FormPersonalInfo } from "./FormPersonalInfo";
import { FormAddressInfo } from "./FormAddressInfo";
import { FormRestaurantInfo } from "./FormRestaurantInfo";
import { restaurantAPI } from "../../../api";

export const RegisterRestaurantForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { errorMessage } = useSelector((state: any) => state.auth);
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState<string | false>("panel1");
    const [selectedCuisine, setSelectedCuisine] = useState<CuisineType | null>(null);
    const [selectedCuisineError, setSelectedCuisineError] = useState<string | null>(null);
    const [selectedRestaurantImage, setSelectedRestaurantImage] = useState<File | undefined>(undefined);
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        trigger,
        getValues,
    } = useForm<RestaurantRegistrationFormData>({
        defaultValues: { dateOfBirth: null, openHour: "", closeHour: "", additionalInfo: "" },
        resolver: joiResolver(registerRestaurantSchema),
    });

    const handleChangeAccordion = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const onSubmit = async (data: any) => {
        const formData = await useRegisterFormData({
            data: { ...data, cuisineType: selectedCuisine },
            role: RolesList.RESTAURANT,
        });
        const result = await dispatch(startCreatingNativeRestaurantUser(formData));
        if (result && selectedRestaurantImage) {
            const imageFormData = new FormData();
            imageFormData.append("file", selectedRestaurantImage);

            await restaurantAPI.post(`/${result.id}/upload-image`, imageFormData);
        }

        navigate("/menu");
    };

    return (
        <>
            <Typography
                variant="h2"
                sx={{ margin: "4rem 0", fontFamily: "Pacifico, Roboto", color: "secondary.main", textAlign: "center" }}
            >
                Be Part Of Us!
            </Typography>

            <form
                onSubmit={handleSubmit(onSubmit, (errors) => console.log("Errores de validación:", errors))}
                className="register-form"
            >
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
                <FormRestaurantInfo
                    register={register}
                    control={control}
                    errors={errors}
                    expanded={expanded}
                    handleChange={handleChangeAccordion}
                    selectedCuisine={selectedCuisine}
                    setSelectedCuisine={setSelectedCuisine}
                    selectedCuisineError={selectedCuisineError}
                    setSelectedCuisineError={setSelectedCuisineError}
                    selectedRestaurantImage={selectedRestaurantImage}
                    setSelectedRestaurantImage={setSelectedRestaurantImage}
                    trigger={trigger}
                    panel="2"
                />
                <FormAddressInfo
                    register={register}
                    control={control}
                    errors={errors}
                    expanded={expanded}
                    handleChange={handleChangeAccordion}
                    panel="3"
                />
                {errorMessage && <Alert severity="error">{errorMessage.message}</Alert>}
            </form>
        </>
    );
};
