// Author: Harsh Bhatt (B00877053)

// import { ROUTES } from "common/constants";
// import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import ProductHero from "./components/Jumbotron";
import PropertiesHomePage from "./components/PropertiesHomePage";

function Homepage() {
  useEffect(() => {
    // navigate(ROUTES.LOGIN_SEEKER);
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <ProductHero />
      <PropertiesHomePage />
    </div>
  );
}

export default Homepage;
