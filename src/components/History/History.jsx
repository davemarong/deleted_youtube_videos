/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// IMPORT

// React
import React, { useState } from "react";

// Material UI
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { ToolTip } from "../ToolTip/ToolTip";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

// Components
// import { Button } from "../Button/Button";
// Custom Hook

// Utils

// External

// Data

// Functional component
export const History = ({ history }) => {
  // State
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Functions

  // Return
  return (
    <>
      <Button
        onClick={handleClick}
        variant="outlined"
        endIcon={<ArrowDropDownRoundedIcon />}
      >
        Update history
      </Button>
      <ToolTip>
        Here, you can see all the dates of your previous playlist updates,
        either automatic or manual.{" "}
      </ToolTip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {history?.map((date, index) => {
          return (
            <Typography style={{ padding: "10px 50px 10px 10px" }} key={index}>
              {date}
            </Typography>
          );
        })}
      </Menu>
    </>
  );
};
