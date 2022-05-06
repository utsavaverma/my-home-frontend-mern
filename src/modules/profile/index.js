// Author: Harsh Bhatt (B00877053)

import { AccountCircle } from "@mui/icons-material";
import { Box, Divider, List, Snackbar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import api from "common/api";
import { gender, ROUTES } from "common/constants";
import PageHeading from "components/PageHeading";
import Loading from "components/Loading";
import React, { forwardRef, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import ListUserData from "./components/ListUserData";
import { AppContext } from "AppContext";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "2rem 0",
    width: "100%",
    maxWidth: 800,
    marginLeft: "auto",
    marginRight: "auto",
  },
  space: {
    padding: "0 1rem",
  },
}));

const EAlert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Profile() {
  const {
    state: { authToken },
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const { data } = res;

      if (data.success) {
        setOpen(true);
        setError("");
        setUser(data.user);
      }
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

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const showValue = (value) => {
    return value ? value : "-";
  };

  if (loading) return <Loading message="Loading your profile" />;
  return (
    <div>
      {error && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <EAlert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {error}
          </EAlert>
        </Snackbar>
      )}
      <PageHeading Icon={AccountCircle} heading="Profile" />
      <Box className={classes.container}>
        <Box display="flex" justifyContent="flex-end">
          <Link to={`/app${ROUTES.SETTINGS}`}>Update Profile</Link>
        </Box>
        <List>
          <ListUserData title="First Name" value={showValue(user.firstName)} />
          <Divider />
          <ListUserData title="Last Name" value={showValue(user.lastName)} />
          <Divider />
          <ListUserData title="Username" value={showValue(user.username)} />
          <Divider />
          <ListUserData title="Email" value={showValue(user.email)} />
          <Divider />
          <ListUserData title="Phone" value={showValue(user.phoneNumber)} />
          <Divider />
          <ListUserData title="Gender" value={showValue(gender[user.gender])} />
          <Divider />
          <ListUserData title="Address" value={showValue(user.address)} />
          <Divider />
          <ListUserData title="City" value={showValue(user.city)} />
          <Divider />
          <ListUserData title="Province" value={showValue(user.province)} />
          <Divider />
          <ListUserData
            title="Postal Code"
            value={showValue(user.postalCode)}
          />
          <Divider />
        </List>
      </Box>
    </div>
  );
}

export default Profile;
