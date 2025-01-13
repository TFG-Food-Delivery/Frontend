import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

interface DeliveryDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    pin: string;
    onPinChange: (value: string) => void;
    error: string | null;
}

export const DeliveryDialog = ({ open, onClose, onConfirm, pin, onPinChange, error }: DeliveryDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm Order</DialogTitle>
            <DialogContent>
                <p>Enter the PIN provided by the customer:</p>
                <TextField
                    label="PIN"
                    variant="outlined"
                    fullWidth
                    value={pin}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            onConfirm();
                        }
                    }}
                    onChange={(e) => onPinChange(e.target.value)}
                    type="password"
                    slotProps={{ htmlInput: { maxLength: 4 } }}
                    error={!!error}
                    helperText={error}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="primary">
                    Deliver
                </Button>
            </DialogActions>
        </Dialog>
    );
};
