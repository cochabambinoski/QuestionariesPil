

export const getIndexQuestionary = (list, item) => {
    console.log(list);
    console.log(item);
    for (var i = 0; i < list.length; i++) {
        if (list[i].id === item.id) {
            return i;
        }
    }
    return -1;
};

export function remove(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
}