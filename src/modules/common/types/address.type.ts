export type Address = {
    city: string;
    province: string;
    street: string;
    streetNumber: number;
    zipCode: string;
    additionalInfo?: string;
};

export type Coordinates = {
    lat: number;
    lng: number;
};
