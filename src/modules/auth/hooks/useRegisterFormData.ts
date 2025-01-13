import { RolesList } from "../../store/auth";
import dayjs from "dayjs";

export const useRegisterFormData = async ({ data, role }: { data: any; role: RolesList }) => {
    let formData;
    const formattedName = `${data.name}+${data.lastName}`.replace(/ /g, "+");
    const fallbackPhotoURL = `https://ui-avatars.com/api/?name=${formattedName}&background=random`;
    const { user, address } = {
        user: {
            name: data.name,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            email: data.email,
            password: data.password || "",
            dateOfBirth: dayjs(data.dateOfBirth).toISOString(),
            image: data.image !== undefined ? data.image : fallbackPhotoURL,
            role: role,
        },
        address: {
            street: data.street,
            streetNumber: Number(data.streetNumber) || undefined,
            city: data.city,
            province: data.province,
            zipCode: data.zipCode,
            additionalInfo: data.additionalInfo || "",
        },
    };
    if (role === RolesList.CUSTOMER) {
        formData = {
            user,
            address,
        };
        return formData;
    } else if (role === RolesList.RESTAURANT) {
        formData = {
            user,
            address,
            restaurantName: data.restaurantName,
            cuisineType: data.cuisineType,
            openHour: data.openHour,
            closeHour: data.closeHour,
        };
    } else if (role === RolesList.COURIER) {
        formData = {
            user,
            vehicleType: data.vehicleType.toUpperCase(),
        };
    } else {
        formData = {};
    }
    return formData;
};
