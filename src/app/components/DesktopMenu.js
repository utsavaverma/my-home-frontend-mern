// Author: Harsh Bhatt (B00877053)

import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Avatar, Divider, ListItemIcon, Typography } from "@mui/material";
import { Logout, Settings as Setting } from "@mui/icons-material";
import { ROUTES } from "common/constants";

function DesktopMenu({
  handleMenuClose,
  isMenuOpen,
  anchorEl,
  handleMenuItemClick,
  currentUser,
}) {
  const handleDetailClick = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={isMenuOpen}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
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
        <MenuItem
          onClick={(event) => handleMenuItemClick(event, ROUTES.PROFILE)}
        >
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={(event) => handleMenuItemClick(event, ROUTES.SETTINGS)}
        >
          <ListItemIcon>
            <Setting fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
          onClick={(event) => handleMenuItemClick(event, ROUTES.LOGOUT)}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default DesktopMenu;
