// Author: Harsh Bhatt (B00877053)

import { Box, Button, Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import React, { useState, forwardRef, useEffect } from "react";
import logo from "assets/images/logo.png";
import api from "common/api";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "AppContext";
import { useContext } from "react";
import { ResetPasswordSchema } from "common/validationSchema";
import { ROUTES } from "common/constants";

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

function Signup() {
  const params = useParams();
  const { token, userId } = params;
  const { pathname } = useLocation();
  const {
    state: { authenticated },
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [authenticated, pathname]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(ResetPasswordSchema),
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await api.post(
        `/password-reset/${userId}/${token}`,
        formData
      );

      const { data } = res;

      if (data.success) {
        setOpen(true);
        setSuccess(data.message);
        setError("");
        setTimeout(() => {
          navigate(ROUTES.LOGIN_SEEKER);
        }, 3000);
      }
    } catch (error) {
      setOpen(true);
      if (error.response?.data) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
      setSuccess("");
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
      {error && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <EAlert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {error}
          </EAlert>
        </Snackbar>
      )}
      {success && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <EAlert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {success}
          </EAlert>
        </Snackbar>
      )}
      <div className={classes.paper}>
        <Box pb={3} display="flex" justifyContent="center">
          <img src={logo} alt="My Home" height={80} />
        </Box>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid className={classes.formGrid} container spacing={3}>
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
            <Grid className={classes.inputGrid} item xs={12} sm={12}>
              <TextField
                {...register("passwordConfirmation")}
                type="password"
                variant="outlined"
                fullWidth
                label="Confirm Password"
                name="passwordConfirmation"
                autoComplete="off"
                error={!!errors.passwordConfirmation}
                helperText={
                  errors.passwordConfirmation
                    ? errors.passwordConfirmation.message
                    : ""
                }
              />
            </Grid>
          </Grid>
          <Box className={classes.buttonBox} textTransform="lowercase">
            <Button
              disableElevation
              type="submit"
              disabled={loading}
              fullWidth
              variant="contained"
              color="primary"
            >
              Reset Password
            </Button>
          </Box>
        </form>
      </div>
    </Box>
  );
}

export default Signup;
