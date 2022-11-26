// IMPORT
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";
import ListRoundedIcon from "@mui/icons-material/ListRounded";
import TheatersRoundedIcon from "@mui/icons-material/TheatersRounded";
import BackupRoundedIcon from "@mui/icons-material/BackupRounded";

export const nav_items = [
  { id: 0, label: "Sync", href: "/Sync", icon: <SyncRoundedIcon /> },
  {
    id: 2,
    label: "Playlist",
    href: "/Playlist",
    icon: <ListRoundedIcon />,
  },
  {
    id: 1,
    label: "Videos",
    href: "/Videos",
    icon: <TheatersRoundedIcon />,
  },
  {
    id: 3,
    label: "Backups",
    href: "/Backups",
    icon: <BackupRoundedIcon />,
  },
];
