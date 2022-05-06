// Author: Harsh Bhatt (B00877053)

import React, { useContext, useEffect, useState } from "react";
// import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
// import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
// import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import { Link, useNavigate } from "react-router-dom";
import { defaultRoute, ROOM_SEEKER, ROUTES } from "common/constants";
import { AppContext } from "AppContext";
import { Button } from "@mui/material";
import HideOnScroll from "./HideOnScroll";
import logo from "assets/images/logo.png";
import { ShoppingCart } from "@mui/icons-material";
import * as ActionTypes from "common/actionTypes";
import api from "common/api";

export default function Header(props) {
  const {
    state: { authenticated, currentUser, role, cartItems, authToken },
    dispatch,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  async function getCartDetailsFromDB() {
    try {
      const res = await api.get(`/cart/view`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (null !== res.data.cartItems) {
        dispatch({
          type: ActionTypes.SET_CART,
          data: res.data.cartItems.cartItems.length,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, route) => {
    if (route === ROUTES.LOGOUT) {
      navigate(route);
    } else {
      navigate(`/app${route}`);
    }
  };

  const handleButtonClick = (route) => {
    navigate(route);
  };

  useEffect(() => {
    getCartDetailsFromDB();
  }, []);

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <HideOnScroll {...props}>
        <AppBar className="app-header">
          <Toolbar>
            <Box>
              <Link to={defaultRoute[role]}>
                <img src={logo} alt="My Home" height={50} />
              </Link>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            {!authenticated && (
              <>
                <Button onClick={() => handleButtonClick(ROUTES.LOGIN_SEEKER)}>
                  Login
                </Button>
                <Button onClick={() => handleButtonClick(ROUTES.SIGNUP_SEEKER)}>
                  Join My Home
                </Button>
              </>
            )}
            {authenticated && (
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="primary"
                >
                  <Badge
                  //   badgeContent={17}
                  //   color="error"
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                {role === ROOM_SEEKER && (
                  <Link to={`/app${ROUTES.CART}`}>
                    <IconButton
                      size="large"
                      aria-label="show 17 new notifications"
                      color="primary"
                    >
                      <Badge
                        badgeContent={cartItems}
                        // color="error"
                      >
                        <ShoppingCart />
                      </Badge>
                    </IconButton>
                  </Link>
                )}
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="primary"
                >
                  <AccountCircle />
                </IconButton>
              </Box>
            )}
            {authenticated && (
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="primary"
                >
                  <Badge
                  //   badgeContent={17}
                  //   color="error"
                  >
                    <ShoppingCart />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="primary"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <MobileMenu
        handleMobileMenuClose={handleMenuClose}
        handleProfileMenuOpen={handleProfileMenuOpen}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMenuItemClick={handleMenuItemClick}
        currentUser={currentUser}
      />

      <DesktopMenu
        handleMenuClose={handleMenuClose}
        isMenuOpen={isMenuOpen}
        anchorEl={anchorEl}
        handleMenuItemClick={handleMenuItemClick}
        currentUser={currentUser}
      />
    </Box>
  );
}
