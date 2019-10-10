import * as actionTypes from "./actionsTypes";
import axios from "axios";

export const addIngredient = ingName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName
  };
};

export const removeIngredient = ingName => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName
  };
};

const setIngredients = ingredients => {
  return { type: actionTypes.SET_INGREDIENTS, ingredients: ingredients };
};
const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};
export const initIngredients = () => {
  return dispatch => {
    axios
      .get("https://www.mocky.io/v2/5d8f7bf93200005600adec70")
      .then(response => {
        console.log("Res", response.data);
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
