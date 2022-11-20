/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// IMPORT

// React
import { useState, useEffect } from "react";

// Material UI
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// Components

// Utils

// External

// Data

// Functional component
export const Playlist = () => {
  // State
  const [playlist, setPlaylist] = useState([]);

  // Effect
  useEffect(() => {
    chrome.storage.local.get("data", ({ data }) => {
      setPlaylist(data.playlist);
      console.log("did it");
      console.log(data);
    });
  }, []);
  // Functions

  // Return
  return (
    <>
      <List>
        {playlist.map((item) => {
          return (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};
