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
export const useShowSyncButton = (data, youtubePlaylist) => {
  // State
  // This is true if the two playlistId's are the same.
  const [showSyncButton, setShowSyncButton] = useState(true);

  useEffect(() => {
    // if playlistId dont exist, then their is none saved playlist, and the user can sync a new playlist
    if (!data.playlistId) return;

    // XXXXXXXX Now we only compare id's when the youtube playlist is fetched. We need to do the same when the fetching frm chrome.storage is done as well
    setShowSyncButton(compareIDs(youtubePlaylist.playlistId, data.playlistId));
  }, [data, youtubePlaylist]);

  // Functions

  // Return
  return showSyncButton;
};
