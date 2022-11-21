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
  const [chromeLoading, setChromeLoading] = useState(true);

  // Functions
  const [data, loading] = useGetChromeStorage("playlist");

  // Send message to the background script which can call getPlaylistAndPassMessage
  useEffect(() => {
    chrome.runtime.sendMessage({ popupOpen: true });
  }, []);

  // Receive message from the content script "getPlaylistAndPassMessage"
  chrome.runtime.onMessage.addListener((request) => {
    if (request.playlist) {
      console.log(request);
      console.log("message recieved");
      setChromePlaylist(request.playlist);
      setChromeLoading(false);
    }
  });

  // TESTING
  // let data = playlist_test_data;
  // let loading = false;

  // Return
  return (
    <>
      <Nav />
      <Header>Find Playlist</Header>
      <SplitScreen>
        <Playlist playlistData={data} loading={loading}>
          Old Playlist
        </Playlist>
        <Playlist playlistData={chromePlaylist} loading={chromeLoading}>
          New Playlist
        </Playlist>
      </SplitScreen>
      <Button func={() => {}}>Sync now</Button>
    </>
  );
};
