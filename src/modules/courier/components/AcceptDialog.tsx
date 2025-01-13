import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

interface AcceptDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const AcceptDialog = ({ open, onClose, onConfirm }: AcceptDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm Order</DialogTitle>
            <DialogContent>
                <p>Are you sure you want to accept this order and deliver it?</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="primary">
                    Accept
                </Button>
            </DialogActions>
        </Dialog>
    );
};
