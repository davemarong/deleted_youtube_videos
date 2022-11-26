/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// IMPORT

// React
import { useState } from "react";

// Material UI
import Button from "@mui/material/Button";
import MenuMui from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";

// Icon
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";

// Custom Hook
import { ToolTip } from "../ToolTip/ToolTip";
// Utils

// External

// Data

// Functional component
export const Menu = ({ menuItems }) => {
  // State
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Functions
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Return
  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <HelpOutlineRoundedIcon />
      </IconButton>

      <MenuMui
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuItems.map((item, index) => {
          return <MenuItem key={index}>{item.content}</MenuItem>;
        })}
      </MenuMui>
    </div>
  );
};
