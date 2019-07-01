export function formatDateToString(date) {
    const year = date.toString().substring(4, 0);
    const month = date.toString().substring(6,4);
    const day = date.toString().substring(8,6);
    return `${day}/${month}/${year}`
}
