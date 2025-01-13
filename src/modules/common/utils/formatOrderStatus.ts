import { OrderStatus } from "../enum";

/**
 * Converts an order status enum into a human-readable format.
 *
 * @param orderStatus - The order status enum to be formatted.
 * @returns The formatted order status string.
 *
 * @example
 * ```typescript
 * import { OrderStatus } from "../../restaurant/enum";
 *
 * const orderStatus = OrderStatus.DELIVERED;
 * const formattedStatus = formatOrderStatus(orderStatus);
 * console.log(formattedStatus); // Output: Delivered
 * ```
 */
export const formatOrderStatus = (orderStatus: OrderStatus) => {
    return orderStatus
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/^\w/, (c: string) => c.toUpperCase());
};
