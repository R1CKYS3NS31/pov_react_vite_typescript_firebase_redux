import { EmailOutlined, PhoneOutlined } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Avatar,
  Divider,
  Grid2,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { MainCard } from "../../components/ui/cards/MainCard";
import { useEffect, useState } from "react";
import { PoV } from "../../components/pov/PoV";
import { useParams } from "react-router-dom";
import { fetchUser } from "../../../services/api/user/api-user";
import { fetchPovsByAuthor } from "../../../services/api/pov/api-pov";
import { auth } from "../../../utils/auth_helper";
import { setPovs } from "../../../services/redux/slices/pov/povSlice";
import { setProfile } from "../../../services/redux/slices/user/profileSlice";

export const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const povs = useSelector((state) => state.povs);
  const { userId } = useParams();

  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openErrorSnackBar, setOpenErrorSnackBar] = useState(false);

  useEffect(() => {
    // setLoading(true);
    auth.isAuthenticated().then((token) => {
      if (token) {
        fetchUser(userId)
          .then((profileFetched) => {
            // dispatch
            dispatch(setProfile(profileFetched));
            // setProfile(profileFetched);
            fetchPovsByAuthor(profileFetched.id).then(
              (povsByAuthorFetched) => {
                dispatch(setPovs(povsByAuthorFetched));
              }
            );
          })
          .catch((error) => {
            setError(error);
            setOpenErrorSnackBar(true);
          });
        // .finally(() => setLoading(false));
      } else {
        setError("Please sign-in");
        setOpenErrorSnackBar(true);
      }
    });
  }, [userId, dispatch]);

  const handleCloseErrorSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorSnackBar(false);
  };

  return (
    <MainCard title={"Profile"} sx={{ minHeight: "100vh" }}>
      <Grid2 container direction={"column"} spacing={2}>
        <Grid2 item xs={6} container spacing={2}>
          <Grid2 item xs={12} md={6} container spacing={2}>
            <Grid2 item xs={4}>
              <Avatar
                variant="rounded"
                alt={profile ? profile.name.first : "Guest"}
                src={profile && profile.displayPicture}
                sx={{
                  width: "100px",
                  height: "100px",
                }}
              />
            </Grid2>
            <Grid2 item xs={8}>
              <Typography variant="h2">
                {profile
                  ? profile.name.first + " " + profile.name.last
                  : "Guest"}
              </Typography>
              <Typography variant="body2">
                {`Joined: ${new Date(
                  profile && profile.createdAt
                ).toDateString()}`}
              </Typography>
            </Grid2>
          </Grid2>
          <Grid2 item xs={12} md={6}>
            <Typography variant="h4">About</Typography>
            <Typography variant="body1">
              {profile && profile.description}
            </Typography>
            <List component={Stack} direction={"row"} spacing={1}>
              <ListItem>
                <ListItemIcon>
                  <EmailOutlined />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">
                      {profile && profile.email}
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PhoneOutlined />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">
                      {profile && profile.tel}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Grid2>
        </Grid2>
        <Divider />
        <Grid2 item xs={6}>
          <Typography variant="h4" justifySelf={"center"}>
            PoVs
          </Typography>
          <Grid2 container spacing={0.5}>
            {povs ? (
              povs.map((pov) => (
                <Grid2 item size={{ xs: 12, md: 6, }} key={pov.id}>
                  <PoV pov={pov} />
                </Grid2>
              ))
            ) : (
              <Typography variant="h4" sx={{ justifySelf: "center" }}>
                no pov available
              </Typography>
            )}
          </Grid2>
        </Grid2>
        <Snackbar
          open={openErrorSnackBar}
          autoHideDuration={10000}
          onClose={handleCloseErrorSnackBar}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <Alert
            // title="Error"
            onClose={handleCloseErrorSnackBar}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        </Snackbar>
      </Grid2>
    </MainCard>
  );
};
