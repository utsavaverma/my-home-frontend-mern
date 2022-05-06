// Author: Harsh Bhatt (B00877053)

import { ROUTES } from "common/constants";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "./AppContext";

const PrivateRoute = () => {
  const { getToken } = useContext(AppContext);
  const idToken = getToken();
  return !idToken ? <Navigate to={ROUTES.LOGIN_SEEKER} /> : <Outlet />;
};
export default PrivateRoute;
