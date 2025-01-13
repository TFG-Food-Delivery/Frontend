import { CuisineType } from "../enum";
import { Address } from "./address";
import { RegisterUserProperties } from "./registerUser";

export type RegisterRestaurantProperties = {
    user?: RegisterUserProperties;

    restaurantName?: string | undefined;

    address?: Address | undefined;

    cuisineType?: CuisineType;
    openHour?: string;
    closeHour?: string;
};
