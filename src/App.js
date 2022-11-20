// IMPORT

// React

// Material UI

// Components
import { Nav } from "./components/nav/Nav";
import { MyPlaylist } from "./pages/MyPlaylist";
import { FindPlaylist } from "./pages/FindPlaylist";
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
      <Nav />
      <Routes>
        <Route path="/FindPlaylist" element={<FindPlaylist />} />
        <Route path="/MyPlaylist" element={<MyPlaylist />} />
        <Route path="/MyDeletedVideos" element={<MyDeletedVideos />} />
        <Route path="/PlaylistBackups" element={<PlaylistBackups />} />
        <Route path="*" element={<Navigate to="/FindPlaylist" replace />} />
      </Routes>
    </>
  );
}

export default App;
