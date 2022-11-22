/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// IMPORT

// React

// Material UI
import Typography from "@mui/material/Typography";

// Components

// Custom Hook

// Utils

// External

// Data

// Functional component
export const LastUpdate = ({ data }) => {
  // State

  // Functions

  // Return
  if (data?.lastUpdate?.length > 0) {
    return <Typography>Last update: {data.lastUpdate}</Typography>;
  }
  return null;
};
