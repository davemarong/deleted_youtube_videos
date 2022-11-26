// IMPORT

// React

// Material UI
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

// Components

// Utils

// External
import { useNavigate } from "react-router-dom";

// Data
import { nav_items } from "./NavItems";
import logo from "../../images/logo.png";
import { Avatar } from "@mui/material";

// Functional component
export const Nav = () => {
  // State

  // ROUTING
  let navigate = useNavigate();

  // Functions
  const navigateToPage = (page) => {
    navigate(page);
  };
  // Return
  return (
    <Paper style={{ padding: "10px 0", marginBottom: 10 }}>
      <Grid
        container
        justifyContent="space-evenly"
        flexWrap="nowrap"
        alignItems="center"
      >
        <Grid item>
          <Avatar src={logo} sx={{ width: 75, height: 75 }} variant="square" />
        </Grid>
        {nav_items.map((item) => {
          return (
            <Grid item>
              <Button
                onClick={() => {
                  navigateToPage(item.href);
                }}
                variant="outlined"
                key={item.id}
                startIcon={item.icon}
              >
                {item.label}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};
