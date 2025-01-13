import { Address } from "./address";
import { RegisterUserProperties } from "./registerUser";

export type RegisterCustomerProperties = {
    user?: RegisterUserProperties | undefined;

    address?: Address | undefined;
};
