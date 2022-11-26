/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// IMPORT

// React
import { useState, useEffect } from "react";

// Material UI
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

// Components
import { useGetChromeStorage } from "../CustomHooks/useGetChromeStorage";
// Custom Hook

// Utils

// External

// Data

// Functional component
export const Playlist = ({ children, playlistData, loading, errorMessage }) => {
  // State
  console.log(playlistData);
  // Functions

  // Custom Hook

  if (loading) {
    return (
      <Grid container justifyContent="center" style={{ marginTop: 100 }}>
        <CircularProgress color="secondary" />
      </Grid>
    );
  }
  // Return
  return (
    <Paper elevation={3} style={{ margin: 5 }}>
      <Typography variant="h6" align="center">
        {children}
      </Typography>
      <Typography align="center" variant="body2">
        {playlistData?.length} videos found
      </Typography>
      <List style={{ overflowY: "scroll", height: 300 }}>
        {playlistData?.length > 0 ? (
          playlistData.map((item) => {
            return (
              <ListItem key={item.url} disablePadding>
                <ListItemButton href={item.url}>
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      sx={{ width: 62, height: 35 }}
                      alt={item.title}
                      src={item.img}
                    />
                  </ListItemAvatar>
                  <Typography style={{ paddingLeft: 10 }} variant="body2">
                    {item.title}{" "}
                  </Typography>
                </ListItemButton>
              </ListItem>
            );
          })
        ) : (
          <Typography style={{ margin: 20 }}>{errorMessage}</Typography>
        )}
      </List>
    </Paper>
  );
};
