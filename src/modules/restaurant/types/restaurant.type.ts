export type Restaurant = {
    address: {
        id: string;
        street: string;
        streetNumber: number;
        city: string;
        province: string;
        zipCode: string;
    };
    closeHour: string;
    createdAt: string;
    cuisineType: string;
    description: string;
    email: string;
    id: string;
    image: string;
    isOpen: boolean;
    name: string;
    openHour: string;
    ratingAvg: number;
};
