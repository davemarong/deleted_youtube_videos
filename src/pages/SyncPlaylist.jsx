/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// IMPORT

// React
import { useState, useEffect } from "react";
// Material UI

// Components
import { Nav } from "../components/Nav/Nav";
import { Header } from "../components/Header/Header";
import { Playlist } from "../components/Playlist/Playlist";
import { SplitScreen } from "../components/SplitScreen/SplitScreen";
import { LastUpdate } from "../components/LastUpdate/LastUpdate";
import { ToolTip } from "../components/ToolTip/ToolTip";
import { Menu } from "../components/Menu/Menu";

// Utils
import {
  comparePlaylists,
  compareIDs,
  savePlaylist,
} from "../Utils/Utils";

// Icon
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";

// Custom Hook

// External
import { useSnackbar } from "notistack";

// Data
import { Button } from "../components/Button/Button";
import { menu_items } from "../components/Menu/MenuItems";
import {
  oldPlaylistErrorMessage,
  newPlaylistErrorMessage,
} from "../constants/Constants";

// Functional component
export const SyncPlaylist = ({ data, loading }) => {
  // State
  // This playlist comes from the youtube page, sent to us by the contentScript getPlaylistAndPassMessage
  const [chromePlaylist, setChromePlaylist] = useState([]);
  // This is the loadingIndicator from when chromePlaylist is fetched
  const [chromeLoading, setChromeLoading] = useState(false);
  // This is true if the two playlistId's are the same.
  const [matchingID, setMatchingId] = useState(false);
  // Snackbar library
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // Effect
  useEffect(() => {
    // Loading bar for data fetched from the youtube page
    setChromeLoading(true);

    // Send message to the background script which can call getPlaylistAndPassMessage
    chrome.runtime.sendMessage({ popupOpen: true });

    // Receive message from the content script "getPlaylistAndPassMessage"
    chrome.runtime.onMessage.addListener((request) => {
      console.log("onMessage listener fired in syncPlaylist.js");
      if (request?.playlist.length > 0) {
        console.log("The onMessage request parameter had playlistData");
        console.log(request);
        setChromePlaylist(request);
        setChromeLoading(false);
      } else {
        console.log(
          "The onMessage request parameter did not have playlistData"
        );
        setChromeLoading(false);
      }
    });
  }, []);
  useEffect(() => {
    // XXXXXXXX Now we only compare id's when the youtube playlsit is fetched. We need to do the same when the fetching frm chrome.storage is done as well
    setMatchingId(compareIDs(chromePlaylist.playlistId, data.playlistId));
  }, [data, chromePlaylist]);

  // Return
  return (
    <>
      <Nav />
      <Header>Find Playlist</Header>
      <LastUpdate data={data} />
      <Menu menuItems={menu_items} />
      {matchingID && (
        <Button
          variant="contained"
          icon={<SyncRoundedIcon />}
          func={() => {
            const [numberDeletedVideos, deletedVideos] = comparePlaylists(
              data.playlist,
              chromePlaylist.playlist
            );
            savePlaylist(
              chromePlaylist.playlist,
              chromePlaylist.playlistId,
              deletedVideos
            );
            enqueueSnackbar(
              `Your playlist have been synced. We found ${numberDeletedVideos} deleted videos`,
              {
                autoHideDuration: 6000,
                variant: "success",
              }
            );
          }}
        >
          Sync now
        </Button>
      )}
      <SplitScreen>
        <Playlist
          playlistData={data.playlist}
          loading={loading}
          errorMessage={oldPlaylistErrorMessage}
        >
          Old Playlist
        </Playlist>
        <Playlist
          playlistData={chromePlaylist.playlist}
          loading={chromeLoading}
          errorMessage={newPlaylistErrorMessage}
        >
          New Playlist
        </Playlist>
      </SplitScreen>
    </>
  );
};
