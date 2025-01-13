import {
    Accordion,
    AccordionSummary,
    Box,
    Button,
    Container,
    Divider,
    Grid2 as Grid,
    IconButton,
    OutlinedInput,
    Paper,
    Typography,
} from "@mui/material";
import { Customer } from "../types";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDataMonthYear, formatDate } from "../../common/utils";
import { useGetCustomer } from "../../common/hooks";
import { Check, ExpandMore, Lock, Mode, ModeEdit, Redeem } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useUpdateCustomerProfile } from "../hooks";
import { updatePhotoURL } from "../../store/auth";
import { AppDispatch } from "../../store";
import { authAPI } from "../../api";

export const ProfileManagement = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { uid: userId, photoURL } = useSelector((state: any) => state.auth);
    const [loading, setLoading] = useState(true);
    const [savingChanges, setSavingChanges] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [addressExpanded, setAddressExpanded] = useState(false);
    const [profileData, setProfileData] = useState<Customer | null>(null);
    const [photoFile, setPhotoFile] = useState<File | null>(null); // Imagen seleccionada
    const [previewURL, setPreviewURL] = useState<string | null>(null); // URL para la vista previa

    const {
        register,
        reset,
        setValue,
        getValues,
        formState: { isDirty, errors },
    } = useForm({
        defaultValues: {
            email: "",
            name: "",
            dateOfBirth: "",
            phoneNumber: "",
            address: {
                street: "",
                streetNumber: "",
                zipCode: "",
                city: "",
                province: "",
                additionalInfo: "",
            },
            image: null as File | null,
        },
    });

    useEffect(() => {
        const fetchUser = async (userId: string) => {
            setLoading(true);
            const user = await useGetCustomer(userId);
            setProfileData(user);
            reset({
                email: user.email,
                name: user.name,
                dateOfBirth: user.dateOfBirth,
                phoneNumber: user.phoneNumber,
                address: user.address,
                image: user.image,
            });
            setLoading(false);
        };

        fetchUser(userId);
    }, [userId, reset]);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setPhotoFile(file);

            setValue("image", file, { shouldDirty: true });
            // Generar la vista previa de la imagen seleccionada
            const preview = URL.createObjectURL(file);
            setPreviewURL(preview);
        }
    };

    const uploadImageToS3 = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("userId", userId);
        // Endpoint del backend para subir la imagen a S3
        const response = await authAPI
            .post("/upload-image", formData)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            }); // La respuesta debe incluir la URL de la imagen
        return response.url;
    };

    const handleClick = async () => {
        if (editMode && isDirty) {
            setSavingChanges(true);

            let imageUrl = photoURL;
            if (photoFile) {
                imageUrl = await uploadImageToS3(photoFile);
                await dispatch(updatePhotoURL(imageUrl));
            }

            const updatedData = getValues();

            await useUpdateCustomerProfile(userId, { ...updatedData, image: imageUrl });
            setSavingChanges(false);
        }
        setEditMode(!editMode);
    };

    const handleExpandAddress = (event: any) => {
        setAddressExpanded(!addressExpanded);
    };

    return (
        <Container maxWidth="xl">
            <Typography variant="h3" component={"h1"} fontWeight={"bold"} gutterBottom>
                Profile Management
            </Typography>

            <Box component={Paper} padding={5} elevation={3} sx={{ borderRadius: 2, marginTop: 5 }}>
                {profileData && (
                    <>
                        <Grid container rowSpacing={4} columnSpacing={5}>
                            <Grid
                                size={{ xs: 12 }}
                                sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column-reverse", sm: "row" },
                                    justifyContent: { xs: "center", sm: "space-between" },
                                    alignItems: "center",
                                    gap: { xs: 3, sm: 0 },
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        color: "primary.dark",
                                    }}
                                >
                                    <Typography variant="h6">{profileData.loyaltyPoints} Points</Typography>
                                    <Redeem />
                                </Box>
                                <Button
                                    variant="contained"
                                    onClick={handleClick}
                                    color={editMode ? "success" : "primary"}
                                    endIcon={editMode ? <Check /> : <ModeEdit />}
                                    disabled={savingChanges}
                                >
                                    {editMode ? "Save Changes" : "Edit Profile"}
                                </Button>
                            </Grid>
                            {profileData.image && (
                                <Grid
                                    size={12}
                                    sx={{ display: "flex", justifyContent: "center", position: "relative" }}
                                >
                                    <Box sx={{ width: "150px", height: "150px", position: "relative" }}>
                                        <img
                                            src={previewURL || photoURL}
                                            alt="Profile"
                                            style={{ width: "100%", borderRadius: "100%" }}
                                        />
                                        {editMode && (
                                            <IconButton
                                                component="label"
                                                sx={{
                                                    position: "absolute",
                                                    bottom: 0,
                                                    right: 0,
                                                    bgcolor: "white",
                                                    boxShadow: 4,
                                                }}
                                                disableRipple
                                            >
                                                <input
                                                    type="file"
                                                    hidden
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
                                                <Mode />
                                            </IconButton>
                                        )}
                                    </Box>
                                </Grid>
                            )}

                            <Grid size={{ xs: 12 }}>
                                <Typography variant="h4" gutterBottom sx={{ marginTop: 2 }} fontWeight={"bold"}>
                                    {profileData.name}
                                </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="h6" gutterBottom>
                                    Email:
                                </Typography>
                                <OutlinedInput fullWidth value={profileData.email} readOnly={!editMode} />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="h6" gutterBottom>
                                    Date of Birth:
                                </Typography>
                                <OutlinedInput
                                    fullWidth
                                    value={formatDate(profileData.dateOfBirth).split(" ")[0]}
                                    readOnly={!editMode}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="h6" gutterBottom>
                                    Phone Number:
                                </Typography>
                                <OutlinedInput
                                    fullWidth
                                    readOnly={!editMode}
                                    error={!!errors.phoneNumber}
                                    {...register("phoneNumber")}
                                    defaultValue={profileData.phoneNumber || ""}
                                />
                            </Grid>

                            <Grid
                                size={{ xs: 12, md: 6 }}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    height: "auto",
                                }}
                            >
                                <Button
                                    variant={"outlined"}
                                    sx={{ width: "auto", alignSelf: "center", mt: 5 }}
                                    startIcon={<Lock />}
                                >
                                    Change Password
                                </Button>
                            </Grid>
                        </Grid>
                        <Accordion
                            sx={{
                                p: "3rem 0",
                                boxShadow: 0,
                                "&:before": {
                                    display: "none",
                                },
                            }}
                            expanded={addressExpanded}
                            onChange={handleExpandAddress}
                        >
                            <Box>
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    sx={{ p: 0, pr: 2 }}
                                >
                                    <Typography variant="h5" gutterBottom fontWeight={"bold"}>
                                        Address
                                    </Typography>
                                </AccordionSummary>
                                <Divider sx={{ mb: 4 }} />
                            </Box>
                            <Grid container rowSpacing={4} columnSpacing={5}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Street:
                                    </Typography>
                                    <OutlinedInput
                                        fullWidth
                                        readOnly={!editMode}
                                        error={!!errors.address?.street}
                                        {...register("address.street")}
                                        defaultValue={profileData.address.street || ""}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Street Number:
                                    </Typography>
                                    <OutlinedInput
                                        fullWidth
                                        readOnly={!editMode}
                                        error={!!errors.address?.streetNumber}
                                        {...register("address.streetNumber")}
                                        defaultValue={profileData.address.streetNumber || ""}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography variant="h6" gutterBottom>
                                        ZIP Code:
                                    </Typography>
                                    <OutlinedInput
                                        fullWidth
                                        readOnly={!editMode}
                                        error={!!errors.address?.zipCode}
                                        {...register("address.zipCode")}
                                        defaultValue={profileData.address.zipCode || ""}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography variant="h6" gutterBottom>
                                        City:
                                    </Typography>
                                    <OutlinedInput
                                        fullWidth
                                        readOnly={!editMode}
                                        error={!!errors.address?.city}
                                        {...register("address.city")}
                                        defaultValue={profileData.address.city || ""}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Province:
                                    </Typography>
                                    <OutlinedInput
                                        fullWidth
                                        readOnly={!editMode}
                                        error={!!errors.address?.province}
                                        {...register("address.province")}
                                        defaultValue={profileData.address.province || ""}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Additional Information:
                                    </Typography>
                                    <OutlinedInput
                                        fullWidth
                                        readOnly={!editMode}
                                        error={!!errors.address?.additionalInfo}
                                        {...register("address.additionalInfo")}
                                        defaultValue={profileData.address.additionalInfo || ""}
                                    />
                                </Grid>
                            </Grid>
                        </Accordion>
                        <Box sx={{ display: "flex", alignItems: "center", marginTop: 4, gap: 2 }}>
                            <Typography variant="h6">
                                Member Since {formatDataMonthYear(profileData.createdAt)}
                            </Typography>
                        </Box>
                    </>
                )}
            </Box>
        </Container>
    );
};
