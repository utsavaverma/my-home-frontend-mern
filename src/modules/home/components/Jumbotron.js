// Author: Harsh Bhatt (B00877053)

import * as React from "react";
import { Button, Typography } from "@mui/material";
import Hero from "assets/images/hero.png";
import { ROUTES } from "../../../common/constants";
import { useNavigate } from "react-router";
import ImageSectionLayout from "../components/ImageSectionLayout";

export default function ProductHero() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/app${ROUTES.RESERVE}`);
  };
  return (
    <ImageSectionLayout
      sxBackground={{
        backgroundImage: `url(${Hero})`,
        backgroundColor: "#7fc7d9", // Average color of the background image.
        backgroundPosition: "center",
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: "none" }} src={Hero} alt="increase priority" />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        FIND YOURSELF A BETTER HOUSE
      </Typography>
      <Button
        color="primary"
        variant="contained"
        size="large"
        component="a"
        onClick={handleClick}
        sx={{ minWidth: 200, mt: 15 }}
      >
        View All Properties
      </Button>
    </ImageSectionLayout>
  );
}
