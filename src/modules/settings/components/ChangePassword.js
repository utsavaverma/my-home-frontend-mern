// Author: Harsh Bhatt (B00877053)

import { Box, Button, Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import React, { useState, forwardRef } from "react";
import api from "common/api";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { ChangePasswordSchema } from "common/validationSchema";
import { ROUTES } from "common/constants";

const EAlert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: 16,
    paddingLeft: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "100%",
  },
  formGrid: {
    display: "flex",
    flexDirection: "column",
  },
  inputGrid: {
    margin: "8px 0px 8px",
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

function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(ChangePasswordSchema),
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await api.post("/users/change-password", formData);

      const { data } = res;

      if (data.success) {
        setOpen(true);
        setSuccess(data.message);
        setError("");
        setTimeout(() => {
          navigate(ROUTES.LOGOUT);
        }, 2000);
      }
    } catch (error) {
      setOpen(true);
      if (error.response?.data) {
        if (error.response.data?.errors) {
          if (error.response.data.errors?.[0]?.oldPassword) {
            setError(error.response.data.errors[0].oldPassword);
          }
        } else {
          setError(error.response.data.message);
        }
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
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Grid className={classes.formGrid} container spacing={3}>
          <Grid className={classes.inputGrid} item xs={12} sm={12}>
            <TextField
              {...register("oldPassword")}
              type="password"
              variant="outlined"
              fullWidth
              label="Current Password"
              name="oldPassword"
              autoComplete="off"
              error={!!errors.oldPassword}
              helperText={errors.oldPassword ? errors.oldPassword.message : ""}
            />
          </Grid>
          <Grid className={classes.inputGrid} item xs={12} sm={12}>
            <TextField
              {...register("newPassword")}
              type="password"
              variant="outlined"
              fullWidth
              label="New Password"
              name="newPassword"
              autoComplete="off"
              error={!!errors.newPassword}
              helperText={errors.newPassword ? errors.newPassword.message : ""}
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
            Change Password
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default ChangePassword;
