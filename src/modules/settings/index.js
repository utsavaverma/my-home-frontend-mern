// Author: Harsh Bhatt (B00877053)

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Settings as Setting } from "@mui/icons-material";
import React, { useState } from "react";
import PageHeading from "components/PageHeading";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import ChangePassword from "./components/ChangePassword";
import EditProfile from "./components/EditProfile";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "2rem 0",
    width: "100%",
    maxWidth: 800,
    marginLeft: "auto",
    marginRight: "auto",
  },
  space: {
    padding: "0 1rem",
  },
}));

function Settings() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <PageHeading Icon={Setting} heading="Settings" />
      <Box className={classes.container}>
        <div className={classes.space}>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ flexShrink: 0, fontWeight: "bold" }}>
                Change Password
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ChangePassword />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ flexShrink: 0, fontWeight: "bold" }}>
                Edit Profile
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <EditProfile />
            </AccordionDetails>
          </Accordion>
        </div>
      </Box>
    </div>
  );
}

export default Settings;
