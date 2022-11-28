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
import { savePlaylistData } from "../../Utils/Utils";

// External

// Data

// Functional component
export const BackupButtons = ({
  item,
  setSelectedPlaylist,
  handleClickOpen,
  selectedPlaylist,
}) => {
  // State

  // Functions
  // Return
  return (
    <Grid container flexWrap="nowrap">
      <Button
        variant="outlined"
        snackText={`Your playlist has been restored.`}
        func={() => {
          savePlaylistData(item);
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
