/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// IMPORT

// React

// Material UI
import Grid from "@mui/material/Grid";

// Components

// Custom Hook

// Utils

// External

// Data

// Functional component
export const SplitScreen = ({ children }) => {
  // State
  const [leftChild, rightChild] = children;

  // Functions

  // Return
  return (
    <Grid container>
      <Grid item xs={6}>
        {leftChild}
      </Grid>
      <Grid item xs={6}>
        {rightChild}
      </Grid>
    </Grid>
  );
};
