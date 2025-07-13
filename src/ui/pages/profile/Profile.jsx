import { EmailOutlined, PhoneOutlined } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  Grid2,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { MainCard } from "../../components/ui/cards/MainCard";
import { useEffect, useState } from "react";
import { PoV } from "../../components/pov/PoV";
import { useParams } from "react-router-dom";
import { isUserSignedIn } from "../../../services/firebase/config/firebase-auth";
import { getUserFirebase } from "../../../services/firebase/controller/user-firebase";
import { getPoVsByAuthorFirebase } from "../../../services/firebase/controller/pov-firebase";
import { ErrorSnackbar } from "../../components/ui/snackbar/ErrorSnackbar";

export const Profile = () => {

  const { userId } = useParams();

  const [povs, setPovs] = useState({ size: 0, empty: true, docs: [] });
  const [profile, setProfile] = useState({
    exists: false,
    uid: "",
    name: { first: "", last: "" },
  });

  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openErrorSnackBar, setOpenErrorSnackBar] = useState(false);

  useEffect(() => {
    // setLoading(true);
    if (isUserSignedIn()) {
      getUserFirebase(userId)
        .then((profileFetched) => {
          setProfile(profileFetched);
          getPoVsByAuthorFirebase(profileFetched.id)
            .then((povsByAuthorFetched) => {
              setPovs(povsByAuthorFetched);
            })
            .catch((error) => {
              throw error;
            });
        })
        .catch((error) => {
          setError(error.message);
          setOpenErrorSnackBar(true);
        });
      // .finally(() => setLoading(false));
    } else {
      setError("Please sign-in");
      setOpenErrorSnackBar(true);
    }
  }, [userId]);

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
                alt={profile.exists ? profile.name.first : "Guest"}
                src={profile.exists && profile.displayPicture}
                sx={{
                  width: "100px",
                  height: "100px",
                }}
              />
            </Grid2>
            <Grid2 item xs={8}>
              <Typography variant="h2">
                {profile.exists
                  ? profile.name.first + " " + profile.name.last
                  : "Guest"}
              </Typography>
              <Typography variant="body2">
                {`Joined: ${new Date(
                  profile.exists && profile.createdAt
                ).toDateString()}`}
              </Typography>
            </Grid2>
          </Grid2>
          <Grid2 item xs={12} md={6}>
            <Typography variant="h4">About</Typography>
            <Typography variant="body1">
              {profile.exists && profile.description}
            </Typography>
            <List component={Stack} direction={"row"} spacing={1}>
              <ListItem>
                <ListItemIcon>
                  <EmailOutlined />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">
                      {profile.exists && profile.email}
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
                      {profile.exists && profile.tel}
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
            {!povs.empty ? (
              povs.docs.map((pov) => (
                <Grid2 item size={{ xs: 12, md: 6 }} key={pov.id}>
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
        <ErrorSnackbar
               openErrorSnackBar={openErrorSnackBar}
               handleCloseErrorSnackBar={handleCloseErrorSnackBar}
               error={error}
             />
      </Grid2>
    </MainCard>
  );
};
