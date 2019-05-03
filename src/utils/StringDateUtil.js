export function formatDateToString(date) {
    console.log(date.toString());
    const year = date.toString().substring(4, 0);
    const month = date.toString().substring(6,5);
    const day = date.toString().substring(8,7);
    return `${day}/${month}/${year}`
}
