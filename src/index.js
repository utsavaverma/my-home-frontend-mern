// Author: Harsh Bhatt (B00877053)

import { ThemeProvider } from "@mui/material";
import { AppContextProvider } from "AppContext";
import theme from "common/theme";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Routing from "./routes";

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </ThemeProvider>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
