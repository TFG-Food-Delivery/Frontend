import * as joi from "joi";
import { registerSchema, RegistrationFormData } from "./registrationSchema";
import { CuisineType } from "../../../../store/auth";

export const registerRestaurantSchema = registerSchema.append({
    restaurantName: joi.string().required(),
    openHour: joi
        .string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/) // Valida formato HH:mm (24 horas)
        .required()
        .messages({
            "string.pattern.base": "Opening hour must be in HH:mm format.",
            "any.required": "Opening hour is required.",
        }),
    closeHour: joi
        .string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/) // Valida formato HH:mm (24 horas)
        .required()
        .custom((value, helpers) => {
            // Obtén el valor de openHour desde el contexto
            const openHour = parseTime(helpers.state.ancestors[0].openHour);
            const closeHour = parseTime(value);

            if (closeHour <= openHour) {
                return helpers.error("any.invalid", {
                    message: "The closing time must be later than the opening time.",
                });
            }

            return value; // Devuelve el valor si es válido
        })
        .messages({
            "string.pattern.base": "Closing hour must be in HH:mm format.",
            "any.required": "Closing hour is required.",
            "any.invalid": "The closing time must be later than the opening time.",
        }),
});

// Función para convertir "HH:mm" a minutos totales
function parseTime(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

export type RestaurantRegistrationFormData = RegistrationFormData & {
    restaurantName: string;
    cuisineType: CuisineType;
    openHour: string;
    closeHour: string;
};
