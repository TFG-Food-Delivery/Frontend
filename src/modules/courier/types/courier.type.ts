import { VehicleType } from "../enum";

export type Courier = {
    id: string;
    email: string;
    vehicleType: VehicleType;
    availability: boolean;
    ratingAvg: number;
    orderAssigned: string;
};
