import data from './data';
import session from './session';
import { combineReducers} from 'redux-immutable';

const rootReducer = combineReducers({
    data,
    session
});

export default rootReducer;