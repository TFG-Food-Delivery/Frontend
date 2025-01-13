import { AdvancedMarker, APIProvider, Map, Pin } from "@vis.gl/react-google-maps";
import { DeliveryDining, RadioButtonChecked } from "@mui/icons-material";
import { Coordinates } from "../../common/types";

type Props = {
    coordsRestaurant?: Coordinates;
    coordsCustomer?: Coordinates;
    coordsCourier?: Coordinates;
};

const googleKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;
export const GoogleMapReact = ({ coordsRestaurant, coordsCustomer, coordsCourier }: Props) => {
    const bounds =
        coordsRestaurant || coordsCustomer || coordsCourier
            ? {
                  north: Math.max(coordsRestaurant?.lat || -90, coordsCustomer?.lat || -90, coordsCourier?.lat || -90),
                  south: Math.min(coordsRestaurant?.lat || 90, coordsCustomer?.lat || 90, coordsCourier?.lat || 90),
                  east: Math.max(
                      coordsRestaurant?.lng || -180,
                      coordsCustomer?.lng || -180,
                      coordsCourier?.lng || -180
                  ),
                  west: Math.min(coordsRestaurant?.lng || 180, coordsCustomer?.lng || 180, coordsCourier?.lng || 180),
              }
            : undefined;

    return (
        <APIProvider apiKey={googleKey}>
            {bounds && (
                <Map
                    style={{ width: "100%", height: "500px" }}
                    defaultBounds={bounds}
                    mapId={"739af084373f96fe"}
                    gestureHandling={"greedy"}
                    disableDefaultUI={true}
                >
                    {/* Marcador del restaurante */}
                    {coordsRestaurant && (
                        <AdvancedMarker position={coordsRestaurant}>
                            <RadioButtonChecked />
                        </AdvancedMarker>
                    )}
                    {/* Marcador del cliente */}
                    {coordsCustomer && (
                        <AdvancedMarker position={coordsCustomer}>
                            <Pin background={"black"} borderColor={"white"} glyphColor={"white"}></Pin>
                        </AdvancedMarker>
                    )}
                    {/* Marcador del repartidor */}
                    {coordsCourier && (
                        <AdvancedMarker position={coordsCourier}>
                            <DeliveryDining />
                        </AdvancedMarker>
                    )}
                </Map>
            )}
        </APIProvider>
    );
};
