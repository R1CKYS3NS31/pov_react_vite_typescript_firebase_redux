import {
  AddReactionOutlined,
  Comment,
  DeleteSweep,
  EditNote,
  Favorite,
  FavoriteBorder,
  FileCopy,
  LabelImportant,
  Public,
  Share,
} from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Avatar,
  Card,
  Snackbar,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DialogForm } from "../ui/dialog/DialogForm";
import { PoVFormFields } from "./PoVFormFields";
import { Link } from "react-router-dom";
import { formatNumber } from "../../../utils/formatNumber";
import { DialogDelete } from "../ui/dialog/DialogDelete";
import { DialogCommentPoV } from "../ui/dialog/DialogCommentPoV";
import { currentUser } from "../../../services/firebase/config/firebase-auth";
import { getUserFirebase } from "../../../services/firebase/controller/user-firebase";
import { ErrorSnackbar } from "../ui/snackbar/ErrorSnackbar";

export const PoV = ({ pov }) => {
  const [editedPoV, setEditedPoV] = useState(pov);
  const [speedActions, setSpeedActions] = useState([
    { icon: <FileCopy />, name: "Copy" },
    { icon: <Share />, name: "Share" },
    { icon: <Comment />, name: "Comment" },
  ]);

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

  useEffect(() => {
    const likeFound = pov.likes.find(
      (like) => userAccount && userAccount.uid === like
    );
    userAccount && userAccount.uid === pov.author.id
      ? setSpeedActions([
          {
            icon: <DeleteSweep />,
            name: "Delete",
          },
          { icon: <EditNote />, name: "Edit" },
          pov.published
            ? { icon: <Public />, name: "Unpublish" }
            : { icon: <Public />, name: "Publish" },
          // { icon: <FileCopy />, name: "Copy" },
          { icon: <Share />, name: "Share" },
          { icon: <Comment />, name: "Comment" },
          likeFound
            ? {
                icon: <Favorite />,
                name: `UnLike (${formatNumber(pov.likes.length)})`,
              }
            : {
                icon: <FavoriteBorder />,
                name: `Like (${formatNumber(pov.likes.length)})`,
              },
        ])
      : setSpeedActions([
          { icon: <FileCopy />, name: "Copy" },
          { icon: <Share />, name: "Share" },
          { icon: <Comment />, name: "Comment" },
          likeFound
            ? {
                icon: <Favorite />,
                name: `UnLike (${formatNumber(pov.likes.length)})`,
              }
            : {
                icon: <FavoriteBorder />,
                name: `Like (${formatNumber(pov.likes.length)})`,
              },
        ]);
  }, [userAccount, pov]);

  const [error, setError] = useState("");
  const [openPoVDialog, setOpenPoVDialog] = useState(false);
  const [openErrorSnackBar, setOpenErrorSnackBar] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openCommentPoVDialog, setOpenCommentPoVDialog] = useState(false);

  const handleCloseErrorSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorSnackBar(false);
  };

  const handleOpenCommentPoVDialog = () => {
    setOpenCommentPoVDialog(true);
  };

  const handleCloseCommentPoVDialog = () => {
    setOpenCommentPoVDialog(false);
  };

  const handleOpenPoVDialog = () => {
    setOpenPoVDialog(true);
  };

  const handleClosePoVDialog = () => {
    setOpenPoVDialog(false);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handlePublishPoV = async () => {
    let publish = !pov.published;
    await updatePoVHandle({ published: publish });
  };

  const handleLike = async () => {
    // const token = await auth.isAuthenticated();
    // if (token) {
    //   const likeFound = pov.likes.find((like) => like === userAccount.uid);
    //   // console.log("like found ", likeFound);
    //   if (likeFound) {
    //     // console.log("clicked to unlike");
    //     await unLikePoV(pov.id, token)
    //       .then((unLikedPoV) => {
    //         // console.log("like pov ", likedPoV);
    //         // dispatch pov edit
    //         if (unLikedPoV) {
    //           dispatch(editPoV(unLikedPoV));
    //         }
    //       })
    //       .catch((error) => {
    //         setError(error);
    //         setOpenErrorSnackBar(true);
    //       });
    //   } else {
    //     // console.log("clicked to like");
    //     await likePoV(pov.id, token)
    //       .then((likedPoV) => {
    //         // console.log("like pov ", likedPoV);
    //         // dispatch pov edit
    //         if (likedPoV) {
    //           dispatch(editPoV(likedPoV));
    //         }
    //       })
    //       .catch((error) => {
    //         setError(error);
    //         setOpenErrorSnackBar(true);
    //       });
    //   }
    // } else {
    //   setError("Please sign-in");
    //   setOpenErrorSnackBar(true);
    // }
  };

  const handleCommentPoV = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append("povId", pov.id);
    const formJson = Object.fromEntries(formData.entries());

    await commentPoVHandle(formJson);
  };

  const commentPoVHandle = async (povComment) => {
    // try {
    //   const token = await auth.isAuthenticated();
    //   if (token) {
    //     // console.log("comment ", await povComment);
    //     const povCommented = await commentPoV(await povComment, token);
    //     if (povCommented) {
    //       dispatch(editPoV(povCommented));
    //       // handleClosePoVDialog();
    //     }
    //   } else {
    //     setError("Please sign-in");
    //     setOpenErrorSnackBar(true);
    //     handleClosePoVDialog();
    //   }
    // } catch (error) {
    //   setError(error);
    //   setOpenErrorSnackBar(true);
    //   handleClosePoVDialog();
    // }
  };

  const handleClickAction = (action) => {
    switch (action) {
      case "Delete":
        handleOpenDeleteDialog();
        break;

      case "Edit":
        handleOpenPoVDialog();
        break;

      case "Publish":
        handlePublishPoV();
        break;

      case "Unpublish":
        handlePublishPoV();
        break;

      case "Share":
        console.log(action);
        break;

      case "Copy":
        console.log(action);
        break;

      case `Like (${formatNumber(pov.likes.length)})`:
        handleLike();
        break;

      case `UnLike (${formatNumber(pov.likes.length)})`:
        handleLike();
        break;

      case "Comment":
        handleOpenCommentPoVDialog();
        break;

      default:
        break;
    }
  };

  // handle pov changes in input fields
  const handlePoVInputChange = (event) => {
    const { name, value } = event.target;
    setEditedPoV({
      ...editedPoV,
      [name]: value,
    });
  };

  const handleSubmitPoVUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // const formJson = Object.fromEntries(formData.entries());
    await updatePoVHandle(formData);
  };

  const updatePoVHandle = async (povUpdate) => {
    // try {
    //   const token = await auth.isAuthenticated();
    //   if (token) {
    //     const poVUpdated = await updatePoV(pov.id, povUpdate, token);
    //     if (poVUpdated) {
    //       dispatch(editPoV(poVUpdated));
    //       handleClosePoVDialog();
    //     }
    //   } else {
    //     setError("Please sign-in");
    //     setOpenErrorSnackBar(true);
    //     handleClosePoVDialog();
    //   }
    // } catch (error) {
    //   setError(error);
    //   setOpenErrorSnackBar(true);
    //   handleClosePoVDialog();
    // }
  };

  const handlePoVDelete = async () => {
    // try {
    //   const token = await auth.isAuthenticated();
    //   if (token) {
    //     const poVDeleted = await deletePoV(pov.id, token);
    //     if (poVDeleted) {
    //       dispatch(removePov(poVDeleted.id));
    //       handleCloseDeleteDialog();
    //     }
    //   } else {
    //     setError("Please sign-in");
    //     setOpenErrorSnackBar(true);
    //     handleCloseDeleteDialog();
    //   }
    // } catch (error) {
    //   setError(error);
    //   setOpenErrorSnackBar(true);
    //   handleCloseDeleteDialog();
    // }
  };

  return (
    <Stack
      container
      direction={"column"}
      spacing={1}
      sx={{
        my: 1,
        // width: "100%",
      }}
    >
      <Card
        variant="elevation"
        elevation={2}
        sx={{
          borderTopRightRadius: "50px",
          display: "flex",
          padding: "5px",
          flexDirection: "column",
          borderRadius: "5px",
          // minHeight: "80vh",
        }}
      >
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"row"} spacing={1}>
            <Link to={`/profile/${pov.author.id}`}>
              <Avatar
                src={pov.author.displayPicture}
                alt={pov.author.name.first}
              />{" "}
            </Link>
            <Stack>
              <Typography
                variant="h4"
                color={"primary"}
                sx={{ overflowWrap: "anywhere", wordWrap: "break-word" }}
              >
                {pov.title.toUpperCase()}
              </Typography>
              <Typography
                variant="subtitle2"
                color={"secondary"}
                sx={{ overflowWrap: "anywhere", wordWrap: "break-word" }}
              >
                {`${pov.author.name.first} ${pov.author.name.last}`}
              </Typography>
            </Stack>
          </Stack>{" "}
          {pov.published && <Public fontSize="small" />}{" "}
        </Stack>

        {pov.points.split("\n").map((point, i) => (
          <Stack direction={"row"} key={i}>
            <LabelImportant sx={{ mr: 1 }} fontSize="small" />
            <Typography
              variant="p"
              sx={{ overflowWrap: "anywhere", wordWrap: "break-word" }}
            >
              {point}
            </Typography>
          </Stack>
        ))}
      </Card>
      <SpeedDial
        FabProps={{ size: "small" }}
        direction="left"
        ariaLabel="SpeedDial openIcon"
        sx={{
          // transform: "translateZ(0px)",
          position: "relative",
          bottom: "0px",
          right: "0px",
        }}
        icon={<SpeedDialIcon openIcon={<AddReactionOutlined />} />}
      >
        {speedActions.map((action) => (
          <SpeedDialAction
            FabProps={{ size: "small" }}
            onClick={() => handleClickAction(action.name)}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
      <DialogForm
        title={"Edit Your PoV"}
        text={"Fill in data to point your view"}
        open={openPoVDialog}
        handleOpen={handleOpenPoVDialog}
        handleClose={handleClosePoVDialog}
        handleSubmit={handleSubmitPoVUpdate}
        fields={
          <PoVFormFields
            editedPoV={editedPoV}
            handleInputChange={handlePoVInputChange}
          />
        }
      />

      {/* delete pov dialog */}
      <DialogDelete
        openDeleteDialog={openDeleteDialog}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
        handleDelete={handlePoVDelete}
        title={pov.title}
        content={`Are you sure to delete "${pov.title}" PoV?`}
      />

      {/* comment PoV */}
      <DialogCommentPoV
        open={openCommentPoVDialog}
        handleClose={handleCloseCommentPoVDialog}
        handleSubmit={handleCommentPoV}
        pov={pov}
      />
      <ErrorSnackbar
        openErrorSnackBar={openErrorSnackBar}
        handleCloseErrorSnackBar={handleCloseErrorSnackBar}
        error={error}
      />
    </Stack>
  );
};
