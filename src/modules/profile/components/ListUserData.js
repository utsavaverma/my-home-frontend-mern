import React from "react";
import { ListItem, ListItemText, Typography } from "@mui/material";

function ListUserData({ title, value }) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={<strong>{title}</strong>}
        secondary={
          <>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {value}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
}

export default ListUserData;
