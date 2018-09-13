

export const getIndexQuestionary = (list, item) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === item.id) {
            return i;
        }
    }
    return -1;
};

export const getIndexItem = (list, item) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === item.id) {
            return i;
        }
    }
    return -1;
};

export const changeOperationId = (list, item, operationId) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === item.id) {
            list[i].operacionId = operationId;
        }
    }
    return list;
};

export const getItemsEnabled = (list) => {
    let count = 0;
    for (let i = 0; i < list.length; i++) {
        if (list[i].operacionId === 1) {
            count = count +1;
        }
    }
    return count;
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