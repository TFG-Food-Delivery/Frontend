import { customerAPI } from "../../api";

export const useUpdateCustomerProfile = (customerId: string, updatedData: any) => {
    const payload = {
        user: {
            email: updatedData.email,
            phoneNumber: updatedData.phoneNumber,
            image: updatedData.image,
        },
        address: {
            street: updatedData.address.street,
            streetNumber: updatedData.address.streetNumber,
            zipCode: updatedData.address.zipCode,
            city: updatedData.address.city,
            province: updatedData.address.province,
            additionalInfo: updatedData.address.additionalInfo,
        },
    };

    const submitForm = async () => {
        try {
            console.log(payload);
            await customerAPI.patch(`/${customerId}`, payload);

            return null;
        } catch (err: any) {
            return true;
        }
    };
    const error = submitForm();

    return error;
};
