import * as actionTypes from "./actionsTypes";
import axios from "axios";

const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

const purchaseBurgerSucess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

const purchaseBurgerFailed = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error
  };
};

export const purchaseBurger = orderData => {
  return dispatch => {
    // replace it to post the data to server
    console.log("Purchasing");
    dispatch(purchaseBurgerStart());
    setTimeout(() => {
      dispatch(purchaseBurgerSucess(Math.random(), orderData));
      console.log();
    }, 2000);
  };
};

export const purchaseBurgerInit = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_INIT
  };
};

const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

const fetchOrdersFailed = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error
  };
};
const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};
export const fetchOrdersInit = token => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    if (token) {
      axios
        .get("https://www.mocky.io/v2/5d9e72bf3200008d07329d8e")
        .then(res => {
          dispatch(fetchOrdersSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchOrdersFailed("Error"));
        });
    } else {
      dispatch(fetchOrdersFailed("Not Authenticated"));
    }
  };
};
