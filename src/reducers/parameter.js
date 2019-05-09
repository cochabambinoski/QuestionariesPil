import {
    CHANGE_ERROR_REQUEST_PARAMETER_BI,
    CLEAN_REQUEST_PARAMETER_BI,
    GET_ALL_PARAMETERS,
    GET_DATA_PARAMETERS,
} from "../action-types/actionTypes";

const errorState = error => ({
    parameter: [],
    errorRequest: error,
    showDialog: false,
});

const initialState = ({
    parameter: [],
    responseRequest: null,
    errorRequest: null,
    showDialog: false,
});

export const parameter = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PARAMETERS: {
            return {...state, parameter: action.payload, errorRequest: null}
        }
        case GET_DATA_PARAMETERS: {
            const {parameters, jobs, types} = action.payload;
            let listParams = [];
            for (let job of jobs) {
                let type = types.find(t => {
                    if (t.typeId === job.state) {
                        return t;
                    }
                });
                let parameter = parameters.find(p => {
                    if (p.id === job.parameter) {
                        return p;
                    }
                });
                let group = types.find(t => {
                    if (t.typeId === parseInt(parameter.group, 10)) {
                        return t;
                    }
                });
                parameter.state = type.name;
                parameter.groupName = group.name;
                listParams.push(parameter);
            }
            return {...state, parameter: listParams, errorRequest: null}
        }
        case CHANGE_ERROR_REQUEST_PARAMETER_BI: {
            return {state: errorState(action.payload)}
        }
        case CLEAN_REQUEST_PARAMETER_BI: {
            return {state: initialState}
        }
        default: {
            return state
        }
    }
};