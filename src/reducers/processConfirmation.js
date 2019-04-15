import {
    GENERATION_EXPENSES, LOAD_COST_BASE_INFORMATION,
    LOAD_INPUT_BASE_INFORMATION
} from "../action-types/actionTypes"

const initialState = ({
    generationExpenses: null,
    loadBaseInput: null,
    loadBaseCost: null
});

export const processConfirmation = (state = initialState, action) => {
  switch (action.type) {
      case GENERATION_EXPENSES: {
          return {...state, generationExpenses: action.payload}
      }
      case LOAD_INPUT_BASE_INFORMATION: {
          return {...state, loadBaseInput: action.payload}
      }
      case LOAD_COST_BASE_INFORMATION: {
          return {...state, loadBaseCost: action.payload}
      }
      default:
          return state;
  }
};