/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// IMPORT

// React
import { useState, useEffect } from "react";
// Material UI

// Components

// Custom Hook

// Utils

// External

// Data

// Functional component
export const useGetYoutubePlaylist = () => {
  // State
  // This playlist comes from the youtube page, sent to us by the contentScript getPlaylistAndPassMessage
  const [youtubePlaylist, setYoutubePlaylist] = useState([]);
  // This is the loadingIndicator from when YoutubePlaylist is fetched
  const [youtubeLoading, setYoutubeLoading] = useState(false);
  // Effect
  useEffect(() => {
    // Loading bar for data fetched from the youtube page
    setYoutubeLoading(true);

    // Send message to the background script which can call getPlaylistAndPassMessage
    chrome.runtime.sendMessage({ popupOpen: true });

    // Receive message from the content script "getPlaylistAndPassMessage"
    chrome.runtime.onMessage.addListener((request) => {
      console.log("onMessage listener fired in syncPlaylist.js");
      if (request?.playlist.length > 0) {
        console.log("The onMessage request parameter had playlistData");
        console.log(request);
        setYoutubePlaylist(request);
        setYoutubeLoading(false);
      } else {
        console.log(
          "The onMessage request parameter did not have playlistData"
        );
        setYoutubeLoading(false);
      }
    });
  }, []);
  // Functions

  // Return
  return [youtubePlaylist, youtubeLoading];
};
