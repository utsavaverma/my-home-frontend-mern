// Author: Harsh Bhatt (B00877053)

import { AppContext } from "AppContext";
import api from "common/api";
import MuiAlert from "@mui/material/Alert";
import { ROUTES } from "common/constants";
import Loading from "components/Loading";
import React, { forwardRef, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Snackbar, Typography } from "@mui/material";

const EAlert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AccountActivation() {
  const navigate = useNavigate();
  const params = useParams();
  const { verificationToken } = params;

  const {
    state: { authenticated },
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [open, setOpen] = useState(false);

  const activateAccount = async () => {
    setLoading(true);
    try {
      const res = await api.post(
        `/users/activate-account/${verificationToken}`
      );

      const { data } = res;

      if (data.success) {
        setOpen(true);
        setSuccess(data.message);
        setError("");
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
      setTimeout(() => {
        navigate(ROUTES.LOGIN_SEEKER);
      }, 5000);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (authenticated) {
      navigate("/");
    }

    activateAccount();
    // eslint-disable-next-line
  }, [authenticated]);

  if (loading) return <Loading message="Activating your account" />;

  return (
    <div className="activation-wrapper">
      {error && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <EAlert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {error}
          </EAlert>
        </Snackbar>
      )}
      {success && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <EAlert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {success}
          </EAlert>
        </Snackbar>
      )}
      <Typography variant="caption" component="div">
        {success
          ? "You will be redirected to the login page"
          : "Error while activating your account. Please try again later!"}
      </Typography>
    </div>
  );
}

export default AccountActivation;
