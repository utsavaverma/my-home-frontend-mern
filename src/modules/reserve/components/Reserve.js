//Sai Vaishnavi Jupudi (B00873534)
import React, { useContext, useState } from "react";
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Grid,
} from "@mui/material";
import image1 from "../../../assets/images/image1.png";
import "./Reserve.css";
import { Alert } from "@mui/lab";
import api from "common/api";
import { AppContext } from "AppContext";
import { useNavigate } from "react-router-dom";
import * as ActionTypes from "common/actionTypes";

export default function Reserve() {
  const navigate = useNavigate();
  const {
    state: { authToken, cartItems },
    dispatch,
  } = useContext(AppContext);
  const [roomType, setRoomType] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [propertyDetails, setPropertyDetails] = useState([]);
  const [propertyId, setPropertyId] = useState("");

  function callProperties(event) {
    event.preventDefault();
    if (validateDate(event)) {
      api.get("/getProperty/get-property-details").then((response) => {
        const filteredData = response["data"].filter(
          (property) =>
            new Date(property.availabilityStartDate).getTime() <=
            new Date(startDate).getTime()
        );
        if (filteredData.length) {
          setPropertyDetails(filteredData || []);
          setError("");
        } else {
          setPropertyDetails([]);
          setError("There are no rooms available for selected dates");
        }
      });
    } else {
      setError("The end date cannot be before start date");
    }
  }

  function addToCart(id, rent) {
    var postData = {
      property: id,
      fromDate: startDate,
      toDate: endDate,
      noOfOccupants: 1,
      calculatedRent: rent,
    };

    api
      .post("/cart/add", postData, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: ActionTypes.SET_CART,
            data: cartItems + 1,
          });
          setPropertyId(id);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 2000);
        }
      });
  }

  // function callBooking(){
  //
  //     var sendData ={
  //         cartId:"6243a364d824d41458d7702e"
  //     }
  //     api.post('booking/booking-confirmation', sendData).then(response => {
  //         navigate('/app/booking-confirmation', {
  //             state: {...response.data}
  //         });
  //
  //     });
  // }

  function validateDate(event) {
    event.preventDefault();
    if (endDate < startDate) {
      return false;
    }
    return true;
  }

  function properties() {
    return propertyDetails;
  }
  function displayProperties() {
    if (propertyDetails) {
      return (
        <>
          <div className="prop-parent">
            {properties().map((data, id) => (
              <div className="each-prop">
                <div className="prop-pic">
                  {/*{/<Carousel>/}*/}
                  {/*/!*    /!{data.propertyPictures.map((picture) => <img key={picture} className="col" src={image1} alt="image" />)}!/*!/*/}
                  {/*/!*    *!/*/}
                  {/*{/</Carousel>/}*/}
                  <img className="col" src={image1} alt="Not found" />
                </div>

                <div className="prop-desc">
                  <p>{data.propertyTitle}</p>
                  <p>Rent: {data.rent} per month</p>
                  {/* <p>
                        {" "}
                        Amenities Include:
                        {data.amenities.map((amenity) => (
                            <Button key={amenity} variant="text">
                              {amenity}
                            </Button>
                        ))}
                      </p> */}
                  <p>
                    Amenities Included:
                    <Button variant="text">{data.amenities}</Button>
                  </p>

                  <Button
                    variant="contained"
                    onClick={() => addToCart(data._id, data.rent)}
                  >
                    Add To Cart
                  </Button>

                  {propertyId === data._id && success && (
                    <Alert severity="success">
                      Property has been added to cart
                    </Alert>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      );
    }
  }
  return (
    <div>
      <div className="form-parent">
        <div className="form-feild">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Room Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Room Type"
              value={roomType}
              onChange={(e) => {
                setRoomType(e.target.value);
              }}
            >
              <MenuItem value="room">Room</MenuItem>
              <MenuItem value="house">Entire House</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="form-feild">
          <TextField
            variant="outlined"
            color="secondary"
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
        </div>
        <div className="form-feild">
          <TextField
            variant="outlined"
            color="secondary"
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        </div>
        <div className="search">
          <Button variant="contained" onClick={callProperties}>
            Search
          </Button>
        </div>
        {/*<Grid item xs={12} md={3}>*/}
        {/*    <Button variant="contained" onClick={callBooking} >Test</Button>*/}
        {/*</Grid>*/}
      </div>

      {error ? (
        <div style={{ marginLeft: "5px" }}>
          <Alert severity="error">{error} </Alert>{" "}
        </div>
      ) : (
        displayProperties()
      )}
    </div>
  );
}
