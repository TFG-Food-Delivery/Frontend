/**
 * Formats an ISO 8601 date string into a human-readable date and time string in the format "DD/MM/YYYY HH:MM".
 *
 * @param isoDateString - The ISO 8601 date string to be formatted.
 * @returns A formatted date and time string in the format "DD/MM/YYYY HH:MM".
 */
export const formatDate = (isoDateString: string) => {
    const date = new Date(isoDateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const formatDataMonthYear = (isoDateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
    }).format(new Date(isoDateString));
};
