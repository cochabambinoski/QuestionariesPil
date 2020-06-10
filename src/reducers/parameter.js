import {
    CHANGE_ERROR_REQUEST_PARAMETER_BI,
    CHANGE_STATE,
    CLEAN_REQUEST_PARAMETER_BI,
    GET_ALL_PARAMETERS,
    GET_DATA_PARAMETERS,
} from "../actions/actionTypes";

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
            const {parameters, types} = action.payload;
            console.log(parameters, types);
            let listParams = [];
            let type = types.find(t => {
                if (t.codeType === 'MAESTRO') {
                    return t;
                }
            });
            for (let parameter of parameters){
                if (parameter.group === type.typeId.toString()){
                    parameter.groupName = type.name;
                    listParams.push(parameter);
                    listParams.sort((a, b) => (a.group > b.group) ? 1 : (a.group === b.group) ? ((a.order > b.order) ? 1 : -1) : -1);
                }
            }

            return {...state, parameter: listParams, errorRequest: null}
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
                listParams.sort((a, b) => (a.group > b.group) ? 1 : (a.group === b.group) ? ((a.order > b.order) ? 1 : -1) : -1);
            }
            return {...state, parameter: listParams, errorRequest: null}
        }
        case CHANGE_ERROR_REQUEST_PARAMETER_BI: {
            return {state: errorState(action.payload)}
        }
        case CLEAN_REQUEST_PARAMETER_BI: {
            return {state: initialState}
        }
        case CHANGE_STATE: {
            const index = action.payload;
            return {
                ...state,
                parameter: state.parameter.map(
                    (content, i) => i === index ? {...content, state: "Procesando"}
                        : content
                )
            }
        }
        default: {
            return state
        }
    }
};
