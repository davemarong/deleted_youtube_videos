// IMPORT

// React

// Material UI

// Components
import { Nav } from "../components/Nav/Nav";
import { Header } from "../components/Header/Header";
import { Playlist } from "../components/Playlist/Playlist";

// Utils

// External

// Data
import { oldPlaylistErrorMessage } from "../constants/Constants";

// Functional component
export const MyPlaylist = ({ data, loading }) => {
  // State

  // Functions

  // Return
  return (
    <>
      <Nav />
      <Header>My Playlist</Header>
      <Playlist
        playlistData={data.playlist}
        errorMessage={oldPlaylistErrorMessage}
      >
        My Playlist
      </Playlist>
    </>
  );
};
