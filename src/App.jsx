// IMPORT

// React

// Material UI

// Components
import { MyPlaylist } from "./pages/MyPlaylist";
import { SyncPlaylist } from "./pages/SyncPlaylist";
import { MyDeletedVideos } from "./pages/MyDeletedVideos";
import { PlaylistBackups } from "./pages/PlaylistBackups";

// Utils

// External
import { Routes, Route, Navigate } from "react-router-dom";

// Data
import { test_data } from "./Data/TestData";

// Custom Hook
import { useGetChromeStorage } from "./components/CustomHooks/useGetChromeStorage";

// Functional component
function App() {
  // State

  // Functions

  // TESTING;
  // let data = test_data;
  // let loading = false;

  // Custom hook
  const [data, loading] = useGetChromeStorage();

  // Props object
  const PagesProps = {
    data: data,
    loading: loading,
  };

  // Return
  return (
    <>
      <Routes>
        <Route path="/Sync" element={<SyncPlaylist {...PagesProps} />} />
        <Route path="/Playlist" element={<MyPlaylist {...PagesProps} />} />
        <Route path="/Videos" element={<MyDeletedVideos {...PagesProps} />} />
        <Route path="/Backups" element={<PlaylistBackups {...PagesProps} />} />
        <Route path="*" element={<Navigate to="/Sync" replace />} />
      </Routes>
    </>
  );
}

export default App;
