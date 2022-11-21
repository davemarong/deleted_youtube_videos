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

// Functional component
function App() {
  // State

  // Functions

  // Return
  return (
    <>
      <Routes>
        <Route path="/Sync" element={<SyncPlaylist />} />
        <Route path="/Playlist" element={<MyPlaylist />} />
        <Route path="/Videos" element={<MyDeletedVideos />} />
        <Route path="/Backups" element={<PlaylistBackups />} />
        <Route path="*" element={<Navigate to="/Sync" replace />} />
      </Routes>
    </>
  );
}

export default App;
