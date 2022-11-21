// IMPORT

// React

// Material UI

// Components
import { Nav } from "../components/Nav/Nav";
import { Header } from "../components/Header/Header";
import { Playlist } from "../components/Playlist/Playlist";
import { SplitScreen } from "../components/SplitScreen/SplitScreen";

// Utils

// Custom Hook
import { useGetChromeStorage } from "../components/CustomHooks/useGetChromeStorage";

// External

// Data
import { playlist_test_data } from "../Data/TestData";
// Functional component
export const FindPlaylist = () => {
  // State

  // Functions
  // const [data, loading] = useGetChromeStorage("playlist");

  // TESTING
  let data = playlist_test_data;
  let loading = false;

  // Return
  return (
    <>
      <Nav />
      <Header>Find Playlist</Header>
      <SplitScreen>
        <Playlist playlistData={data} loading={loading}>
          Old Playlist
        </Playlist>
        <Playlist playlistData={data} loading={loading}>
          New Playlist
        </Playlist>
      </SplitScreen>
    </>
  );
};
