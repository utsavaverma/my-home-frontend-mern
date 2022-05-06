// Author: Harsh Bhatt (B00877053)

import React from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Logout, Settings } from "@mui/icons-material";
import { ROUTES } from "common/constants";
import { Divider, Typography } from "@mui/material";

function MobileMenu({
  handleMobileMenuClose,
  //   handleProfileMenuOpen,
  mobileMoreAnchorEl,
  isMobileMenuOpen,
  handleMenuItemClick,
  currentUser,
}) {
  const mobileMenuId = "primary-search-account-menu-mobile";
  const handleDetailClick = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem onClick={handleDetailClick} disableTouchRipple>
          <Typography>
            <strong>
              {currentUser.firstName} {currentUser.lastName}
            </strong>
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleDetailClick} disableTouchRipple>
          <Typography>{currentUser.email}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge
            // badgeContent={17}
            // color="error"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem
          onClick={(event) => handleMenuItemClick(event, ROUTES.PROFILE)}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
        <MenuItem
          onClick={(event) => handleMenuItemClick(event, ROUTES.SETTINGS)}
        >
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge
            // badgeContent={17}
            // color="error"
            >
              <Settings />
            </Badge>
          </IconButton>
          <p>Settings</p>
        </MenuItem>
        <MenuItem
          onClick={(event) => handleMenuItemClick(event, ROUTES.LOGOUT)}
        >
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Logout />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      </Menu>
    </>
  );
}

export default MobileMenu;
