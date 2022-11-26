// IMPORT

// React

// Material UI

// Components
import { Nav } from "../components/Nav/Nav";
import { Header } from "../components/Header/Header";
import { PlaylistBackup } from "../components/PlaylistBackup/PlaylistBackup";

// Utils

// External

// Data
import { backupsPlaylistErrorMessage } from "../constants/Constants";

// Functional component
export const PlaylistBackups = ({ data }) => {
  // State

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
