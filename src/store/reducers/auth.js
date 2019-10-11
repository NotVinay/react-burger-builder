import * as actionTypes from "../actions/actionsTypes";
import * as utilities from "../../shared/Utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const authStart = (state, action) => {
  return utilities.updateObject(state, { loading: true, error: false });
};
const authFailed = (state, action) => {
  console.log("Failed");
  return utilities.updateObject(state, { loading: false, error: action.error });
};
const authSuccess = (state, action) => {
  return utilities.updateObject(state, {
    token: action.token,
    userId: action.userId,
    loading: false,
    error: false
  });
};
const authLogout = (state, action) => {
  return utilities.updateObject(state, {
    token: null,
    userId: null,
    error: false,
    loading: false
  });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAILED:
      return authFailed(state, action);
    case actionTypes.LOGOUT:
      return authLogout(state, action);
    default:
      break;
  }
  return state;
};

export default reducer;
