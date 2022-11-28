// IMPORT

// React
import { useState, useEffect } from "react";

// Material UI

// Components
import { Nav } from "../components/Nav/Nav";
import { Header } from "../components/Header/Header";
import { PlaylistBackup } from "../components/PlaylistBackup/PlaylistBackup";

// Utils

// External

// Custom Hook
import { useGetChromeStorage } from "../components/CustomHooks/useGetChromeStorage";

// Data
import { backupsPlaylistErrorMessage } from "../constants/Constants";
import { History } from "../components/History/History";

// Functional component
export const PlaylistBackups = () => {
  // State
  const [history, setHistory] = useState([]);

  // Custom hook
  const [data, loading] = useGetChromeStorage();

  // Functions
  useEffect(() => {
    console.log("History data from hook", data.history);
    setHistory(data.history);
  }, [data]);

  // Return
  return (
    <>
      <Nav />
      <Header>Backups</Header>
      <History history={history}></History>
      <PlaylistBackup
        errorMessage={backupsPlaylistErrorMessage}
        playlistBackups={data.playlistBackups}
      ></PlaylistBackup>
    </>
  );
};
