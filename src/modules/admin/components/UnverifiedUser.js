//Author: Arunkumar Gauda - B00871355
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { AppContext } from "AppContext";
import api from "common/api";
import React, { useContext, useEffect, useState } from "react";

function UnverifiedUser() {
  const {
    state: { authToken },
  } = useContext(AppContext);
  const [user, setUser] = useState([]);
  const [response, setResponse] = useState([]);
  const [open, setOpen] = useState(false);
  const [showdata, setShowData] = useState([]);
  const fetchUsers = async () => {
    try {
      const res = await api.get("/superadmin/unverifiedroomowners", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const users = res.data.users;
      setUser(users);
      setShowData(users);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const handleClick = (_id) => {
    api
      .put(
        `/superadmin/verifyroomowner/${_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setOpen(true);
        setResponse(res.data.message);
        setUser(user.filter((u) => u._id !== _id));
        setShowData(user.filter((u) => u._id !== _id));
      });
  };

  const handleSearchChange = (e) => {
    let newList = user.filter(
      (ele) =>
        ele.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        ele.lastName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setShowData(newList);
  };
  return (
    <Box padding="2rem" bgcolor="#e9e9e9">
      <TextField
        placeholder="Enter To Search"
        fullWidth
        variant="outlined"
        margin="normal"
        onChange={handleSearchChange}
      />
      <Typography
        textAlign="left"
        fontWeight="bold"
        fontStyle="Roboto"
        fontSize="2rem"
      >
        Verification Pending
      </Typography>
      <Grid mt="2px" container spacing={2} padding="2rem">
        {showdata?.map((ele) => (
          <Grid key={ele._id} item lg={3} md={4} sm={6} xs={12}>
            <Card
              sx={{
                borderBottom: 1,
                borderRadius: 5,
                borderColor: "primary.main",
              }}
            >
              <CardContent>
                <Box textAlign={"left"} fontStyle="Roboto">
                  <Avatar
                    variant="rounded"
                    alt={ele.firstName}
                    src={ele.picture}
                    sx={{ height: 120, width: 120, margin: "auto" }}
                  />
                  <Typography component={"div"} variant={"h6"}>
                    {ele.firstName} {ele.lastName}
                  </Typography>
                  <Typography color="text.secondary">
                    Username: {ele.username}
                  </Typography>
                  <Typography color="text.secondary">{ele.email}</Typography>
                </Box>
                <br></br>
                <Button onClick={() => handleClick(ele._id)}>Verify</Button>
                <Snackbar open={open} autoHideDuration={600}>
                  <Alert severity="success" sx={{ width: "100%" }}>
                    {response}
                  </Alert>
                </Snackbar>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default UnverifiedUser;
