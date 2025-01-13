import { VehicleType } from "../enum/vehicle-type.enum";
import { RegisterUserProperties } from "./registerUser";

export type RegisterCourierProperties = {
    user: RegisterUserProperties;
    vehicleType: VehicleType;
};
