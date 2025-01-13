import { Check } from "@mui/icons-material";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from "@mui/material";
import { useState } from "react";
import { useCreateCategory } from "../hooks";
import { useSelector } from "react-redux";

interface CategoryDialogProps {
    open: boolean;
    onClose: () => void;
    setData: (data: any) => void;
}

export const CategoryDialog = ({ open, onClose, setData }: CategoryDialogProps) => {
    const { uid } = useSelector((state: any) => state.auth);
    const [categoryName, setCategoryName] = useState("");
    const onSubmit = async (data: any) => {
        const newCategory = await useCreateCategory(uid, categoryName);
        setData((prevData: any) => [
            ...prevData,
            {
                categoryId: newCategory.id,
                categoryName: newCategory.name,
                dishes: [],
            },
        ]);
        setCategoryName("");
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add Category</DialogTitle>
            <DialogContent>
                <TextField
                    label="Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    fullWidth
                    placeholder="Category Name"
                    sx={{ mt: 3 }}
                />
            </DialogContent>
            <DialogActions sx={{ my: 1, mx: 3 }}>
                <Button onClick={onClose}>Cancelar</Button>
                <Button variant="contained" color="primary" onClick={onSubmit} endIcon={<Check />}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};
