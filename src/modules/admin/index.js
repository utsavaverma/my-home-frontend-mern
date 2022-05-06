//Author: Arunkumar Gauda - B00871355
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { AppContext } from "AppContext";
import { SUPER_ADMIN } from "common/constants";
import React, { useContext } from "react";
import roomownerlogo from "assets/images/roomowner.png";
import roomseekerlogo from "assets/images/roomseekers.jpg";
import unverifieduserslogo from "assets/images/unverifiedusers.jpg";
import rejecteduserlogo from "assets/images/rejecteduser.png";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const { state } = useContext(AppContext);
  const { role } = state;
  const navigate = useNavigate();
  return role === SUPER_ADMIN ? (
    <Grid mt="2px" container spacing={2} padding="2rem">
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <Card
          sx={{ minWidth: 275, minheight: "10%" }}
          variant="outlined"
          padding={2}
        >
          <CardActionArea onClick={() => navigate("/app/admin-room-owners")}>
            <CardMedia component="img" height="200" image={roomownerlogo} />
            <CardContent>
              <Typography
                sx={{ fontSize: 30 }}
                color="text.primary"
                gutterBottom
                variant="h1"
              >
                Room Owners
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <Card sx={{ minWidth: 275, minheight: "10%" }} variant="outlined">
          <CardActionArea onClick={() => navigate("/app/admin-room-seekers")}>
            <CardMedia
              component="img"
              height="200"
              image={roomseekerlogo}
              alt="Paella dish"
            />
            <CardContent>
              <Typography
                sx={{ fontSize: 30 }}
                color="text.primary"
                gutterBottom
                variant="h1"
              >
                Room Seekers
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <Card
          sx={{ minWidth: 275, minheight: "10%", backgroundColor: "#fff" }}
          variant="outlined"
        >
          <CardActionArea
            onClick={() => navigate("/app/admin-unverified-room-owners")}
          >
            <CardMedia
              component="img"
              height="200"
              image={unverifieduserslogo}
              alt="Paella dish"
            />
            <CardContent>
              <Typography
                sx={{ fontSize: 30 }}
                color="text.primary"
                gutterBottom
                variant="h1"
              >
                Unverified Room Owners
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <Card
          sx={{ minWidth: 275, minheight: "10%", backgroundColor: "#fff" }}
          variant="outlined"
        >
          <CardActionArea onClick={() => navigate("/app/admin-rejectedusers")}>
            <CardMedia
              component="img"
              height="200"
              image={rejecteduserlogo}
              alt="Paella dish"
            />
            <CardContent>
              <Typography
                sx={{ fontSize: 30 }}
                color="text.primary"
                gutterBottom
                variant="h1"
              >
                Rejected Users
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  ) : (
    <p>Something went wrong!!!</p>
  );
}

export default AdminDashboard;
