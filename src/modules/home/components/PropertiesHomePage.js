// Author: Harsh Bhatt (B00877053)

import * as React from "react";
import { Box, Typography, Container } from "@mui/material";

export default function PropertiesHomePage() {
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        {/* Featured Rental Properties */}
        Please note:
      </Typography>
      <Typography variant="h4" marked="center" align="center" component="h2">
        This page is not covered in ASSIGNMENT 3
      </Typography>
      <Box sx={{ mt: 8, display: "flex", flexWrap: "wrap" }}></Box>
    </Container>
  );
}
