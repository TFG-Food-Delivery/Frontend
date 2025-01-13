export type Dish = {
    id: string;
    name: string;
    description: string;
    image: File | string | null;
    price: number | null;
    isAvailable?: boolean;
    restaurantId: string;
    categoryId: string;
};
