import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { addItemToCartThunk, restartCartThunk } from "../../store/cart";

type Props = {
    dishId: string | null;
    open: boolean;
    setOpen: (open: boolean) => void;
};

export const DifferentRestaurantDialog = ({ dishId, open, setOpen }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const { uid: userId } = useSelector((state: any) => state.auth);
    const handleClose = () => {
        setOpen(false);
    };

    const onKeepCurrentRestaurant = () => {
        handleClose();
        return;
    };

    const onReplaceCart = async () => {
        if (dishId != null) {
            const result = await dispatch(restartCartThunk(userId));

            await dispatch(addItemToCartThunk(userId, dishId, true));
            handleClose();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="cancel-order-dialog-title"
            aria-describedby="cancel-order-dialog-description"
        >
            <DialogTitle id="different-restaurant-dialog-title">Add Items from a Different Restaurant</DialogTitle>
            <DialogContent>
                <DialogContentText id="different-restaurant-dialog-description">
                    You are trying to add items from a different restaurant. Your current cart will be replaced if you
                    proceed. Do you want to keep your current cart or replace it with items from this new restaurant?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onKeepCurrentRestaurant} color="primary">
                    No, Keep Current Cart
                </Button>
                <Button onClick={onReplaceCart} color="error" autoFocus>
                    Yes, Replace Cart
                </Button>
            </DialogActions>
        </Dialog>
    );
};
