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
import { useSnackbar } from "notistack";

// Data

// Functional component
export const Button = ({
  children,
  func,
  icon,
  variant = "outlined",
  align = "center",
  snackText = "",
}) => {
  // State

  // Snackbar library
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // Functions
  const runSnack = (snackText) => {
    enqueueSnackbar(snackText, {
      autoHideDuration: 6000,
      variant: "success",
    });
  };
  // Return
  return (
    <Grid container justifyContent={align}>
      <ButtonMui
        variant={variant}
        startIcon={icon}
        onClick={() => {
          func();
          if (snackText.length > 1) {
            runSnack(snackText);
          }
        }}
      >
        {children}
      </ButtonMui>
    </Grid>
  );
};
