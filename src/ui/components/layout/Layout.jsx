import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import Login from "@mui/icons-material/Login";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import ThemeToggleFab from "../fab/ThemeToggleFab";

const Layout = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    isAuthenticated,
    account: userAccount,
    handleSignOut: logout,
  } = useAuth();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Grid
      container
      direction={"column"}
        sx={{
        minHeight: "100vh",
        width: "100%",
        m: 0,
        p: 0,
        bgcolor: "background.default",
      }}
    >
      <Grid size={{xs: 12}}> 
        <AppBar position="fixed" elevation={0} sx={{ top: 0 }}>
        <Toolbar component={Stack} direction={"row"} 
          variant="dense"
          disableGutters
          sx={{
            width: "100%",
            px: { xs: 2, md: 2.5 },
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              fontWeight: 950,
              color: "primary.main",
              textDecoration: "none",
              letterSpacing: "-0.5px",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              transition: "transform 0.2s",
              "&:hover": { transform: "scale(1.02)" },
            }}
          >
            <Box
              sx={{
                width: 28,
                height: 28,
                bgcolor: "primary.main",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "primary.contrastText",
                fontSize: "1.1rem",
              }}
            >
              P
            </Box>
            POV
          </Typography>
          <IconButton
            onClick={handleMenuOpen}
            sx={{ p: 0.5 }}
          >
            <Avatar
              src={userAccount?.displayPicture}
              sx={{ width: 32, height: 32, bgcolor: "primary.main", fontWeight: 700 }}
            >
              {userAccount?.name?.first?.[0] || <AccountCircle />}
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>
      </Grid>

      {/* Account / Action Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              filter: "drop-shadow(0px 8px 32px rgba(0,0,0,0.12))",
              mt: 1.5,
              borderRadius: 3,
              minWidth: 240,
              padding: "8px",
              border: "1px solid",
              borderColor: "divider",
              overflow: "visible",
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 18,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack spacing={1} >
          <Typography variant="subtitle1" >
            {userAccount?.name?.full}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {userAccount?.email || "Local Account"}
          </Typography>
        </Stack>
        <Divider sx={{ my: 1 }} />
        <MenuItem
          component={Link}
          to={isAuthenticated ? "/account?tab=1" : "/account?tab=0"}
          sx={{ px: 2, borderRadius: 2 }}
        >
          <AccountCircle
            fontSize="small"
            sx={{ mr: 2, color: "primary.main" }}
          />
          Profile
        </MenuItem>

        <Divider sx={{ my: 1 }} />

        {isAuthenticated ? (
          <MenuItem
            onClick={logout}
            sx={{ color: "error.main" }}
          >
            <Logout sx={{ mr: 2, fontSize: 20 }} /> Sign Out
          </MenuItem>
        ) : (
          <MenuItem
            component={Link}
            to="/signin"
            sx={{ color: "primary.main" }}
          >
            <Login sx={{ mr: 2, fontSize: 20 }} />Sign In / Support PoV
          </MenuItem>
        )}
      </Menu>

      <Grid size={{xs: 12}} sx={{ pt: 8, px: {xs: 2, md: 2.5}}}>
        <Outlet />
        <ThemeToggleFab />
      </Grid>
    </Grid>
  );
};

export default Layout;
