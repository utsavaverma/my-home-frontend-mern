// Author: Harsh Bhatt (B00877053)

import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ActionTypes from "common/actionTypes";
import jwtDecode from "jwt-decode";

import React, { useState, forwardRef, useEffect } from "react";
import logo from "assets/images/logo.png";
import api from "common/api";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "AppContext";
import { useContext } from "react";
import { LoginSchema } from "common/validationSchema";
import { defaultRoute, ROLES_TO_DISPLAY, ROUTES } from "common/constants";

const EAlert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 105,
    paddingBottom: 105,
    paddingRight: 16,
    paddingLeft: 16,
    maxWidth: 550,
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    width: "100%",
    backgroundColor: "#fff",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    padding: theme.spacing(4),
    boxShadow: "rgb(100 116 139 / 12%) 0px 10px 15px",
    borderRadius: 8,
  },
  form: {
    width: "100%",
  },
  formGrid: {
    display: "flex",
    flexDirection: "column",
  },
  inputGrid: {
    margin: "16px 0px 8px",
  },
  submit: {
    padding: "20px",
  },
  buttonBox: {
    margin: "24px 0px 8px",
    "& button": {
      padding: "11px 22px",
      fontWeight: 600,
    },
  },
}));

const roles = [
  {
    name: ROLES_TO_DISPLAY.ROOM_SEEKER,
    route: ROUTES.LOGIN_SEEKER,
  },
  {
    name: ROLES_TO_DISPLAY.ROOM_OWNER,
    route: ROUTES.LOGIN_OWNER,
  },
  {
    name: ROLES_TO_DISPLAY.SUPER_ADMIN,
    route: ROUTES.LOGIN_ADMIN,
  },
];

const currentRole = {
  "/login": "login-room-seeker",
  "/login-owner": "login-room-owner",
  "/login-admin": "login-super-admin",
};

function Login() {
  const { pathname } = useLocation();
  const {
    state: { authenticated, role },
    dispatch,
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [loginRoles, setLoginRoles] = useState(roles);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();

  const filterRole = (path) => roles.filter((role) => role.route !== path);

  useEffect(() => {
    if (authenticated) {
      navigate(defaultRoute[role]);
    }
    setLoginRoles(filterRole(pathname));
    // eslint-disable-next-line
  }, [authenticated, pathname]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await api.post(`/users/${currentRole[pathname]}`, formData);
      const { data } = res;
      const decoded = jwtDecode(data.token);

      dispatch({ type: ActionTypes.SET_TOKEN, data: data.token });
      dispatch({ type: ActionTypes.SET_CURRENT_USER, data: decoded });
      dispatch({ type: ActionTypes.SET_USER_ID, data: decoded.user_id });
      dispatch({ type: ActionTypes.SET_AUTHENTICATED, data: true });
      dispatch({ type: ActionTypes.SET_ROLE, data: decoded.role });
      navigate(defaultRoute[decoded.role]);
    } catch (error) {
      setOpen(true);
      if (error.response?.data) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Box className={classes.root} container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <EAlert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </EAlert>
      </Snackbar>
      <div className={classes.paper}>
        <Box pb={3} display="flex" justifyContent="center">
          <Link to={ROUTES.HOME}>
            <img src={logo} alt="My Home" height={80} />
          </Link>
        </Box>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid className={classes.formGrid} container spacing={3}>
            <Grid className={classes.inputGrid} item xs={12} sm={12}>
              <TextField
                {...register("usernameOrEmail")}
                variant="outlined"
                fullWidth
                label="Username or Email"
                name="usernameOrEmail"
                autoComplete="off"
                error={!!errors.usernameOrEmail}
                helperText={
                  errors.usernameOrEmail ? errors.usernameOrEmail.message : ""
                }
              />
            </Grid>
            <Grid className={classes.inputGrid} item xs={12} sm={12}>
              <TextField
                {...register("password")}
                type="password"
                variant="outlined"
                fullWidth
                label="Password"
                name="password"
                autoComplete="off"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end" pt={2}>
            <Typography variant="caption" component="div">
              <Link to={ROUTES.FORGOT_PASSWORD}>Forgot Password?</Link>
            </Typography>
          </Box>
          <Box className={classes.buttonBox} textTransform="lowercase">
            <Button
              disableElevation
              type="submit"
              disabled={loading}
              fullWidth
              variant="contained"
              color="primary"
            >
              Log In
            </Button>
          </Box>
        </form>
        {loginRoles.map((role) => (
          <Box py={2} key={role.route}>
            <Divider>
              <Typography variant="caption" component="div">
                Or
              </Typography>
            </Divider>
            <Box pt={2} display="flex" justifyContent="center">
              <Link to={role.route}>
                <Typography variant="subtitle2" component="div">
                  Login as {role.name}
                </Typography>
              </Link>
            </Box>
          </Box>
        ))}
        <Box py={2}>
          <Divider>
            <Typography variant="caption" component="div">
              Or
            </Typography>
          </Divider>
          <Box pt={2} display="flex" justifyContent="center">
            <Link to={ROUTES.SIGNUP_SEEKER}>
              <Typography variant="subtitle2" component="div">
                Don't have an account? Signup
              </Typography>
            </Link>
          </Box>
        </Box>
      </div>
    </Box>
  );
}

export default Login;
