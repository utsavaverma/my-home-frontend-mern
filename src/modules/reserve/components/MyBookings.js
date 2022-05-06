import React, { useEffect, useState } from "react";
import image1 from "../../../assets/images/image1.png";
import { Button, Grid } from "@mui/material";
import api from "common/api";
import { TOKEN } from "common/constants";
import { Alert } from "@mui/lab";

export default function MyBookings() {
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Runs ONCE after initial rendering
    async function callProperties() {
      try {
        const result = await api.get("/booking/my-bookings", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
          },
        });
        setPropertyDetails(result.data);
      } catch (e) {
        console.error(e);
      }
    }
    callProperties();
  }, []);

  function properties() {
    //console.log(propertyDetails)
    return propertyDetails;
  }

  function cancelBooking(id) {
    var params = {
      bookingId: id,
    };

    api.post("booking/booking-cancellation", params).then((response) => {
      const updatedProperties =
        response?.data &&
        propertyDetails &&
        propertyDetails.filter((property) => {
          return property._id !== id;
        });
      setPropertyDetails(updatedProperties);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    });
  }
  if (propertyDetails) {
    return (
      <>
        {properties().map((data, id) => (
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            marginTop={3}
            key={id}
          >
            <Grid container marginLeft={5} columns={16} >
              <Grid item xs={12} md={5}>
                <img className="col" src={image1} alt="Not found" width={400}/>
              </Grid>
              <Grid item xs={12} md={6} marginLeft={20} marginTop={5}>
                <p>Booking Confirmed !</p>
                <p> Booking id: {data._id}</p>
                <p>Booking Amount: {data.bookingAmount}</p>
                <Button
                  variant="contained"
                  sx={{ m: 5 }}
                  onClick={() => cancelBooking(data._id)}
                >
                  Cancel
                </Button>
                {success && (
                  <Alert severity="success">Property has been deleted</Alert>
                )}
              </Grid>
            </Grid>
          </Grid>
        ))}
      </>
    );
  }
}
