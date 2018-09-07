

export const getIndexQuestionary = (list, item) => {
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

export const getBrancehsByIdCity = (branches, idCity) => filter.call(branches, function(item) {
    // return item.codigoSap === codSap;
    return 1;
});

export function existElementInList(item, list) {
    let exist = getIndexQuestionary(list,item);
    return exist !== -1;
}

export const filter  = Array.prototype.filter;