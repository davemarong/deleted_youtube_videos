/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// IMPORT

// React

// Material UI
import Grid from "@mui/material/Grid";

// Components
import { Button } from "../Button/Button";

// Custom Hook

// Utils

// External

// Data

// Functional component
export const ButtonGroup = ({ item, setSelectedPlaylist, handleClickOpen }) => {
  // State

  // Functions
  // Return
  return (
    <Grid container flexWrap="nowrap">
      <Button
        variant="outlined"
        func={() => {
          savePlaylistData(item, item);
          enqueueSnackbar(
            `Your playlist from ${selectedPlaylist.lastUpdate} has been restored.`,
            {
              autoHideDuration: 6000,
              variant: "success",
            }
          );
        }}
      >
        Restore
      </Button>
      <Button
        variant="contained"
        func={() => {
          setSelectedPlaylist(item);
          handleClickOpen();
        }}
      >
        See playlist
      </Button>
    </Grid>
  );
};
