import React, { useState } from "react";
import image1 from "../../../assets/images/image1.png";
import { Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import moment from "moment";

export default function BookingConfirmation() {
  const location = useLocation();
  const [booking] = useState(location.state);

  if (!booking) {
    return null;
  }

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      marginTop={2}
      direction="column"
    >
      <Grid
        container
        spacing={2}
        columns={16}
        margin={10}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Grid item xs={12} md={12}>
          <h2>Booking Confirmed !!</h2>
          <img className="col" src={image1} alt="Not found" />
          <p>Order Id: {booking._id}</p>
          <h4>Stay Intended</h4>
        </Grid>
        <Grid rowSpacing={1} item xs={12} md={12}>
          {booking?.propertyItems.map((property) => {
            return (
              <Card sx={{ maxWidth: 550, mb: 5 }} key={property._id}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {property.propertyTitle}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Rent: {property.calculatedRent}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    From :{" "}
                    {moment(new Date(property.fromDate)).format("DD/MM/YYYY")}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    To :{moment(new Date(property.toDate)).format("DD/MM/YYYY")}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}
