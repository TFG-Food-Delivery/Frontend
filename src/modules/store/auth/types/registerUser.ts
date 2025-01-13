import { RolesList } from "../enum/user-roles.enum";

export type RegisterUserProperties = {
    name: string;

    lastName: string;

    email: string;

    password: string;

    phoneNumber: string;

    dateOfBirth: string;

    role: RolesList;

    photoURL?: string;
};
