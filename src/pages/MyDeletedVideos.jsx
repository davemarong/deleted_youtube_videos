/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// IMPORT

// React
import { useState, useEffect } from "react";

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

// Custom Hook
import { useGetChromeStorage } from "../components/CustomHooks/useGetChromeStorage";

// Data
import { deletedVideosErrorMessage } from "../constants/Constants";

// Functional component
export const MyDeletedVideos = () => {
  // State
  const [deletedVideos, setDeletedVideos] = useState([]);

  // Custom hook
  const [data] = useGetChromeStorage();

  useEffect(() => {
    setDeletedVideos(data.deletedVideos);
  }, [data]);

  // Functions
  const ButtonProps = {
    icon: <DeleteIcon />,
    func: () => {
      deletePropertyInStorage("deletedVideos", []);
      setDeletedVideos([]);
    },
    snackText: "You have deleted your 'Deleted Videos'",
    align: "right",
  };
  // Return
  return (
    <>
      <Nav />
      <Header>Videos</Header>
      <Button {...ButtonProps}>Remove 'My deleted Videos'</Button>
      <Playlist
        playlistData={deletedVideos}
        errorMessage={deletedVideosErrorMessage}
      >
        My Deleted Videos
      </Playlist>
    </>
  );
};
