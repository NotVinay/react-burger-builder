import * as actionTypes from "./actions";

const initialState = {
  ingredients: {
    Salad: 0,
    Bacon: 0,
    Cheese: 0,
    Meat: 0
  },
  totalPrice: 4
};

const INGREDIENT_PRICES = {
  Salad: 0.5,
  Cheese: 0.4,
  Meat: 1.3,
  Bacon: 0.7
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      if (state.ingredients[action.ingredientName] > 0) {
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.ingredientName]:
              state.ingredients[action.ingredientName] - 1
          },
          totalPrice:
            state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
        };
      }
      break;
    default:
      break;
  }
  return state;
};

export default reducer;
