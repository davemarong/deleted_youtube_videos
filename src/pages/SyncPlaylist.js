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

// Utils
import {
  getPlaylistAndPassMessage,
  injectFunctionToWebsite,
} from "../Utils/Utils";

// Custom Hook
import { useGetChromeStorage } from "../components/CustomHooks/useGetChromeStorage";

// External

// Data
import { playlist_test_data } from "../Data/TestData";
import { Button } from "../components/Button/Button";

// Functional component
export const SyncPlaylist = () => {
  // State
  const [chromePlaylist, setChromePlaylist] = useState([]);
  const [chromeLoading, setChromeLoading] = useState(false);

  // Custom hook
  const [data, loading] = useGetChromeStorage("playlist");

  // Effect
  useEffect(() => {
    // Loading bar for data fetched from the youtube page
    setChromeLoading(true);

    // Send message to the background script which can call getPlaylistAndPassMessage
    chrome.runtime.sendMessage({ popupOpen: true });

    // Receive message from the content script "getPlaylistAndPassMessage"
    chrome.runtime.onMessage.addListener((request) => {
      console.log("onMessage listener fired in syncPlaylist.js");
      if (request.playlist.length > 0) {
        console.log("The onMessage request parameter had playlistData");
        console.log(request);
        setChromePlaylist(request.playlist);
        setChromeLoading(false);
      } else {
        console.log(
          "The onMessage request parameter did not have playlistData"
        );
        setChromeLoading(false);
      }
    });
  }, []);

  // Variable
  const oldPlaylistErrorMessage =
    "You don't have a playlist saved. Open any video inside a playlist on youtube, and open the 'Sync' page again. Then press the 'Sync now' button.";
  const newPlaylistErrorMessage =
    "We could not find a playlist on this page. Open any video inside a playlist on youtube, and open the 'Sync' page again. ";

  // TESTING
  // let data = playlist_test_data;
  // let loading = false;

  // Return
  return (
    <>
      <Nav />
      <Header>Find Playlist</Header>
      <SplitScreen>
        <Playlist
          playlistData={data}
          loading={loading}
          errorMessage={oldPlaylistErrorMessage}
        >
          Old Playlist
        </Playlist>
        <Playlist
          playlistData={chromePlaylist}
          loading={chromeLoading}
          errorMessage={newPlaylistErrorMessage}
        >
          New Playlist
        </Playlist>
      </SplitScreen>
      <Button func={() => {}}>Sync now</Button>
    </>
  );
};
