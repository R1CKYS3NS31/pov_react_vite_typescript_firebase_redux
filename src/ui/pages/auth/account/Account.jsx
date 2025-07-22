import { AddReaction, EmailOutlined, PhoneOutlined } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { MainCard } from "../../../components/ui/cards/MainCard";
import { useEffect, useState } from "react";
import { PoV } from "../../../components/pov/PoV";
import { DialogForm } from "../../../components/ui/dialog/DialogForm";
import { PoVFormFields } from "../../../components/pov/PoVFormFields";
import {
  currentUser,
  isUserSignedIn,
} from "../../../../services/firebase/config/firebase-auth";
import { getUserFirebase } from "../../../../services/firebase/controller/user-firebase";
import {
  getPoVFirebase,
  getPoVsByAuthorFirebase,
  savePoVFirebase,
} from "../../../../services/firebase/controller/pov-firebase";
import { ErrorSnackbar } from "../../../components/ui/snackbar/ErrorSnackbar";
import { LoadingLinear } from "../../../components/ui/data/LoadingLinear";
import { NoData } from "../../../components/ui/data/NoData";

export const Account = () => {
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [openPoVDialog, setOpenPoVDialog] = useState(false);
  const [openErrorSnackBar, setOpenErrorSnackBar] = useState(false);
  const [povs, setPovs] = useState({ size: 0, empty: true, docs: [] });
  const [userAccount, setUserAccount] = useState({
    exists: false,
    uid: "",
    name: { first: "", last: "" },
  });

  useEffect(() => {
    const user = currentUser();
    if (user && isUserSignedIn()) {
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

  useEffect(() => {
    setLoading(true);
    if (isUserSignedIn) {
      getPoVsByAuthorFirebase(userAccount.uid)
        .then((authorsPoVsFetched) => {
          setPovs(authorsPoVsFetched);
        })
        .catch((error) => {
          setError(error.message);
          setOpenErrorSnackBar(true);
        })
        .finally(() => setLoading(false));
    } else {
      setError("Please sign-in");
      setOpenErrorSnackBar(true);
      setLoading(false);
    }
  }, [userAccount]);

  const handleCloseErrorSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorSnackBar(false);
  };

  const handleOpenPoVDialog = () => {
    setOpenPoVDialog(true);
  };

  const handleClosePoVDialog = () => {
    setOpenPoVDialog(false);
  };

  //  submit
  const handleSubmitPoV = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());

      let newPov;

      if (isUserSignedIn() && userAccount.uid) {
        newPov = {
          // id: new Date(),
          title: formJson.title,
          points: formJson.points,
          author: userAccount.uid,
        };

        await createPoVHandle(newPov);
        handleClosePoVDialog();
      } else {
        setError("Please sign-in");
        setOpenErrorSnackBar(true);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
      setOpenErrorSnackBar(true);
    }
  };

  const createPoVHandle = async (poV) => {
    if (isUserSignedIn()) {
      await savePoVFirebase(poV)
        .then((savedFirebasePoV) => {
          if (savedFirebasePoV) {
            getPoVFirebase(savedFirebasePoV.id)
              .then((firebasePoV) => {
                setPovs((prev) => ({
                  size: prev.size + 1,
                  empty: false,
                  docs: [...prev.docs, firebasePoV],
                }));
                handleClosePoVDialog();
              })
              .catch((error) => {
                throw error;
              });
          }
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
          setOpenErrorSnackBar(true);
        });
    } else {
      setError("Please sign-in");
      setOpenErrorSnackBar(true);
    }
  };

  return (
    <MainCard title={"Account"} sx={{ minHeight: "100vh" }}>
      <Grid container direction={"column"} spacing={2}>
        <Grid item container spacing={2}>
          <Grid item container spacing={1}>
            <Grid item>
              <Avatar
                variant="rounded"
                alt={userAccount.exists ? userAccount.name.first : "Guest"}
                src={userAccount.displayPicture}
                sx={{
                  width: "100px",
                  height: "100px",
                }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h2">
                {userAccount.exists
                  ? userAccount.name.first + " " + userAccount.name.last
                  : "Guest"}
              </Typography>
              <Typography variant="body2">
                {`Joined: ${
                  userAccount.exists &&
                  userAccount.createdAt.toDate().toDateString()
                }`}
              </Typography>
            </Grid>
          </Grid>
          <Grid item component={Stack} direction={"column"}>
            <Stack direction={"column"}>
              <Typography variant="h4">About</Typography>
              <Typography variant="body1">{userAccount.description}</Typography>
            </Stack>
            <Stack direction={"column"}>
              <List component={Stack} direction={"row"} spacing={1}>
                <ListItem>
                  <ListItemIcon>
                    <EmailOutlined />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1">
                        {userAccount.email}
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
                        {userAccount.tel}
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Stack>
          </Grid>
        </Grid>
        <Divider />
        <Grid item container direction={"column"}>
          <Grid
            item
            component={Typography}
            variant="h3"
            alignSelf={"center"}
          >
            PoVs
          </Grid>
          <Grid item container spacing={1} justifyContent={"center"}>
            {loading ? (
              <LoadingLinear message="Loading PoVs..." />
            ) : !povs.empty ? (
              povs.docs.map((pov) => (
                <Grid item size={{ xs: 12, md: 6 }} key={pov.id}>
                  <PoV poV={pov} />
                </Grid>
              ))
            ) : (
               <Grid item>
                         <NoData message="No PoVs available yet!" />
                       </Grid>
            )}
          </Grid>
        </Grid>
        <Fab
          variant="extended"
          sx={{
            bgColor: "primary.main",
            right: "5vh",
            bottom: "10vh",
            position: "fixed",
          }}
          onClick={handleOpenPoVDialog}
        >
          <AddReaction />
          <Typography variant="subtitle1" sx={{ pl: 1 }}>
            New PoV
          </Typography>
        </Fab>
        <DialogForm
          title={"Point Your New PoV"}
          text={"Fill in data to point your view"}
          open={openPoVDialog}
          handleOpen={handleOpenPoVDialog}
          handleClose={handleClosePoVDialog}
          handleSubmit={handleSubmitPoV}
          fields={<PoVFormFields />} // todo: implement the dependencies
        />
        <ErrorSnackbar
          openErrorSnackBar={openErrorSnackBar}
          handleCloseErrorSnackBar={handleCloseErrorSnackBar}
          error={error}
        />
      </Grid>
    </MainCard>
  );
};
