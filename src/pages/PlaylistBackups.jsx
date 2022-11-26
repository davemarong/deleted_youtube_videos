// IMPORT

// React

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

// Functional component
export const PlaylistBackups = () => {
  // State
  // Custom hook
  const [data, loading] = useGetChromeStorage();
  // Functions

  // Return
  return (
    <>
      <Nav />
      <Header>Backups</Header>
      <PlaylistBackup
        errorMessage={backupsPlaylistErrorMessage}
        playlistBackups={data.playlistBackups}
      ></PlaylistBackup>
    </>
  );
};
