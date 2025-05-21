import { AddReaction, EmailOutlined, PhoneOutlined } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Avatar,
  Divider,
  Fab,
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
import { MainCard } from "../../../components/ui/cards/MainCard";
import { useEffect, useState } from "react";
import {
  addPoV,
  setPovs,
} from "../../../../services/redux/slices/pov/povSlice";
import {
  createPoV,
  fetchPovsByOwner,
} from "../../../../services/api/pov/api-pov";
import { PoV } from "../../../components/pov/PoV";
import { auth } from "../../../../utils/auth_helper";
import { DialogForm } from "../../../components/ui/dialog/DialogForm";
import { PoVFormFields } from "../../../components/pov/PoVFormFields";

export const Account = () => {
  const dispatch = useDispatch();
  const userAccount = useSelector((state) => state.userAccount.user);
  const povs = useSelector((state) => state.povs);

  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openPoVDialog, setOpenPoVDialog] = useState(false);
  const [openErrorSnackBar, setOpenErrorSnackBar] = useState(false);

  useEffect(() => {
    // setLoading(true);
    auth.isAuthenticated().then((token) => {
      if (token) {
        fetchPovsByOwner(token)
          .then((ownersPoVsFetched) => {
            dispatch(setPovs(ownersPoVsFetched));
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
  }, [dispatch]);

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
      const token = await auth.isAuthenticated();
      if (token && userAccount.id) {
        newPov = {
          // id: new Date(),
          title: formJson.title,
          points: formJson.points,
          author: userAccount.id,
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
    try {
      const token = await auth.isAuthenticated();
      if (token) {
        const poVCreated = await createPoV(poV, token);
        if (poVCreated) {
          dispatch(addPoV(poVCreated));
          handleClosePoVDialog();
        }
      } else {
        setError("Please sign-in");
        setOpenErrorSnackBar(true);
      }
    } catch (error) {
      setError(error);
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
                alt={userAccount ? userAccount.name.first : "Guest"}
                src={userAccount.displayPicture}
                sx={{
                  width: "100px",
                  height: "100px",
                }}
              />
            </Grid2>
            <Grid2 item xs={8}>
              <Typography variant="h2">
                {userAccount
                  ? userAccount.name.first + " " + userAccount.name.last
                  : "Guest"}
              </Typography>
              <Typography variant="body2">
                {`Joined: ${new Date(userAccount.createdAt).toDateString()}`}
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
            {povs ? (
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
