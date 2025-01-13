import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Dish } from "../../customer/types";
import { restaurantAPI } from "../../api";

interface DeleteDishDialogProps {
    open: boolean;
    onClose: () => void;
    dish: Dish | null;
    categoryId: string | undefined;
    setData: (data: any) => void;
}

export const DeleteDishDialog = ({ open, onClose, dish, categoryId, setData }: DeleteDishDialogProps) => {
    const handleConfirm = async () => {
        console.log("dish:", dish);
        console.log("categoryId:", categoryId);
        try {
            await restaurantAPI.delete(`/menu/${dish?.id}`);

            setData((prevData: any) =>
                prevData.map((category: any) =>
                    category.categoryId === categoryId
                        ? {
                              ...category,
                              dishes: category.dishes.filter((d: Dish) => d.id !== dish?.id),
                          }
                        : category
                )
            );

            onClose();
        } catch (error) {
            console.error("Error deleting dish:", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="delete-dish-dialog">
            <DialogTitle id="delete-dish-dialog">Confirm Deletion</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete the dish "{dish?.name}"? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="error" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};
