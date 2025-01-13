import { useState } from "react";
import { useGetCoords } from "../../common/hooks";
import { Coordinates } from "../../common/types";
import { Restaurant } from "../../restaurant/types";

const googleKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;
export const useLocationTracking = () => {
    const [coords, setCoords] = useState<Coordinates[] | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);

    const fetchLocation = async ({
        restaurantData,
        customerData,
    }: {
        restaurantData?: Restaurant;
        customerData?: any;
    }) => {
        if (!navigator.geolocation) {
            setLocationError("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                setLocationError(null);
                const courierCoords = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                if (!restaurantData?.address) {
                    setLocationError("Restaurant address is not available.");
                    return;
                }
                let coords;
                if (restaurantData) {
                    const restaurantCoords = await useGetCoords(restaurantData?.address, googleKey);
                    coords = restaurantCoords;
                }
                if (customerData) {
                    if (!customerData?.address) {
                        setLocationError("Restaurant address is not available.");
                        return;
                    }
                    const customerCoords = await useGetCoords(customerData?.address, googleKey);
                    coords = customerCoords;
                }

                if (courierCoords && coords) {
                    setCoords([courierCoords, coords]);
                }
            },
            (error) => {
                setLocationError("Unable to retrieve location. Please enable location services and refresh the page.");
                console.error(error);
            }
        );
    };

    return { coords, locationError, fetchLocation };
};
