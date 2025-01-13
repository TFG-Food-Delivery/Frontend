import { Address } from "../../store/auth";
import { Coordinates } from "../types";

export const useGetCoords = (address: Address, googleKey: string) => {
    const getAddressCoordinates = async (address: Address, googleKey: string): Promise<Coordinates | null> => {
        try {
            const addressString = `${address.street} ${address.streetNumber}, ${address.zipCode} ${address.city}, ${address.province}`;
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                    addressString
                )}&key=${googleKey}`
            );
            const gcResponse = await response.json();
            if (gcResponse.results && gcResponse.results.length > 0) {
                return gcResponse.results[0].geometry.location;
            } else {
                console.error("No results found");
                return null;
            }
        } catch (error) {
            console.error("Error al geocodificar la dirección:", error);
            return null;
        }
    };
    return getAddressCoordinates(address, googleKey);
};
