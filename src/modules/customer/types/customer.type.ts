import { Address } from "../../common/types";

export type Customer = {
    email: string;
    name: string;
    password: string;
    image: string;
    dateOfBirth: string;
    phoneNumber: string;
    loyaltyPoints: number;
    address: Address;
    createdAt: string;
};
