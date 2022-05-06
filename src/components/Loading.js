// Author: Harsh Bhatt (B00877053)

import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

function Loading({ message = "", className = "loading-wrapper" }) {
  return (
    <div className={className}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ marginBottom: 2 }} />
        <Typography variant="caption" component="div">
          {message}
        </Typography>
      </Box>
    </div>
  );
}

export default Loading;
