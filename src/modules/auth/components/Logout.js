// Author: Harsh Bhatt (B00877053)

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//! User Files

import * as ActionTypes from "common/actionTypes";
import { AppContext } from "AppContext";
import { ROUTES } from "common/constants";

const Logout = () => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({ type: ActionTypes.LOGOUT });
    navigate(ROUTES.LOGIN_SEEKER);
    // eslint-disable-next-line
  }, []);

  return <div />;
};

export default Logout;
