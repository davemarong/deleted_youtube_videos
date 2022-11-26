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

// External
import { useSnackbar } from "notistack";

// Data

// Functional component
export const PlaylistBackup = ({ playlistBackups, children, errorMessage }) => {
  // State
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const [selectedPlaylist, setSelectedPlaylist] = useState([]);

  // Snackbar library
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const savePlaylistData = (data) => {
    chrome.storage.local.set({
      data: {
        playlist: data.playlist,
        deletedVideos: data.deletedVideos,
        playlistId: data.playlistId,
        lastUpdate: data.lastUpdate,
        playlistBackups: [selectedPlaylist, ...playlistBackups],
      },
    });
    localStorage.setItem(
      "playlistData",
      JSON.stringify({
        playlist: data.playlist,
        deletedVideos: data.deletedVideos,
        playlistId: data.playlistId,
        lastUpdate: data.lastUpdate,
        playlistBackups: [selectedPlaylist, ...playlistBackups],
      })
    );
  };
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
                  <Grid container flexWrap="nowrap">
                    <Button
                      variant="outlined"
                      func={() => {
                        savePlaylistData(item);
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
                </AccordionDetails>
              </Accordion>
            );
          })
        ) : (
          <Typography style={{ margin: 20 }}>{errorMessage}</Typography>
        )}
      </List>
      <Modal
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        title={selectedPlaylist.lastUpdate}
      >
        <Button
          variant="outlined"
          func={() => {
            savePlaylistData(selectedPlaylist);
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
        <Playlist playlistData={selectedPlaylist.playlist}>Playlist</Playlist>
        <Playlist playlistData={selectedPlaylist.deletedVideos}>
          Deleted Videos
        </Playlist>
      </Modal>
    </Paper>
  );
};
