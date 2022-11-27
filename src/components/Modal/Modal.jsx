/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// IMPORT

// React

// Material UI
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";

// Components

// Custom Hook

// Utils

// External

// Data

// Functional component
export const Modal = ({ onClose, open, children, title }) => {
  // State

  // Functions

  // Return
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      {children}
    </Dialog>
  );
};
