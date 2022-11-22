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
import { deletedVideosErrorMessage } from "../constants/Constants";

// Functional component
export const MyDeletedVideos = ({ data, loading }) => {
  // State

  // Functions

  // Return
  return (
    <>
      <Nav />
      <Header>My Deleted Videos</Header>
      <Playlist
        playlistData={data.deletedVideos}
        errorMessage={deletedVideosErrorMessage}
      >
        My Deleted Videos
      </Playlist>
    </>
  );
};
