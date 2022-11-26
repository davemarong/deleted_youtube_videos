/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// IMPORT

// React

// Material UI
import TooltipMui from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

// Icon
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import { Button } from "@mui/material";

// Components

// Custom Hook

// Utils

// External

// Data

// Functional component
export const ToolTip = ({ children, icon = <HelpOutlineRoundedIcon /> }) => {
  // State

  // Functions

  // Return
  return (
    <TooltipMui title={children} placement="right">
      {/* <IconButton>{icon}</IconButton> */}
      <Button>{icon}</Button>
    </TooltipMui>
  );
};
