import { Address } from "../types";

export const formatAddress = (address: Address) => {
    const addressString = `${address.street} ${address.streetNumber}, ${address.zipCode} ${address.city}, ${address.province}`;
    return addressString;
};
