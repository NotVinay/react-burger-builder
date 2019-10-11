import * as actionTypes from "./actionsTypes";
import axios from "axios";

const authSuccess = (token, userId) => {
  //this thing should be done in the exported function
  const expirationTime = new Date(new Date().getTime + 3600 * 1000);
  localStorage.setItem("token", token.toString());
  localStorage.setItem("expirationTime", expirationTime);
  localStorage.setItem("userId", userId);
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId
  };
};

const authFailed = error => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error
  };
};

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.LOGOUT
  };
};

const checkAuthTimeout = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, 3600000);
  };
};

export const authInit = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    // sign up the user here and setup a token
    if (isSignUp) {
      setTimeout(() => {
        dispatch(authSuccess(Math.random(), email));
        dispatch(checkAuthTimeout());
      }, 2000);
    } else {
      setTimeout(() => {
        if (email === "test@test.com" && password === "test") {
          dispatch(authSuccess(Math.random(), email));
          dispatch(checkAuthTimeout());
        } else {
          dispatch(authFailed("Incorrect Details"));
        }
      }, 2000);
    }
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout);
    } else {
      const expirationTime = new Date(localStorage.getItem("expirationTime"));
      if (expirationTime > new Date()) {
        dispatch(authSuccess(token, localStorage.getItem("userId")));
        dispatch(checkAuthTimeout());
      } else {
        dispatch(logout());
      }
    }
  };
};
