// Author: Utsava Verma (B00873273)

import React, { Component } from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./MyListings.css";
//import toast, { Toaster } from "react-hot-toast";
import { ROLE, ROOM_OWNER } from "common/constants";
import { Navigate } from "react-router-dom";
import api from "common/api";

import {
  Button,
  Grid,
} from "@mui/material";
import { AppContext } from "AppContext";
export default function MyListings() {
  const {
    state: { userId, authToken },
  } = useContext(AppContext);
  const { state } = useContext(AppContext);
  const { role, authenticated } = state;
  const [allRecords, setAllRecords] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const api_url = `/property-routes/get-rental-properties/`;
  useEffect(() => {
    api
      .get(api_url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        console.log(res.data[0]);
        setAllRecords(res.data);
      });
  }, []);

  console.log(userId);
  console.log(allRecords);

  const handleModify = async (id) => {
 
    console.log("user id ", userId);
    navigate(`/app/edit-listing/${id}`);
  };

  return role === ROOM_OWNER ? (
    <div>
      {/* {role === ROLES.ROOM_OWNER && */}
      <h2>
        <center>My Listings</center>
      </h2>
      <Grid
        container
        rowSpacing={0}
        columnSpacing={{ xs: 0, sm: 0, md: 0 }}
        marginTop={0}
      >
        <Grid container spacing={8} columns={10} margin={10}>
          {allRecords.map((r) => (
            <Grid item xs={10} md={16} margin={3}>
              <img
                key={r._id}
                className="profile_images"
                src={r.propertyPictures[0]}
                alt="Photo"
              ></img>
              <label>
                Apartment Name:<p>{r.propertyTitle}</p>
              </label>
              <br />
              <br />
              <label>
                Available Rooms:<p>{r.availableRooms}</p>
              </label>
              <br />
              <label>
                Rent:
                <p>$</p>
                <p>{r.rent}</p>
              </label>
              {/* MODIFY BUTTON */}
              <Button
                key={r._id}
                variant="contained"
                sx={{ m: 10 }}
                onClick={() => handleModify(r._id)}
              >
                Modify
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
      {/* } */}
    </div>
  ) : (
    <Navigate to="/" />
  );
}
