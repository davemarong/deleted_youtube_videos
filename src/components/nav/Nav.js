// IMPORT

// React

// Material UI
import Button from "@mui/material/Button";

// Components

// Utils

// External
import { useNavigate } from "react-router-dom";

// Data
import { nav_items } from "./NavItems";

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
    <>
      {nav_items.map((item) => {
        return (
          <Button
            onClick={() => {
              navigateToPage(item.href);
            }}
            variant="outlined"
            key={item.id}
          >
            {item.label}
          </Button>
        );
      })}
    </>
  );
};
