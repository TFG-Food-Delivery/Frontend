import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { useCancelOrder } from "../hooks";

type Props = {
    orderId: string;
    open: boolean;
    setOpen: (open: boolean) => void;
};

const CancelOrderDialog = ({ orderId, open, setOpen }: Props) => {
    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmCancel = async () => {
        await useCancelOrder(orderId);
        handleClose();
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="cancel-order-dialog-title"
            aria-describedby="cancel-order-dialog-description"
        >
            <DialogTitle id="cancel-order-dialog-title">"Cancel Order"</DialogTitle>
            <DialogContent>
                <DialogContentText id="cancel-order-dialog-description">
                    Are you sure you want to cancel this order? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    No, Keep Order
                </Button>
                <Button onClick={handleConfirmCancel} color="error" autoFocus>
                    Yes, Cancel Order
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CancelOrderDialog;
