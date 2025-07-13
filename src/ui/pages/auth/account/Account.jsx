import { AddReaction, EmailOutlined, PhoneOutlined } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  Fab,
  Grid2,
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
  getPoVsByAuthorFirebase,
  savePoVFirebase,
} from "../../../../services/firebase/controller/pov-firebase";
import { ErrorSnackbar } from "../../../components/ui/snackbar/ErrorSnackbar";

export const Account = () => {
  const [error, setError] = useState("");
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
    if (isUserSignedIn) {
      getPoVsByAuthorFirebase(userAccount.uid)
        .then((authorsPoVsFetched) => {
          console.log("author's povs -", authorsPoVsFetched);
          
          setPovs(authorsPoVsFetched);
        })
        .catch((error) => {
          setError(error.message);
          setOpenErrorSnackBar(true);
        });
    } else {
      setError("Please sign-in");
      setOpenErrorSnackBar(true);
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
      console.log(error);
      setError(`*${error}`);
      setOpenErrorSnackBar(true);
      // alert(`Error creating PoV: ${error}`);
    }
  };

  const createPoVHandle = async (poV) => {
    if (isUserSignedIn()) {
      console.log("pov to save - ", poV);

      savePoVFirebase(poV)
        .then((savedFirebasePoV) => {
          console.log("new POV - ", savedFirebasePoV);
          if (savedFirebasePoV) {
            handleClosePoVDialog();
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
      <Grid2 container direction={"column"} spacing={2}>
        <Grid2 item xs={6} container spacing={2}>
          <Grid2 item xs={12} md={6} container spacing={2}>
            <Grid2 item xs={4}>
              <Avatar
                variant="rounded"
                alt={userAccount.exists ? userAccount.name.first : "Guest"}
                src={userAccount.displayPicture}
                sx={{
                  width: "100px",
                  height: "100px",
                }}
              />
            </Grid2>
            <Grid2 item xs={8}>
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
            </Grid2>
          </Grid2>
          <Grid2 item xs={12} md={6}>
            <Typography variant="h4">About</Typography>
            <Typography variant="body1">{userAccount.description}</Typography>
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
          </Grid2>
        </Grid2>
        <Divider />
        <Grid2 item xs={6}>
          <Typography variant="h4" justifySelf={"center"}>
            PoVs
          </Typography>
          <Grid2 container spacing={0.5}>
            {!povs.empty ? (
              povs.map((pov) => (
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
        <Fab
          variant="extended"
          sx={{
            backgroundColor: "#f3f3f3",
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
      </Grid2>
    </MainCard>
  );
};
