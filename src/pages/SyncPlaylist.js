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
  getPlaylistAndPassMessage,
  injectFunctionToWebsite,
  comparePlaylists,
  compareIDs,
} from "../Utils/Utils";

// Icon
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";

// Custom Hook
import { useGetChromeStorage } from "../components/CustomHooks/useGetChromeStorage";

// External

// Data
import { playlist_test_data } from "../Data/TestData";
import { Button } from "../components/Button/Button";
import { menu_items } from "../components/Menu/MenuItems";

// Functional component
export const SyncPlaylist = () => {
  // State
  // This playlist comes from the youtube page, sent to us by the contentScript getPlaylistAndPassMessage
  const [chromePlaylist, setChromePlaylist] = useState([]);
  // This is the loadingIndicator from when chromePlaylist is fetched
  const [chromeLoading, setChromeLoading] = useState(false);
  // This is true if the two playlistId's are the same.
  const [matchingID, setMatchingId] = useState(false);

  // Custom hook
  const [data, loading] = useGetChromeStorage();

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

  // Variable
  const oldPlaylistErrorMessage =
    "You don't have a playlist saved. Open any video inside a playlist on youtube, and open the 'Sync' page again. Then press the 'Sync now' button.";
  const newPlaylistErrorMessage =
    "We could not find a playlist on this page. Open any video inside a playlist on youtube, and open the 'Sync' page again. ";

  // TESTING;
  // let data = playlist_test_data;
  // let loading = false;

  const savePlaylist = (chromePlaylist) => {
    // Get current playlist from Youtube with titles, images and url's
    // const currentPlaylist = [
    //   ...document.querySelectorAll(
    //     "[playlist-type='PLVE'] #items #playlist-items"
    //   ),
    // ].map((item) => {
    //   const title = item.querySelector("#meta h4 #video-title");
    //   const img = item.querySelector("#img");
    //   const url = item.querySelector("#thumbnail");
    //   return { title: title.textContent.trim(), img: img.src, url: url.href };
    // });

    const currentPlaylist = chromePlaylist.playlist;
    console.log(currentPlaylist);
    // Find playlistId in the url
    const text = "list=";
    const url = window.location.href;
    const number = url.search(text);
    const playlistId = url.slice(number + 5, number + 5 + 34);

    // Get day of month
    const date = new Date();
    const [day, month, dayInMonth] = date.toString().split(" ");
    const dayAndMonth = `${month} ${dayInMonth}`;

    // Fetch playlist and deletedVideos from Chrome storage
    chrome.storage.local.get(["data"], ({ data }) => {
      const { playlist, deletedVideos, playlistBackups } = data;

      // Filter out videos that are not found in oldPlaylist and currentPlaylist
      const newlyDeletedVideos = playlist.filter(
        (oldVideo) =>
          !currentPlaylist.find(
            (currentVideo) => oldVideo.title === currentVideo.title
          )
      );

      // Get img-url from oldPlaylist if newPlaylist does not have
      const updatedCurrentPlaylist = currentPlaylist.map((currentVideo) => {
        // If img is present, return
        if (currentVideo.img) return currentVideo;

        // If image is not present, find image in old playlist and return that
        const updatedVideo = playlist.find(
          (oldVideo) => currentVideo.title === oldVideo.title
        );

        if (updatedVideo) {
          return updatedVideo;
        } else {
          return currentVideo;
        }
      });
      console.log(updatedCurrentPlaylist);
      // Save the newly created deletedVideos and playlist
      chrome.storage.local.set({
        data: {
          playlist: updatedCurrentPlaylist,
          deletedVideos: [...deletedVideos, ...newlyDeletedVideos],
          playlistId: playlistId,
          lastUpdate: dayAndMonth,
          playlistBackups: [
            ...playlistBackups,
            {
              playlist: updatedCurrentPlaylist,
              deletedVideos: [...deletedVideos, ...newlyDeletedVideos],
              playlistId: playlistId,
              lastUpdate: dayAndMonth,
            },
          ],
        },
      });
      localStorage.setItem(
        "playlistData",
        JSON.stringify({
          playlist: updatedCurrentPlaylist,
          deletedVideos: [...deletedVideos, ...newlyDeletedVideos],
          playlistId: playlistId,
          lastUpdate: dayAndMonth,
          playlistBackups: [
            ...playlistBackups,
            {
              playlist: updatedCurrentPlaylist,
              deletedVideos: [...deletedVideos, ...newlyDeletedVideos],
              playlistId: playlistId,
              lastUpdate: dayAndMonth,
            },
          ],
        })
      );
    });
  };

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
            savePlaylist(chromePlaylist);
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
