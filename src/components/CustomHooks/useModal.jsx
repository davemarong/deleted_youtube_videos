/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// IMPORT

// React
import { useState } from "react";

// Material UI

// Components

// Custom Hook

// Utils

// External

// Data

// Functional component
export const useModal = () => {
  // State
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Functions

  // Return
  return [handleClickOpen, handleClose, open];
};
