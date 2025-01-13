import * as joi from "joi";

export const loginSchema = joi.object({
    email: joi
        .string()
        .email({ tlds: { allow: ["com", "net", "es"] } })
        .required(),
    password: joi.string().required().min(6),
});

export type LoginFormData = {
    email: string;
    password: string;
};
