/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// IMPORT

// React

// Material UI

// Icon
import DeleteIcon from "@mui/icons-material/Delete";

// Components
import { Nav } from "../components/Nav/Nav";
import { Header } from "../components/Header/Header";
import { Playlist } from "../components/Playlist/Playlist";
import { Button } from "../components/Button/Button";

// Utils
import { deletePropertyInStorage } from "../Utils/Utils";

// External

// Data
import { deletedVideosErrorMessage } from "../constants/Constants";

// Functional component
export const MyDeletedVideos = ({ data }) => {
  // State

  // Functions
  const ButtonProps = {
    icon: <DeleteIcon />,
    func: () => {
      deletePropertyInStorage("deletedVideos", []);
    },
    snackText: "You have deleted your 'Deleted Videos'",
  };
  // Return
  return (
    <>
      <Nav />
      <Header>My Deleted Videos</Header>
      <Button {...ButtonProps}>Remove 'My deleted Videos'</Button>
      <Playlist
        playlistData={data.deletedVideos}
        errorMessage={deletedVideosErrorMessage}
      >
        My Deleted Videos
      </Playlist>
    </>
  );
};
