/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// IMPORT

// React
import { useState } from "react";

// Material UI
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { Playlist } from "../Playlist/Playlist";

// Components

// Custom Hook

// Utils
import { savePlaylistData } from "../../Utils/Utils";

// External
import { useSnackbar } from "notistack";
import { ButtonGroup } from "../ButtonGroup/ButtonGroup";
import { BackupButtons } from "./BackupButtons";
import { useModal } from "../CustomHooks/useModal";

// Data

// Functional component
export const PlaylistBackup = ({ playlistBackups, children, errorMessage }) => {
  // State
  const [handleClickOpen, handleClose, open] = useModal();

  const [selectedPlaylist, setSelectedPlaylist] = useState([]);

  // Snackbar library
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // Functions
  console.log(playlistBackups);
  // Return
  return (
    <Paper elevation={3} style={{ margin: 5 }}>
      <Typography variant="h6" align="center">
        {children}
      </Typography>
      <Typography align="center" variant="body2">
        {playlistBackups?.length} playlist found
      </Typography>
      <List style={{ overflowY: "scroll", height: 300 }}>
        {playlistBackups?.length > 0 ? (
          playlistBackups.map((item) => {
            return (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    {item.lastUpdate} --- {item.playlist.length} videos ---
                    {item.deletedVideos.length} deleted videos
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <BackupButtons
                    handleClickOpen={handleClickOpen}
                    setSelectedPlaylist={setSelectedPlaylist}
                    item={item}
                    selectedPlaylist={selectedPlaylist}
                  />
                </AccordionDetails>
              </Accordion>
            );
          })
        ) : (
          <Typography style={{ margin: 20 }}>{errorMessage}</Typography>
        )}
      </List>
      <Modal
        open={open}
        onClose={handleClose}
        title={selectedPlaylist.lastUpdate}
      >
        <Button
          variant="outlined"
          snackText={`Your playlist from ${selectedPlaylist?.lastUpdate} has been restored.`}
          func={() => {
            savePlaylistData(selectedPlaylist);
          }}
        >
          Restore
        </Button>
        <Playlist playlistData={selectedPlaylist.playlist}>Playlist</Playlist>
        <Playlist playlistData={selectedPlaylist.deletedVideos}>
          Deleted Videos
        </Playlist>
      </Modal>
    </Paper>
  );
};
