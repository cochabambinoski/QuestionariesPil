import Constants from "../Constants";
import {setReachTypes, setSystemTypes} from "./index";

export const getTypesByClass = payload => {
    return () => {
        const url = `${Constants.ROUTE_WEB_SERVICES}${Constants.GET_TYPES_BY_CLASS}${encodeURIComponent(payload)}`;
        return fetch(url)
            .then(results => {
                return results.json();
            }).then(response => {
                return response;
            });
    };
};

export const getSystemsTypes = payload => {
    return dispatch => {
        return dispatch(getTypesByClass(payload))
            .then((response) => {
                dispatch(setSystemTypes(response));
            })
    };
};

export const getReachesTypes = payload => {
    return dispatch => {
        return dispatch(getTypesByClass(payload))
            .then((response) => {
                dispatch(setReachTypes(response));
            })
    };
};
