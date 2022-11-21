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

// Custom Hook
import { useGetChromeStorage } from "../CustomHooks/useGetChromeStorage";

// Utils

// External

// Data
import { playlist_test_data } from "../../Data/TestData";

// Functional component
export const Playlist = ({ children, playlistData, loading }) => {
  // State

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
      <Typography align="center">{children}</Typography>
      <List style={{ overflowY: "scroll", height: 300 }}>
        {playlistData.map((item) => {
          return (
            <ListItem disablePadding>
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
        })}
      </List>
    </Paper>
  );
};
