// Author: Harsh Bhatt (B00877053)

import React, { useContext, useEffect } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";

//! User Files

import * as ActionTypes from "common/actionTypes";
import App from "app/App";
import Error from "components/Error";
import { ROUTES, TOKEN } from "common/constants";
import Login from "modules/auth/login";
import Signup from "modules/auth/signup";
import PrivateRoute from "PrivateRoute";
import Homepage from "modules/home";
import ForgotPassword from "modules/auth/components/ForgotPassword";
import { AppContext } from "AppContext";
import jwtDecode from "jwt-decode";
import ResetPassword from "modules/auth/components/ResetPassword";
import AccountActivation from "modules/auth/components/AccountActivation";
import Logout from "modules/auth/components/Logout";
import Header from "app/components/Header";
// import RoomOwner from "modules/room_owner/components/AddProperty";
// import MyListings from "modules/room_owner/components/MyListings";
// import EditListing from "modules/room_owner/components/EditListing";

function Routing() {
  const { initializeAuth, dispatch } = useContext(AppContext);
  const location = useLocation();
  const openPages = [
    {
      pageLink: ROUTES.HOME,
      view: Homepage,
    },
    {
      pageLink: ROUTES.LOGIN_SEEKER,
      view: Login,
    },
    {
      pageLink: ROUTES.LOGIN_OWNER,
      view: Login,
    },
    {
      pageLink: ROUTES.LOGIN_ADMIN,
      view: Login,
    },
    {
      pageLink: ROUTES.SIGNUP_SEEKER,
      view: Signup,
    },
    {
      pageLink: ROUTES.SIGNUP_OWNER,
      view: Signup,
    },
    {
      pageLink: ROUTES.FORGOT_PASSWORD,
      view: ForgotPassword,
    },
    {
      pageLink: ROUTES.RESET_PASSWORD,
      view: ResetPassword,
    },
    {
      pageLink: ROUTES.ACTIVATE_ACCOUNT,
      view: AccountActivation,
    },
    {
      pageLink: ROUTES.LOGOUT,
      view: Logout,
    },
    {
      pageLink: ROUTES.ERROR,
      view: Error,
    },
    // {
    //   pageLink: ROUTES.ROOM_OWNER_PATH,
    //   view: RoomOwner,
    // },
    // {
    //   pageLink: ROUTES.ROOM_OWNER_LISTINGS_PATH,
    //   view: MyListings,
    // },
    // {
    //   pageLink: ROUTES.EDIT_LISTING_PATH,
    //   view: EditListing,
    // },
  ];

  useEffect(() => {
    initializeAuth();
    if (localStorage.getItem(TOKEN)) {
      const token = localStorage.getItem(TOKEN);
      const decoded = jwtDecode(token);
      const expiresAt = decoded.exp;
      const currentTime = Date.now();

      if (expiresAt < currentTime / 1000) {
        dispatch({ type: ActionTypes.LOGOUT });
      }
    }
    // eslint-disable-next-line
  }, []);

  const routes = (
    <Routes location={location}>
      {openPages.map((page, index) => {
        return (
          <Route
            exact
            path={page.pageLink}
            element={<page.view />}
            key={index}
          />
        );
      })}
      <Route exact path={ROUTES.HOME} element={<PrivateRoute />}>
        <Route exact path={ROUTES.MAIN} element={<App />} />
      </Route>
      <Route path={ROUTES.UNKNOWN} element={<Navigate to={ROUTES.ERROR} />} />
    </Routes>
  );

  return (
    <div className="container">
      {location.pathname === ROUTES.HOME && <Header />}
      <div className="public-route-wrapper">{routes}</div>
    </div>
  );
}

export default Routing;
