import * as actionTypes from "../actions/actionsTypes";
import * as utilities from "../../shared/Utility";

const initialState = {
  orders: [],
  loading: false,
  purchasing: false
};

const purchaseBurgerSuccess = (state, action) => {
  const orderData = utilities.updateObject(action.orderData, {
    id: action.orderId
  });
  return utilities.updateObject(state, {
    orders: state.orders.concat(orderData),
    loading: false,
    purchasing: false
  });
};

const purchaseBurgerFailed = (state, action) => {
  return utilities.updateObject(state, { loading: false });
};

const purchaseBurgerStart = (state, action) => {
  return utilities.updateObject(state, {
    loading: true
  });
};

const purchaseBurgerInit = (state, action) => {
  return utilities.updateObject(state, {
    purchasing: true
  });
};

const fetchOrdersSuccess = (state, action) => {
  return utilities.updateObject(state, {
    orders: action.orders,
    loading: false
  });
};
const fetchOrdersFailed = (state, action) => {
  return utilities.updateObject(state, {
    loading: false
  });
};
const fetchOrdersStart = (state, action) => {
  return utilities.updateObject(state, {
    loading: true
  });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAILED:
      return purchaseBurgerFailed(state, action);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);
    case actionTypes.PURCHASE_BURGER_INIT:
      return purchaseBurgerInit(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAILED:
      return fetchOrdersFailed(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);

    default:
      break;
  }
  return state;
};

export default reducer;
