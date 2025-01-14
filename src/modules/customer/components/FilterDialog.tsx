import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Chip, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { CuisineType } from "../../common/types";
import { useState } from "react";

interface FilterDialogProps {
    open: boolean;
    onClose: () => void;
    setSelectedCuisineTypes: (cuisineTypes: CuisineType[]) => void;
}

export const FilterDialog = ({ open, onClose, setSelectedCuisineTypes }: FilterDialogProps) => {
    const [selectedCTs, setSelectedCTs] = useState<CuisineType[]>([]);

    const handleToggleCuisineType = (cuisineType: CuisineType) => {
        setSelectedCTs(
            selectedCTs.includes(cuisineType)
                ? selectedCTs.filter((type) => type !== cuisineType)
                : [...selectedCTs, cuisineType]
        );
    };

    const handleApplyFilters = () => {
        setSelectedCuisineTypes(selectedCTs);
        onClose();
    };

    const handleClearFilters = () => {
        setSelectedCTs([]);
        handleApplyFilters();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Filter by cuisine type
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ display: "flex", flexWrap: "wrap", gap: 1, pt: 2 }}>
                {Object.values(CuisineType).map((cuisineType) => (
                    <Chip
                        key={cuisineType}
                        label={cuisineType}
                        onClick={() => handleToggleCuisineType(cuisineType)}
                        color={selectedCTs.includes(cuisineType) ? "primary" : "default"}
                        clickable
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClearFilters}>Clear filters</Button>
                <Button onClick={handleApplyFilters} variant="contained">
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    );
};
