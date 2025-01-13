import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface PickUpDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const PickUpDialog = ({ open, onClose, onConfirm }: PickUpDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Pick Up Order</DialogTitle>
            <DialogContent>
                <p>Confirm you have picked up the order from the restaurant</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="primary">
                    Pick Up
                </Button>
            </DialogActions>
        </Dialog>
    );
};
