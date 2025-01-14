import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    CircularProgress,
    Typography,
    Chip,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";
import { restaurantAPI } from "../../api";
import { useSelector } from "react-redux";
import { Dish } from "../../customer/types";
import { Allergens } from "../enum/Allergens.enum";
import { Done } from "@mui/icons-material";

interface DishDialogProps {
    open: boolean;
    onClose: () => void;
    dish?: Dish | null;
    isNew: boolean;
    categoryId?: string;
    setData: any;
}

export const DishDialog = ({ open, onClose, dish, isNew, categoryId, setData }: DishDialogProps) => {
    const { uid: restaurantId } = useSelector((state: any) => state.auth);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [selectedAllergens, setSelectedAllergens] = useState<Allergens[]>([]);
    const [selectedAllergensError, setSelectedAllergensError] = useState<string | null>(null);
    const [savingChanges, setSavingChanges] = useState(false);
    const initialValues = {
        name: "",
        description: "",
        price: 0,
        image: undefined,
        categoryId,
    };
    const { control, handleSubmit, reset, setValue, getValues } = useForm<Dish>({
        defaultValues: initialValues,
    });

    useEffect(() => {
        if (dish) {
            reset(dish);
            setSelectedAllergens(dish.allergens);
        } else {
            reset(initialValues);
        }
    }, [dish, reset]);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setPhotoFile(file);

            setValue("image", file, { shouldDirty: true });
        }
    };

    const uploadImageToS3 = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append("file", file);
        // Endpoint del backend para subir la imagen a S3
        const response = await restaurantAPI
            .post(`/${restaurantId}/menu/upload-image`, formData)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            }); // La respuesta debe incluir la URL de la imagen

        return response.url;
    };

    const onSubmit = async (data: Partial<Dish>) => {
        setSavingChanges(true);
        let imageUrl = "";
        if (photoFile) {
            imageUrl = await uploadImageToS3(photoFile);
        }
        const updatedData = getValues();
        if (isNew && !dish) {
            const newDish = await restaurantAPI
                .post(`/${restaurantId}/menu`, {
                    ...updatedData,
                    image: imageUrl,
                    categoryId: categoryId!,
                    allergens: selectedAllergens,
                })
                .then((response) => response.data);
            setData((prevData: any[]) =>
                prevData.map((category) =>
                    category.categoryId === categoryId
                        ? { ...category, dishes: [...category.dishes, newDish] }
                        : category
                )
            );
            console.log(data);
        } else {
            const { id, isAvailable, restaurantId, ...dataToUpdate } = updatedData;
            const updatedDish = await restaurantAPI
                .patch(`/menu/${dish?.id}`, {
                    ...dataToUpdate,
                    dishId: dish?.id,
                    ...(imageUrl !== "" && { image: imageUrl }),
                    allergens: selectedAllergens,
                })
                .then((response) => response.data);
            setData((prevData: any[]) =>
                prevData.map((category) =>
                    category.categoryId === categoryId
                        ? {
                              ...category,
                              dishes: category.dishes.map((d: any) => (d.id === dish?.id ? updatedDish : d)),
                          }
                        : category
                )
            );
        }

        setSavingChanges(false);
        reset(initialValues);
        onClose();
    };

    function handleClickAllergen(allergen: Allergens): void {
        if (selectedAllergens.includes(allergen)) {
            setSelectedAllergens((prevAllergens) => prevAllergens.filter((a) => a !== allergen));
        } else {
            setSelectedAllergens((prevAllergens) => [...prevAllergens, allergen]);
        }
    }

    const handleClose = () => {
        setSelectedAllergens([]);
        reset(initialValues);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>{isNew ? "Añadir Nuevo Plato" : "Editar Plato"}</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => <TextField {...field} label="Nombre" fullWidth required />}
                        />
                        <Controller
                            name="description"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <TextField {...field} label="Descripción" fullWidth multiline rows={3} required />
                            )}
                        />
                        <Controller
                            name="price"
                            control={control}
                            rules={{ required: true, min: 0 }}
                            render={({ field }) => (
                                <TextField {...field} label="Precio" type="number" fullWidth required />
                            )}
                        />
                        <Controller
                            name="image"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, ...field } }) => (
                                <TextField
                                    type="file"
                                    slotProps={{
                                        htmlInput: {
                                            accept: "image/*",
                                        },
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                    {...field}
                                    onChange={handleImageChange}
                                    label="Imagen"
                                    fullWidth
                                    required={isNew}
                                />
                            )}
                        />
                        <Box marginY={"1rem"}>
                            <Typography variant="h6">Allergens</Typography>
                            {Object.values(Allergens).map((allergen) => (
                                <Chip
                                    key={allergen}
                                    label={allergen}
                                    color={selectedAllergens.includes(allergen) ? "success" : "default"} // Cambia el color si está seleccionado
                                    variant={selectedAllergens.includes(allergen) ? "filled" : "outlined"} // Cambia el variante si está seleccionado
                                    onClick={() => handleClickAllergen(allergen)}
                                    icon={selectedAllergens.includes(allergen) ? <Done /> : undefined}
                                    sx={{
                                        margin: "0.5rem 2rem 0 0",
                                        padding: "0.5rem",
                                        color: selectedAllergens.includes(allergen) ? "info.main" : "default",
                                        fontWeight: selectedAllergens.includes(allergen) ? "bold" : "normal",
                                    }}
                                    size={"medium"}
                                />
                            ))}
                            {selectedAllergensError && (
                                <Typography color="error" sx={{ mt: 2 }}>
                                    {selectedAllergensError}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button type="submit" variant="contained" color="primary">
                        {savingChanges ? (
                            <CircularProgress size={20} sx={{ color: "white" }} />
                        ) : isNew ? (
                            "Añadir"
                        ) : (
                            "Guardar Cambios"
                        )}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
