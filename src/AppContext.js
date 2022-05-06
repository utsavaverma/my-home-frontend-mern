// Author: Harsh Bhatt (B00877053)

import { createContext, useReducer } from "react";

//! User Files

import * as ActionTypes from "common/actionTypes";
// import api from "common/api";
import { CART, ROLE, TOKEN, USER, USER_ID } from "common/constants";
import axios from "axios";

const getLoggedInUser = () => {
  let loggedInUser = localStorage.getItem(USER);
  loggedInUser = loggedInUser ? JSON.parse(loggedInUser) : null;
  return loggedInUser;
};

const getUserId = () => {
  return localStorage.getItem(USER_ID)
    ? parseInt(localStorage.getItem(USER_ID))
    : "";
};

const getRole = () => {
  return localStorage.getItem(ROLE)
    ? localStorage.getItem(ROLE)
    : "room_seeker";
};

const getCartItems = () => {
  return localStorage.getItem(CART) ? localStorage.getItem(CART) : 0;
};

const initialState = {
  currentUser: getLoggedInUser() || {},
  userId: getUserId(),
  authToken: localStorage.getItem(TOKEN),
  authenticated: false,
  role: getRole(),
  cartItems: getCartItems(),
};

const reducer = (state, action) => {
  switch (action.type) {
    //! USER
    case ActionTypes.SET_CURRENT_USER:
      const user = action.data || {};
      localStorage.setItem(
        USER,
        user && Object.keys(user).length ? JSON.stringify(user) : null
      );
      return { ...state, currentUser: { ...user } };
    case ActionTypes.SET_USER_ID:
      localStorage.setItem(USER_ID, action.data);
      return { ...state, userId: action.data };
    case ActionTypes.SET_AUTHENTICATED:
      return { ...state, authenticated: action.data };
    case ActionTypes.SET_TOKEN:
      axios.defaults.headers.common = {
        Authorization: `Bearer ${action.data}`,
      };
      localStorage.setItem(TOKEN, action.data);
      return { ...state, authToken: action.data };
    case ActionTypes.SET_ROLE:
      localStorage.setItem(ROLE, action.data);
      return { ...state, role: action.data };
    case ActionTypes.SET_CART:
      localStorage.setItem(CART, action.data);
      return { ...state, cartItems: action.data };
    //! LOGOUT
    case ActionTypes.LOGOUT:
      delete axios.defaults.headers.common.Authorization;
      localStorage.clear();
      return {
        ...initialState,
        authenticated: false,
        authToken: null,
        currentUser: {},
      };
    default:
      return { ...state };
  }
};

const AppContext = createContext({
  state: initialState,
  dispatch: () => {},
});

function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getToken = () => {
    return localStorage.getItem(TOKEN) || null;
  };

  // eslint-disable-next-line
  const getCurrentUser = () => {
    return localStorage.getItem(USER)
      ? JSON.parse(localStorage.getItem(USER))
      : {};
  };

  const initializeAuth = (authToken) => {
    const token = authToken || getToken();
    const user = getCurrentUser();
    const userId = getUserId();
    const role = getRole();
    const cartItems = getCartItems();

    if (token) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${token}`,
      };
      dispatch({ type: ActionTypes.SET_TOKEN, data: token });
      dispatch({ type: ActionTypes.SET_AUTHENTICATED, data: true });
      dispatch({ type: ActionTypes.SET_CURRENT_USER, data: user });
      dispatch({ type: ActionTypes.SET_USER_ID, data: userId });
      dispatch({ type: ActionTypes.SET_ROLE, data: role });
      dispatch({ type: ActionTypes.SET_CART, data: cartItems });
    }
  };

  const value = {
    state,
    dispatch,
    initializeAuth,
    getToken,
    getUserId,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

const AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
