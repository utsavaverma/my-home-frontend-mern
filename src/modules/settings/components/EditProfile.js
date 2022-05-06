import { Box, Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import React, { useState, forwardRef } from "react";
import api from "common/api";
import * as ActionTypes from "common/actionTypes";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { AppContext } from "AppContext";
import { useContext } from "react";
import { ProfileSchema } from "common/validationSchema";

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

function EditProfile() {
  const {
    state: { currentUser},
    dispatch,
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(ProfileSchema),
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await api.put(
        `/users/profile/${currentUser.user_id}`,
        formData
      );
      const { data } = res;
      if (data.success) {
        setOpen(true);
        setSuccess(data.message);
        setError("");
        dispatch({ type: ActionTypes.SET_CURRENT_USER, data: data.user });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
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
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Grid className={classes.formGrid} container spacing={2}>
          <Grid className={classes.inputGrid} item xs={12} sm={12} md={6}>
            <TextField
              {...register("firstName")}
              variant="outlined"
              fullWidth
              label="First Name"
              name="firstName"
              autoComplete="off"
              defaultValue={currentUser.firstName}
              error={!!errors.firstName}
              helperText={errors.firstName ? errors.firstName.message : ""}
            />
          </Grid>
          <Grid className={classes.inputGrid} item xs={12} sm={12} md={6}>
            <TextField
              {...register("lastName")}
              variant="outlined"
              fullWidth
              label="Last Name"
              name="lastName"
              autoComplete="off"
              defaultValue={currentUser.lastName}
              error={!!errors.lastName}
              helperText={errors.lastName ? errors.lastName.message : ""}
            />
          </Grid>
          <Grid className={classes.inputGrid} item xs={12} sm={12} md={6}>
            <TextField
              variant="outlined"
              disabled
              fullWidth
              label="Username"
              name="username"
              autoComplete="off"
              defaultValue={currentUser.username}
            />
          </Grid>
          <Grid className={classes.inputGrid} item xs={12} sm={12} md={6}>
            <TextField
              variant="outlined"
              disabled
              fullWidth
              label="Email"
              name="email"
              autoComplete="off"
              defaultValue={currentUser.email}
            />
          </Grid>
          <Grid className={classes.inputGrid} item xs={12} sm={12}>
            <Select
              {...register("gender")}
              sx={{ width: "100%" }}
              labelId="gender-label"
              id="demo-simple-select"
              defaultValue={currentUser.gender}
              error={!!errors.gender}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="prefer_not_to_say">Prefer not to say</MenuItem>
            </Select>
          </Grid>
          <Grid className={classes.inputGrid} item xs={12} sm={12}>
            <TextField
              {...register("address")}
              variant="outlined"
              fullWidth
              label="Address"
              name="address"
              autoComplete="off"
              defaultValue={currentUser.address}
              error={!!errors.address}
              helperText={errors.address ? errors.address.message : ""}
            />
          </Grid>
          <Grid className={classes.inputGrid} item xs={12} sm={12} md={6}>
            <TextField
              {...register("city")}
              variant="outlined"
              fullWidth
              label="City"
              name="city"
              autoComplete="off"
              defaultValue={currentUser.city}
              error={!!errors.city}
              helperText={errors.city ? errors.city.message : ""}
            />
          </Grid>
          <Grid className={classes.inputGrid} item xs={12} sm={12} md={6}>
            <TextField
              {...register("province")}
              variant="outlined"
              fullWidth
              label="Province"
              name="province"
              autoComplete="off"
              defaultValue={currentUser.province}
              error={!!errors.province}
              helperText={errors.province ? errors.province.message : ""}
            />
          </Grid>
          <Grid className={classes.inputGrid} item xs={12} sm={12} md={6}>
            <TextField
              {...register("postalCode")}
              variant="outlined"
              fullWidth
              label="Postal Code"
              name="postalCode"
              autoComplete="off"
              defaultValue={currentUser.postalCode}
              error={!!errors.postalCode}
              helperText={errors.postalCode ? errors.postalCode.message : ""}
            />
          </Grid>
          <Grid className={classes.inputGrid} item xs={12} sm={12} md={6}>
            <TextField
              {...register("phoneNumber")}
              variant="outlined"
              fullWidth
              label="Mobile"
              name="phoneNumber"
              autoComplete="off"
              defaultValue={currentUser.phoneNumber}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber ? errors.phoneNumber.message : ""}
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
            Update Profile
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default EditProfile;
