/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// IMPORT

// React

// Material UI
import ButtonMui from "@mui/material/Button";
import Grid from "@mui/material/Grid";

// Components

// Custom Hook

// Utils

// External

// Data

// Functional component
export const Button = ({ children, func, icon, variant, align = "center" }) => {
  // State

  // Functions

  // Return
  return (
    <Grid container justifyContent={align}>
      <ButtonMui variant={variant} startIcon={icon} onClick={func}>
        {children}
      </ButtonMui>
    </Grid>
  );
};
