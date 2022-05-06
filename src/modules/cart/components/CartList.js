// Author: Namit Prakash Dadlani (B00873214)

import React, { useContext, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { AppContext } from "AppContext";
import api from "common/api";
import CartItem from "./CartItem";
import * as ActionTypes from "common/actionTypes";
import { Box, fontSize } from "@mui/system";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CartList() {
  const { state, dispatch } = useContext(AppContext);
  const [cartList, setCartList] = useState([]);
  const [cartOuterId, setCartOuterId] = useState([]);
  const [cartTotals, setCartTotals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getCartDetailsFromDB() {
      try {
        const res = await api.get(`/cart/view`, {
          headers: {
            Authorization: `Bearer ${state.authToken}`,
          },
        });
        if (null !== res.data.cartItems) {
          setCartList(res.data.cartItems.cartItems);
          let tempCartList = res.data.cartItems.cartItems;
          let total = 0;
          tempCartList.forEach((cartItem) => {
            total += cartItem.calculatedRent;
          });
          try {
            var cartTotalsData = {
              totalRent: Math.floor(total),
              convenienceFee: Math.floor(total * 0.1),
              subTotal: Math.floor(total * 1.1),
            };
            await api.post("/cart/setCartTotals", cartTotalsData, {
              headers: { Authorization: `Bearer ${state.authToken}` },
            });
            await setCartTotals(cartTotalsData);
          } catch (e) {
            console.error(e);
          }
          setCartOuterId(res.data.cartItems._id);
        }
      } catch (e) {
        console.error(e);
      }
    }
    getCartDetailsFromDB();
  }, []);

  function getCartList() {
    return cartList;
  }

  // handleDeletion: Handle the deletion of cart item on click of delete button in CartItem.
  const handleDeletion = async (id) => {
    try {
      const res = await api.delete(`/cart/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${state.authToken}`,
        },
      });
      if (res.status === 200) {
        const res = await api.get(`/cart/view`, {
          headers: {
            Authorization: `Bearer ${state.authToken}`,
          },
        });
        setCartList(res.data.cartItems.cartItems);
        dispatch({
          type: ActionTypes.SET_CART,
          data: res.data.cartItems.cartItems.length,
        });
        let tempCartList = res.data.cartItems.cartItems;
        let total = 0;
        tempCartList.forEach((cartItem) => {
          total += cartItem.calculatedRent;
        });
        try {
          var cartTotalsData = {
            totalRent: Math.floor(total),
            convenienceFee: Math.floor(total * 0.1),
            subTotal: Math.floor(total * 1.1),
          };
          await api.post("/cart/setCartTotals", cartTotalsData, {
            headers: { Authorization: `Bearer ${state.authToken}` },
          });
          await setCartTotals(cartTotalsData);
        } catch (e) {
          console.error(e);
        }
      }
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  // renderCartContent : Conditionally render cart content. If there is none, display a message.
  const renderCartContent = () => {
    if (getCartList().length === 0) {
      return (
        <h4>
          Hey! Your cart is empty, please visit our amazing collection of
          properties and add them to cart.
        </h4>
      );
    } else {
      return getCartList().map((cartItem, id) => (
        <div>
          <CartItem
            key={cartItem._id}
            value={cartItem}
            handleDeletion={() => handleDeletion(cartItem._id)}
          ></CartItem>
          <Grid item>
            <p>
              If you would like to explore other options, click delete icon and
              navigate to reserve page again.
            </p>
          </Grid>
        </div>
      ));
    }
  };

  // renderCheckoutButton : If cart is empty, disable the checkout button.
  const renderCheckoutButton = () => {
    if (getCartList().length === 0) {
      return (
        <Button
          variant="contained"
          onClick={() => callBooking(cartOuterId)}
          disabled
        >
          Checkout
        </Button>
      );
    } else {
      return (
        <Button
          id={cartOuterId}
          variant="contained"
          onClick={() => callBooking(cartOuterId)}
        >
          Checkout
        </Button>
      );
    }
  };

  // callBooking: Call the booking module on press of checkout and pass the cart id.
  function callBooking(id) {
    var sendData = {
      cartId: id,
    };
    api
      .post("booking/booking-confirmation", sendData, {
        headers: {
          Authorization: `Bearer ${state.authToken}`,
        },
      })
      .then((response) => {
        navigate("/app/booking-confirmation", {
          state: { ...response.data },
        });
      });
  }

  return (
    <div>
      <Box display="flex">
        <Grid container direction={"row"} spacing={1} columns={16} margin={5}>
          <Grid item>
            <h3>Your Cart</h3>
          </Grid>

          <Grid item>{renderCartContent()}</Grid>
        </Grid>

        <Grid container direction={"row"} spacing={1} columns={16} margin={5}>
          <Grid item>
            <h3>Total Rent: {cartTotals.totalRent}</h3>
            <h3>Convenience Fee: {cartTotals.convenienceFee}</h3>
            <h3>Total Amount: {cartTotals.subTotal}</h3>
            <br></br>
            {renderCheckoutButton()}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default CartList;
