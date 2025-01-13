import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Dish } from "../../customer/types";
import { ChangeEvent, useEffect, useState } from "react";
import { restaurantAPI } from "../../api";
import { useSelector } from "react-redux";
import { useCreateDish } from "../hooks";

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
    const [savingChanges, setSavingChanges] = useState(false);

    const { control, handleSubmit, reset, setValue, getValues } = useForm<Dish>({
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            image: null as File | null,
            categoryId,
        },
    });

    useEffect(() => {
        if (dish) {
            reset(dish);
        } else {
            reset({
                name: "",
                description: "",
                price: 0,
                image: "",
                categoryId,
            });
        }
    }, [dish, reset]);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("entra: " + event.target.files);
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            console.log(`Image ${file.name} selected`);
            setPhotoFile(file);

            setValue("image", file, { shouldDirty: true });
            console.log("image:", getValues("image"));
        }
    };

    const uploadImageToS3 = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append("file", file);
        // Endpoint del backend para subir la imagen a S3
        const response = await restaurantAPI
            .post(`/${restaurantId}/upload-image`, formData)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            }); // La respuesta debe incluir la URL de la imagen
        console.log("response:", response);
        return response.url;
    };

    const onSubmit = async (data: Partial<Dish>) => {
        // Aquí iría la lógica para guardar o actualizar el plato
        console.log(data);
        setSavingChanges(true);
        let imageUrl = "";
        if (photoFile) {
            console.log("photoFile:", photoFile);
            imageUrl = await uploadImageToS3(photoFile);
            console.log("Image uploaded to S3 with URL:", imageUrl);
        }

        const updatedData = getValues();
        console.log("updatedData:", { ...updatedData });

        const dish = await useCreateDish(restaurantId, {
            ...updatedData,
            image: imageUrl,
            categoryId: categoryId!,
        });
        console.log("dish:", dish);
        setData((prevData: Dish[]): Dish[] => [...prevData, dish]);
        setSavingChanges(false);

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
                                    required
                                />
                            )}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancelar</Button>
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
