// IMPORT

// React

// Material UI

// Components
import { Nav } from "../components/Nav/Nav";
import { Header } from "../components/Header/Header";
import { Playlist } from "../components/Playlist/Playlist";
import { Button } from "../components/Button/Button";

// Icon
import DeleteIcon from "@mui/icons-material/Delete";

// Utils
import { deletePropertyInStorage } from "../Utils/Utils";

// External

// Data
import { oldPlaylistErrorMessage } from "../constants/Constants";

// Functional component
export const MyPlaylist = ({ data, loading }) => {
  // State

  // Functions
  const ButtonProps = {
    icon: <DeleteIcon />,
    func: () => {
      deletePropertyInStorage("playlist", [], "playlistId", "");
    },
    snackText: "You have deleted your 'Playlist'",
    align: "right",
  };
  // Return
  return (
    <>
      <Nav />
      <Header>Playlist</Header>
      <Button {...ButtonProps}>Delete 'Playlist'</Button>
      <Playlist
        playlistData={data.playlist}
        errorMessage={oldPlaylistErrorMessage}
      >
        My Playlist
      </Playlist>
    </>
  );
};
