// Author: Utsava Verma (B00873273)

import {
  Box,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import React, { useState, forwardRef, useEffect } from "react";
import logo from "assets/images/logo.png";
import api from "common/api";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "AppContext";
import { useContext } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import UploadIcon from "@mui/icons-material/Upload";
import { useParams } from "react-router-dom";

const EAlert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DEF_PROPERTY_DETAILS = {
  propertyTitle: "",
  createdBy: "",
  address: "",
  unitNo: 0,
  city: "",
  province: "",
  postalCode: "",
  amenities: "",
  type: "",
  propertyPictures: "",
  availableRooms: 0,
  totalRooms: 0,
  availabilityStartDate: new Date(),
  rent: 0,
  imageUrl: "",
};

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
    display: 'flex',
    "& button": {
      padding: "11px 22px",
      fontWeight: 600,
    },
    "& .button-delete": {
    marginLeft: 'auto',
    },
  },
}));

function EditListing() {
  const { pathname } = useLocation();
  const {
    state: { authenticated, authToken },
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();
  const [propertyDetails, setPropertyDetails] = useState(DEF_PROPERTY_DETAILS);
  const [inputPropertyDetails, setInputPropertyDetails] =
    useState(DEF_PROPERTY_DETAILS);
  const [array, setArray] = useState([]);

  const postalCodeRegex = RegExp(
    /^[a-zA-Z][0-9][a-zA-Z][ ][0-9][a-zA-Z][0-9]{1}/
  );

  const { _id } = useParams();

  // GET Request to backend for fetching the property details
  const api_url = `/property-routes/get-rental-property/${_id}`;
  useEffect(() => {
    api
      .get(api_url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        console.log(_id);
        console.log(res.data);
        setInputPropertyDetails(res.data);
      });
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);

  const [errorStrings, setErrorStrings] = useState({
    addrStreet: "",
    addrPostalCode: "",
    moveInDate: "",
  });

  const validateNewListing = (errorStrings) => {
    let valid = true;

    Object.values(errorStrings).forEach((val) => {
      console.log(val, val.length);
      if (val.length > 0) {
        valid = false;
      }
    });

    return valid;
  };

  const inputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case "propertyTitle":
        setInputPropertyDetails({
          ...inputPropertyDetails,
          [name]: e.target.value,
        });
        break;

      case "address":
        setInputPropertyDetails({
          ...inputPropertyDetails,
          [name]: e.target.value,
        });
        break;

      case "unitNo":
        setInputPropertyDetails({
          ...inputPropertyDetails,
          [name]: e.target.value,
        });
        break;

      case "city":
        setInputPropertyDetails({
          ...inputPropertyDetails,
          [name]: e.target.value,
        });
        break;

      case "province":
        setInputPropertyDetails({
          ...inputPropertyDetails,
          [name]: e.target.value,
        });
        break;

      case "postalCode":
        setInputPropertyDetails({
          ...inputPropertyDetails,
          [name]: e.target.value,
        });
        errorStrings.addrPostalCode = postalCodeRegex.test(value)
          ? ""
          : "Please enter postal code in valid format. (E.g. B3K 2R3)";
        break;

      case "availableRooms":
        setInputPropertyDetails({
          ...inputPropertyDetails,
          [name]: e.target.value,
        });
        break;

      case "type":
        setInputPropertyDetails({
          ...inputPropertyDetails,
          [name]: e.target.value,
        });
        break;

      case "totalRooms":
        setInputPropertyDetails({
          ...inputPropertyDetails,
          [name]: e.target.value,
        });
        break;

      case "availabilityStartDate":
        setInputPropertyDetails({
          ...inputPropertyDetails,
          [name]: e.target.value,
        });
        let currentDate = new Date();
        let u =
          currentDate.getFullYear() +
          "-" +
          (currentDate.getMonth() + 1) +
          "-" +
          currentDate.getDate();
        console.log(u);
        console.log(e.target.value);
        errorStrings.moveInDate =
          e.target.value < currentDate ? "Please enter a future date." : "";

        break;

      case "rent":
        setInputPropertyDetails({
          ...inputPropertyDetails,
          [name]: value,
        });
        break;

      default:
        break;
    }
  };

  //Handle Submit
  const handlePropertySubmit = (e) => {
    e.preventDefault();
    console.log(inputPropertyDetails);
    if (validateNewListing(errorStrings)) {
      
      setPropertyDetails({ ...inputPropertyDetails });
     
      api
        .put(
          `/property-routes/update-rental-property/${inputPropertyDetails._id}`,
          inputPropertyDetails,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            }
          }
        )
        .then((res) => {
          alert("Property updated successfully.");
          //setArray(res.data.data.amenities);
          // .then(splitAmenities())
        });
    } else {
      alert("Invalid entries.");
    }
    navigate(`/app/room-owner-listings/`);
  };

  const handleDelete = async (e) => {
    try {
      e.preventDefault();
      api
        .delete(
          `/property-routes/delete-rental-property/${inputPropertyDetails._id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((res) => {
          alert("Property deleted successfully.");
        });
    } catch (e) {
      console.log("Bad Request sent. Please try again." + e.message);
    }
    navigate(`/app/room-owner-listings`);
  };

  const am = [];

  // split function : get array
  const splitAmenities = () => {
    am = array.split(",");
    alert(am[0]);
  };
  const isAmenityChecked = (amenity) => {
    const amenitiesArray = inputPropertyDetails.amenities?.split(",");
    return amenitiesArray.includes(amenity);
  };

  const amenity = inputPropertyDetails.amenities
    .split(",")
    .filter((inputAmenity) => {
      return inputAmenity !== "";
    });

  const handleAmenityChange = (e) => {
    const inputAmenity = e.target.value;
    for (var j = 0; j < am.length; j++) {
      if (inputAmenity === am[i]) return true;
    }

    console.log("amenity", amenity);
    const i = amenity.indexOf(inputAmenity);
    if (i === -1) {
      amenity.push(inputAmenity);
    } else {
      amenity.splice(i, 1);
    }

    let newAmenity = "";
    amenity.forEach((inputAmenity) => {
      newAmenity += inputAmenity + ",";
    });

    console.log(newAmenity);
    setInputPropertyDetails({ ...inputPropertyDetails, amenities: newAmenity });
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
          <EAlert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
            {success}
          </EAlert>
        </Snackbar>
      )}
      <div className={classes.paper}>
        <Box pb={3} display="flex" justifyContent="center">
          <img src={logo} alt="My Home" height={80} />
        </Box>

        <label className="form-heading">Update the rental property</label>

        <form
          className={classes.form}
          onSubmit={handlePropertySubmit}
          encType="multipart/form-data"
        >
          <Grid className={classes.formGrid} container spacing={3}>
            <Grid className={classes.inputGrid} item xs={12} sm={12}>
              <TextField
                // {...inputPropertyDetails("propertyTitle")}
                value={inputPropertyDetails.propertyTitle}
                variant="outlined"
                fullWidth
                label="Apartment Name"
                name="propertyTitle"
                autoComplete="off"
                required
                onChange={inputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid className={classes.inputGrid} item xs={12} sm={12}>
              <TextField
                value={inputPropertyDetails.address.address}
                variant="outlined"
                fullWidth
                label="Address"
                name="address"
                disabled
                required
                onChange={inputChange}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid className={classes.inputGrid} item xs={12} sm={12}>
              <TextField
                value={inputPropertyDetails.address.unitNo}
                variant="outlined"
                fullWidth
                label="Unit No."
                name="unitNo"
                disabled
                min="0"
                type="number"
                onChange={inputChange}
                autoComplete="off"
                InputProps={{ inputProps: { min: 1 } }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid className={classes.inputGrid} item xs={12} sm={12}>
              <TextField
                value={inputPropertyDetails.address.city}
                variant="outlined"
                label="City"
                fullWidth
                disabled
                name="city"
                onChange={inputChange}
                autoComplete="off"
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid className={classes.inputGrid} item xs={12} sm={12}>
              <TextField
                value={inputPropertyDetails.address.province}
                variant="outlined"
                fullWidth
                label="Province"
                name="province"
                disabled
                required
                onChange={inputChange}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid className={classes.inputGrid} item xs={12} sm={12}>
              <TextField
                value={inputPropertyDetails.address.postalCode}
                variant="outlined"
                fullWidth
                label="Postal Code"
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
                name="postalCode"
                onChange={inputChange}
                autoComplete="off"
                required
              />
              {errorStrings &&
                errorStrings.addrPostalCode &&
                errorStrings.addrPostalCode.length > 0 && (
                  <span className="errorMsg">
                    {errorStrings.addrPostalCode}
                  </span>
                )}
            </Grid>
            <Grid className={classes.inputGrid} item xs={12} sm={12}>
              <TextField
                value={inputPropertyDetails.availableRooms}
                variant="outlined"
                type="number"
                fullWidth
                onChange={inputChange}
                label="Available Rooms"
                name="availableRooms"
                InputProps={{ inputProps: { min: 1 } }}
                InputLabelProps={{
                  shrink: true,
                }}
                autoComplete="off"
                required
              />
            </Grid>
            <Grid className={classes.inputGrid} item xs={12} sm={12}>
              <TextField
                value={inputPropertyDetails.totalRooms}
                variant="outlined"
                type="number"
                fullWidth
                onChange={inputChange}
                label="Total Rooms"
                name="totalRooms"
                InputProps={{ inputProps: { min: 1 } }}
                InputLabelProps={{
                  shrink: true,
                }}
                autoComplete="off"
                required
              />
            </Grid>
            <Grid className={classes.inputGrid} item xs={12} sm={12}>
              <InputLabel id="demo-simple-select-helper-label">
                Type of Property
              </InputLabel>
              <Select
                id="demo-simple-select"
                fullWidth
                required
                disabled
                value={inputPropertyDetails.type}
                onChange={inputChange}
                name="type"
              >
                <MenuItem value={"property_as_house"} name="House">
                  House
                </MenuItem>
                <MenuItem value={"property_as_room"} name="Room">
                  Room
                </MenuItem>
              </Select>
            </Grid>
            <Grid className={classes.inputGrid} item xs={12} sm={12}>
              <TextField
                value={inputPropertyDetails.rent}
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                onChange={inputChange}
                label="Rent"
                name="rent"
                autoComplete="off"
                required
              />
            </Grid>
            <Grid className={classes.inputGrid} item xs={12} sm={12}>
              <TextField
                value={inputPropertyDetails.availabilityStartDate
                  .toString()
                  .slice(0, 10)}
                variant="outlined"
                fullWidth
                type="date"
                onChange={inputChange}
                label="Availability Date"
                name="availabilityStartDate"
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {errorStrings &&
                errorStrings.moveInDate &&
                errorStrings.moveInDate.length > 0 && (
                  <span className="errorMsg">{errorStrings.moveInDate}</span>
                )}
            </Grid>
            
          </Grid>

          <Box>
            <FormControl style={{ width: "100%" }}>
              <FormLabel className = "amenities-heading">Amenities</FormLabel>
              <FormGroup
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="Air Conditioning"
                        checked={isAmenityChecked("Air Conditioning")}
                        onChange={handleAmenityChange}
                      />
                    }
                    label="Air Conditioning"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="Dishwasher"
                        checked={isAmenityChecked("Dishwasher")}
                        onChange={handleAmenityChange}
                      />
                    }
                    label="Dishwasher"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="Climate Control"
                        checked={isAmenityChecked("Climate Control")}
                        onChange={handleAmenityChange}
                      />
                    }
                    label="Climate Control"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="In-Unit Laundry"
                        checked={isAmenityChecked("In-Unit Laundry")}
                        onChange={handleAmenityChange}
                      />
                    }
                    label="In-Unit Laundry"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="Fitness Center"
                        checked={isAmenityChecked("Fitness Center")}
                        onChange={handleAmenityChange}
                      />
                    }
                    label="Fitness Center"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="Covered Parking"
                        checked={isAmenityChecked("Covered Parking")}
                        onChange={handleAmenityChange}
                      />
                    }
                    label="Covered Parking"
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="Garage Parking"
                        checked={isAmenityChecked("Garage Parking")}
                        onChange={handleAmenityChange}
                      />
                    }
                    label="Garage Parking"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="Balcony"
                        checked={isAmenityChecked("Balcony")}
                        onChange={handleAmenityChange}
                      />
                    }
                    label="Balcony"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="Elevator"
                        checked={isAmenityChecked("Elevator")}
                        onChange={handleAmenityChange}
                      />
                    }
                    label="Elevator"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="Dogs Allowed"
                        checked={isAmenityChecked("Dogs Allowed")}
                        onChange={handleAmenityChange}
                      />
                    }
                    label="Dogs Allowed"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="Cats Allowed"
                        checked={isAmenityChecked("Cats Allowed")}
                        onChange={handleAmenityChange}
                      />
                    }
                    label="Cats Allowed"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="Wheelchair Accessible"
                        checked={isAmenityChecked("Wheelchair Accessible")}
                        onChange={handleAmenityChange}
                      />
                    }
                    label="Wheelchair Accessible"
                  />
                </div>
              </FormGroup>
            </FormControl>
          </Box>

          {/* FILE UPLOAD DIV */}
          <input
            type="file"
            name="propertyImage"
            multiple
           
            
          />
          <Box className={classes.buttonBox} textTransform="lowercase">
            <Button
              disableElevation
              type="submit"
              disabled={loading}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
            <Button
            className="button-delete"
              disableElevation
              type="submit"
              disabled={loading}
              onClick={handleDelete}
              variant="contained"
              color="error"
            >
              Delete Listing
            </Button>
          </Box>
        </form>
      </div>
    </Box>
  );
}

export default EditListing;
