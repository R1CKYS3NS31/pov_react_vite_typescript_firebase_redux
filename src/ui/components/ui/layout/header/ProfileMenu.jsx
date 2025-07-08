import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Grid2,
  IconButton,
  Paper,
  Popper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { ProfileTab } from "./ProfileTab";
import { SettingTab } from "./SettingTab";
import {
  AccountCircleOutlined,
  LogoutOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { MainCard } from "../../cards/MainCard";
import Transitions from "../../@extended/Transitions";
import {
  currentUser,
  signOutFirebaseUser,
} from "../../../../../services/firebase/config/firebase-auth";
import { getUserFirebase } from "../../../../../services/firebase/controller/user-firebase";

// const avatar1 = "/assets/users/user-round.svg";
// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    "aria-controls": `profile-tabpanel-${index}`,
  };
}

export const ProfileMenu = () => {
  const theme = useTheme();

  const [userAccount, setUserAccount] = useState({
    exists: false,
    uid: "",
    name: { first: "", last: "" },
  });

  useEffect(() => {
    const user = currentUser();
    if (user) {
      getUserFirebase(user.uid)
        .then((userFirebase) => {
          if (userFirebase.exists) {

            setUserAccount(userFirebase);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handleLogout = async () => {
    await signOutFirebaseUser();
  };

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        oncl
        sx={{
          p: 0.25,
          bgcolor: open ? "grey.100" : "transparent",
          borderRadius: 2,
          "&:hover": { bgcolor: "secondary.lighter" },
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar
            alt={userAccount ? userAccount.name.first : "Guest"}
            src={userAccount && userAccount.displayPicture}
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="subtitle1">
            {userAccount
              ? userAccount.name.first + " " + userAccount.name.last
              : "Guest"}
          </Typography>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 9],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper
                elevation={1}
                sx={{
                  width: 290,
                  minWidth: 240,
                  maxWidth: 290,
                  [theme.breakpoints.down("md")]: {
                    maxWidth: 250,
                  },
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    <CardContent sx={{ px: 2.5, pt: 3 }}>
                      <Grid2
                        container
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid2 item>
                          <Stack
                            direction="row"
                            spacing={1.25}
                            alignItems="center"
                          >
                            <Avatar
                              alt={
                                userAccount
                                  ? userAccount.name.first.toUpperCase()
                                  : "Guest"
                              }
                              src={
                                userAccount && userAccount.displayPicture
                              }
                              sx={{ width: 32, height: 32 }}
                            />
                            <Stack>
                              <Typography
                                variant="h4"
                                textTransform={"capitalize"}
                              >
                                {userAccount
                                  ? userAccount.name.first +
                                    " " +
                                    userAccount.name.last
                                  : "Guest"}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                Welcome!
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid2>
                        <Grid2 item>
                          <IconButton
                            size="large"
                            color="secondary"
                            onClick={handleLogout}
                          >
                            <LogoutOutlined />
                          </IconButton>
                        </Grid2>
                      </Grid2>
                    </CardContent>
                    {open && (
                      <>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <Tabs
                            variant="fullWidth"
                            value={value}
                            onChange={handleChange}
                            aria-label="profile tabs"
                          >
                            <Tab
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                textTransform: "capitalize",
                              }}
                              icon={
                                <AccountCircleOutlined
                                  style={{
                                    marginBottom: 0,
                                    marginRight: "10px",
                                  }}
                                />
                              }
                              label="Profile"
                              {...a11yProps(0)}
                            />
                            <Tab
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                textTransform: "capitalize",
                              }}
                              icon={
                                <SettingsOutlined
                                  style={{
                                    marginBottom: 0,
                                    marginRight: "10px",
                                  }}
                                />
                              }
                              label="Setting"
                              {...a11yProps(1)}
                            />
                          </Tabs>
                        </Box>
                        <TabPanel value={value} index={0} dir={theme.direction}>
                          <ProfileTab
                            handleLogout={handleLogout}
                            userAccount={userAccount}
                          />
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                          <SettingTab />
                        </TabPanel>
                      </>
                    )}
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};
