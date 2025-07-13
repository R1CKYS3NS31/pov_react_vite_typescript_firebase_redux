import PropTypes from "prop-types";
import { useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  AppRegistrationOutlined,
  LockOpenOutlined,
  LogoutOutlined,
  PersonOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const ProfileTab = ({ handleLogout }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState("account/profile");
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    navigate(index);
  };

  return (
    <List
      component="nav"
      sx={{
        p: 0,
        "& .MuiListItemIcon-root": {
          minWidth: 32,
          color: theme.palette.grey[500],
        },
      }}
    >
      <ListItemButton
        selected={selectedIndex === "account/profile"}
        onClick={(event) => handleListItemClick(event, "account/profile")}
      >
        <ListItemIcon>
          <PersonOutlined />
        </ListItemIcon>
        <ListItemText primary="View Profile" />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === "signin"}
        onClick={(event) => handleListItemClick(event, "signin")}
      >
        <ListItemIcon>
          <LockOpenOutlined />
        </ListItemIcon>
        <ListItemText primary="Sign In" />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === "signup"}
        onClick={(event) => handleListItemClick(event, "signup")}
      >
        <ListItemIcon>
          <AppRegistrationOutlined />
        </ListItemIcon>
        <ListItemText primary="Sign Up" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === "logout"}
        onClick={handleLogout}
      >
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};