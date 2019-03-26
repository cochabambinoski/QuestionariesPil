import {GENERATION_EXPENSES} from "../action-types/actionTypes"

const initialState = ({
    generationExpenses: null,
});

export const processConfirmation = (state = initialState, action) => {
  switch (action.type) {
      case GENERATION_EXPENSES: {
          return {...state, generationExpenses: action.payload}
      }
      default:
          return state;
  }
};