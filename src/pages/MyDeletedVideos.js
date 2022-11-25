/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// IMPORT

// React

// Material UI

// Components
import { Nav } from "../components/Nav/Nav";
import { Header } from "../components/Header/Header";
import { Playlist } from "../components/Playlist/Playlist";
import { Button } from "../components/Button/Button";

// Utils

// External

// Data
import { deletedVideosErrorMessage } from "../constants/Constants";

// Functional component
export const MyDeletedVideos = ({ data, loading }) => {
  // State

  // Functions

  const remove = () => {
    chrome.storage.local.set({
      data: {
        deletedVideos: [],
      },
    });
  };
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
      <Button onClick={remove}>Remove 'My deleted Videos'</Button>
    </>
  );
};
