import * as actionTypes from "../actions/actionsTypes";
import * as utilities from "../utility";
const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICES = {
  Salad: 0.5,
  Cheese: 0.4,
  Meat: 1.3,
  Bacon: 0.7
};
const addIngredient = (state, action) => {
  const addIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  };
  const addIngredients = utilities.updateObject(
    state.ingredients,
    addIngredient
  );
  return utilities.updateObject(state, {
    ingredients: addIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  });
};

const removeIngredient = (state, action) => {
  const remIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
  };
  const remIngredients = utilities.updateObject(
    state.ingredients,
    remIngredient
  );
  if (state.ingredients[action.ingredientName] > 0) {
    return utilities.updateObject(state, {
      ingredients: remIngredients,
      totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    });
  }
};

const setIngredients = (state, action) => {
  return utilities.updateObject(state, {
    ingredients: action.ingredients,
    error: false,
    totalPrice: 4
  });
};

const fetchIngredientsFailed = (state, action) => {
  return utilities.updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);
    default:
      break;
  }
  return state;
};

export default reducer;
