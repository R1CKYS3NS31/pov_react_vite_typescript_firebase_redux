import { Favorite, Home, Person3 } from "@mui/icons-material";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
  Grid2,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ProfileMenu } from "./header/ProfileMenu";

export const MainLayout = () => {
  const [value, setValue] = useState("home");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    // ricky has bugs: onclick
    event.preventDefault();
    setValue(newValue);
    navigate(`/${newValue}`, { replace: true });
  };

  return (
    <Grid2 container direction={"column"} justifyContent={"center"} spacing={1}>
      <Grid2 item minHeight={100} xs={12} sm={12} md={8} lg={6} xl={6}>
        <AppBar variant="outlined"  maxWidth="md">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h1">PoV</Typography>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <ProfileMenu />
            </Box>
          </Toolbar>
        </AppBar>
      </Grid2>
      <Grid2 item container xs={12} sm={12} md={8} lg={6} xl={6}>
        <Container>
          <Outlet />
        </Container>
      </Grid2>
      <Grid2 itemxs={12} sm={12} md={8} lg={6} xl={6}>
        <BottomNavigation
          showLabels
          sx={{ width: "100%", bottom: 0, position: "fixed" }}
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction label="Home" value="home" icon={<Home />} />
          <BottomNavigationAction
            label="Favorites"
            value="favorites"
            icon={<Favorite />}
          />
          <BottomNavigationAction
            label="Account"
            value="account/account"
            icon={<Person3 />}
          />
        </BottomNavigation>
      </Grid2>
    </Grid2>
  );
};
