import { Dayjs } from "dayjs";
import * as joi from "joi";

const today = new Date();
const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
const hundredYearsAgo = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());

export const googleRegistrationSchema = joi.object({
    name: joi.string().required(),
    lastName: joi.string().required(),
    phoneNumber: joi.string().required(),
    email: joi
        .string()
        .required()
        .email({ tlds: { allow: ["com", "net", "es"] } }),
    dateOfBirth: joi.date().iso().max(eighteenYearsAgo).min(hundredYearsAgo).required().messages({
        "date.max": "You must be at least 18 years old.",
        "date.min": "Enter a valid date.",
        "date.base": "Invalid date format.",
        "any.required": "Date of birth is required.",
    }),
    street: joi.string().required(),
    streetNumber: joi.string().required(),
    city: joi.string().required(),
    province: joi.string().required(),
    zipCode: joi.string().required(),
    additionalInfo: joi.string().optional().allow(""),
});

export type GoogleRegistrationFormData = {
    name: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    dateOfBirth: Date | null; // ISO string format for date
    street: string;
    streetNumber: string;
    city: string;
    province: string;
    zipCode: string;
    additionalInfo?: string;
    photoURL?: string; // Optional field
};
