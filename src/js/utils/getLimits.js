export function getItemsLimit() {
    const width = window.innerWidth;
    if (width < 768) {
        return {
            filters: 9,
            exercises: 8,
        };
    }
    return {
        filters: 12,
        exercises: 10,
    };
}
