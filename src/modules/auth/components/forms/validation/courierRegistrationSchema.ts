import * as joi from "joi";
import { VehicleType } from "../../../../store/auth/enum/vehicle-type.enum";
import { RegistrationFormData } from "./registrationSchema";

const today = new Date();
const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
const hundredYearsAgo = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());

export const registerCourierSchema = joi.object({
    name: joi.string().required(),
    lastName: joi.string().required(),
    phoneNumber: joi.string().required(),
    email: joi
        .string()
        .required()
        .email({ tlds: { allow: ["com", "net", "es"] } }),
    confirmEmail: joi.string().required().valid(joi.ref("email")),
    password: joi
        .string()
        .min(8)
        .regex(/[A-Z]/, "uppercase")
        .regex(/[a-z]/, "lowercase")
        .regex(/[0-9]/, "number")
        .regex(/[@$!%*?&]/, "special character")
        .required()
        .messages({
            "string.base": "Password must be a string.",
            "string.empty": "Password cannot be empty.",
            "string.min": "Password must be at least 8 characters long.",
            "string.pattern.name": "Password must include at least one {#name}.",
            "any.required": "Password is required.",
        }),
    confirmPassword: joi.string().required().valid(joi.ref("password")),
    dateOfBirth: joi.date().iso().max(eighteenYearsAgo).min(hundredYearsAgo).required().messages({
        "date.max": "You must be at least 18 years old.",
        "date.min": "Enter a valid date.",
        "date.base": "Invalid date format.",
        "any.required": "Date of birth is required.",
    }),
    vehicleType: joi.string().required(),
});

export type CourierRegistrationFormData = RegistrationFormData & {
    vehicleType: VehicleType;
};
