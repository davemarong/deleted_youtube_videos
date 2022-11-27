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
import { comparePlaylists, compareIDs, savePlaylist } from "../Utils/Utils";

// Icon
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";

// Custom Hook
import { useGetChromeStorage } from "../components/CustomHooks/useGetChromeStorage";
import { useGetYoutubePlaylist } from "../components/CustomHooks/useGetYoutubePlaylist";
import { useShowSyncButton } from "../components/CustomHooks/useShowSyncButton";

// External

// Data
import { Button } from "../components/Button/Button";
import { menu_items } from "../components/Menu/MenuItems";
import {
  oldPlaylistErrorMessage,
  newPlaylistErrorMessage,
} from "../constants/Constants";

// Functional component
export const SyncPlaylist = () => {
  // State
  const [myPlaylist, setMyPlaylist] = useState([]);

  // Custom hook
  // Getting data from chrome storage
  const [data, loading] = useGetChromeStorage();
  // Getting data from youtube
  const [youtubePlaylist, youtubeLoading] = useGetYoutubePlaylist();
  // Get data if to show syncButton or not
  const showSyncButton = useShowSyncButton({
    data: data,
    youtubePlaylist: youtubePlaylist,
  });
  useEffect(() => {
    setMyPlaylist(data.playlist);
  }, [data]);
  // Props object
  const ButtonProps = {
    icon: <SyncRoundedIcon />,
    snackText: `Your playlist have been synced.`,
    variant: "contained",
    func: () => {
      savePlaylist(youtubePlaylist);
      setMyPlaylist(youtubePlaylist.playlist);
    },
  };
  // Return
  return (
    <>
      <Nav />
      <Header>Sync</Header>
      <LastUpdate data={data} />
      <Menu menuItems={menu_items} />
      {showSyncButton && <Button {...ButtonProps}>Sync now</Button>}
      <SplitScreen>
        <Playlist
          playlistData={myPlaylist}
          loading={loading}
          errorMessage={oldPlaylistErrorMessage}
        >
          Old Playlist
        </Playlist>
        <Playlist
          playlistData={youtubePlaylist.playlist}
          loading={youtubeLoading}
          errorMessage={newPlaylistErrorMessage}
        >
          New Playlist
        </Playlist>
      </SplitScreen>
    </>
  );
};
