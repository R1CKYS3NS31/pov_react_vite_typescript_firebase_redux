import { useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
  Avatar,
  Button,
  Divider,
  Grid2,
  IconButton,
  Input,
  ListSubheader,
  Menu,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../../utils/auth_helper";
import {
  createChat,
  deleteChat,
  fetchChatsByMember,
  updateChat,
} from "../../../services/api/chat/api-chat";
import {
  addChat,
  editChat,
  removeChat,
  setChats,
} from "../../../services/redux/slices/chat/chatSlice";
import { ChatBubbleOutlineOutlined, Info, Send } from "@mui/icons-material";
import { DialogForm } from "../../components/ui/dialog/DialogForm";
import { fetchUsers } from "../../../services/api/user/api-user";
import { setUsers } from "../../../services/redux/slices/user/userSlice";
import {
  createMessage,
  fetchMessagesByChat,
} from "../../../services/api/message/api-message";
import {
  addMessage,
  setMessages,
} from "../../../services/redux/slices/message/messageSlice";
import { ChatFormFields } from "../../components/chat/ChatFormFields";
import { DialogDelete } from "../../components/ui/dialog/DialogDelete";

export const Chat = () => {
  const dispatch = useDispatch();
  const userAccount = useSelector((state) => state.userAccount);
  const users = useSelector((state) => state.users);
  const chats = useSelector((state) => state.chats);
  const messages = useSelector((state) => state.messages);

  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedChat, setSelectedChat] = useState(undefined);
  const [editedChat, setEditedChat] = useState(selectedChat);

  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openChatDialog, setOpenChatDialog] = useState(false);
  const [openEditChatDialog, setOpenEditChatDialog] = useState(false);
  const [openErrorSnackBar, setOpenErrorSnackBar] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [anchorElChatMenu, setAnchorElChatMenu] = useState(undefined);
  const openChatMenu = Boolean(anchorElChatMenu);
  const handleClickChatMenu = (event) => {
    setAnchorElChatMenu(event.currentTarget);
  };

  useEffect(() => {
    // setLoading(true);
    // fetch chats by member
    auth.isAuthenticated().then((token) => {
      if (token) {
        fetchChatsByMember(token)
          .then((memberChatsFetched) => {
            dispatch(setChats(memberChatsFetched));
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

      //  fetch users
      fetchUsers()
        .then((usersFetched) => {
          dispatch(setUsers(usersFetched));
        })
        .catch((error) => {
          setError(error);
          setOpenErrorSnackBar(true);
        });
    });
  }, [dispatch]);

  useEffect(() => {
    if (selectedChat) {
      auth.isAuthenticated().then((token) => {
        if (token) {
          fetchMessagesByChat(selectedChat.id, token)
            .then((messagesFetched) => {
              // console.log("messages by chat", messagesFirebase); // remove log
              dispatch(setMessages(messagesFetched));
            })
            .catch((error) => {
              setError(error);
              setOpenErrorSnackBar(true);
            });
        } else {
          setError("Please sign-in");
          setOpenErrorSnackBar(true);
        }
      });
    }
  }, [selectedChat, dispatch]);

  const handleCloseErrorSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorSnackBar(false);
  };

  const handleOpenChatDialog = () => {
    setOpenChatDialog(true);
  };

  const handleCloseChatDialog = () => {
    setOpenChatDialog(false);
  };

  const handleOpenEditChatDialog = () => {
    setEditedChat({
      ...selectedChat,
      members: selectedChat.members.flatMap((member) => member.id),
      createdBy: selectedChat.createdBy.id,
    });
    setOpenEditChatDialog(true);
  };
  // [].flatMap()
  const handleCloseEditChatDialog = () => {
    setOpenEditChatDialog(false);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  //  submit chat
  const handleSubmitChat = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());

      // console.log(event.currentTarget.displayPicture.files[0]);

      const file = await event.currentTarget.displayPicture.files[0];
      const chatDp = new FormData();

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setEditedChat({ ...editedChat, displayPicture: reader.result });
        };
        reader.readAsDataURL(file);

        console.log("dp - ", file);

        chatDp.append("displayPicture", file);
        // const chatDp = {
        //   displayPicture: file,
        // };
      }

      let newChat;
      const token = await auth.isAuthenticated();
      if (token) {
        newChat = {
          name: formJson.name.trim(),
          // createdBy: userAccount.user.uid, // not necccessary
          members: [...selectedMembers, userAccount.user.uid],
          description: formJson.description.trim(),
          displayPicture: file,
        };

        console.log("new chat - ", newChat);

        await createChatHandle(newChat, chatDp);
        handleCloseChatDialog();
      } else {
        setError("Please sign-in");
        setOpenErrorSnackBar(true);
      }
    } catch (error) {
      console.log(error);
      setError(`*${error}`);
      setOpenErrorSnackBar(true);
      // alert(`Error creating Chat: ${error}`);
    }
  };

  const createChatHandle = async (chat, chatDp = undefined) => {
    try {
      const token = await auth.isAuthenticated();
      if (token) {
        const chatCreated = await createChat(chat, token);
        if (chatCreated) {
          dispatch(addChat(chatCreated));
          if (chatDp) {
            // pov has bugs: dp not updated
            setSelectedChat(chatCreated);
            console.log("chat dp ", chatDp);
            await updateChatHandle(chatDp); // not called
          }
          handleCloseChatDialog();
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

  //  submit message
  const handleSubmitMessage = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());

      let newMessage;
      const token = await auth.isAuthenticated();
      if (token) {
        if (formJson.message.trim() !== "") {
          newMessage = {
            // chat:formJson.selectedChat,
            text: formJson.message.trim(),
            sentAt: new Date().toISOString(),
            reciever: selectedChat.members.filter(
              // todo: private receivers in a chat
              (member) => member !== userAccount.user.uid
            ),

            chat: selectedChat,
          };

          await createMessageHandle(newMessage);
          // todo clear form data
        }
      } else {
        setError("Please sign-in");
        setOpenErrorSnackBar(true);
      }
    } catch (error) {
      console.log(error);
      setError(`*${error}`);
      setOpenErrorSnackBar(true);
      // alert(`Error creating Message: ${error}`);
    }
  };

  const createMessageHandle = async (message) => {
    try {
      const token = await auth.isAuthenticated();
      if (token) {
        const messageCreated = await createMessage(message, token);
        if (messageCreated) {
          dispatch(addMessage(messageCreated));
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

  const handleClickChatMenuItem = async (menuItem) => {
    switch (menuItem) {
      case "View Chat":
        console.log(menuItem);
        break;

      case "Edit Chat":
        handleOpenEditChatDialog();
        break;

      case "Delete Chat":
        handleOpenDeleteDialog();
        break;

      case "Report Chat":
        console.log(menuItem);
        break;

      default:
        break;
    }
    setAnchorElChatMenu(undefined);
  };

  // handle chat changes in input fields
  const handleChatInputChange = (event) => {
    const { name, value } = event.target;
    setEditedChat({
      ...editedChat,
      [name]: value,
    });
  };

  // Function to handle file input change
  const handleChatDPChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedChat({ ...editedChat, displayPictureicture: reader.result });
    };
    reader.readAsDataURL(file);

    const chat = new FormData();
    chat.append("displayPicture", file);
    if (selectedChat) {
      await updateChatHandle(chat);
    }
  };

  const handleSubmitChatUpdate = async (event) => {
    event.preventDefault();
    // const formData = new FormData(event.currentTarget);
    // const formJson = Object.fromEntries(formData.entries());
    // console.log({ ...formJson, ...editedChat });

    if (editedChat) {
      await updateChatHandle(editedChat);
    }
  };

  const updateChatHandle = async (chatUpdate) => {
    try {
      const token = await auth.isAuthenticated();
      if (token) {
        if (selectedChat) {
          const chatUpdated = await updateChat(
            selectedChat.id,
            chatUpdate,
            token
          );
          if (chatUpdated) {
            dispatch(editChat(chatUpdated));
            setSelectedChat(chatUpdated);
            handleCloseEditChatDialog();
          }
        }
      } else {
        setError("Please sign-in");
        setOpenErrorSnackBar(true);
        handleCloseEditChatDialog();
      }
    } catch (error) {
      console.log(error);

      // setError(error);
      setOpenErrorSnackBar(true);
      handleCloseEditChatDialog();
    }
  };

  const handleChatDelete = async () => {
    try {
      const token = await auth.isAuthenticated();
      if (token) {
        await deleteChat(selectedChat.id, token)
          .then((chatDeleted) => {
            if (chatDeleted) {
              dispatch(removeChat(chatDeleted.id));
              setSelectedChat(undefined);
              handleCloseDeleteDialog();
            }
          })
          .catch((error) => {
            setError(error);
            setOpenErrorSnackBar(true);
            handleCloseDeleteDialog();
          });
      } else {
        setError("Please sign-in");
        setOpenErrorSnackBar(true);
        handleCloseDeleteDialog();
      }
    } catch (error) {}
  };
  // const menuItems = [ // todo
  //   { category: "Manage Chat", item: "View Chat" },
  //   { category: "Manage Chat", item: "Edit Chat" },
  //   { category: "Manage Chat", item: "Delete Chat" },
  //   { category: "Others", item: "Invite member" },
  // ];
  return (
    <Grid2 container direction={"row"} sx={{ bgcolor: "background.default" }}>
      <Grid2
        item
        container
        direction={"column"}
        spacing={1}
        size={{ xs: 2, md: 3, lg: 4 }}
        px={"8px"}
        // bgcolor={"secondary.main"} // pov has bugs
      >
        <Grid2 item>
          <IconButton onClick={handleOpenChatDialog}>
            <ChatBubbleOutlineOutlined />
          </IconButton>
        </Grid2>
        <Grid2
          item
          container
          sx={{ overflowY: "auto" }}
          height="75vh"
          paddingBottom="16px"
          alignContent={"start"}
        >
          {chats ? (
            chats.map((chat, i) => (
              <Grid2
                container
                direction={"row"}
                // justifyContent={"center"}
                component={Stack}
                spacing={1}
                selected={selectedChat && selectedChat.id === chat.id}
                key={i} // chat.id
                onClick={() => {
                  setSelectedChat(chat);
                }}
                alignContent={"start"}
              >
                <Grid2 item>
                  <Avatar alt={chat.name} src={chat.displayPicture} />
                </Grid2>
                <Grid2 item component={Stack} direction={"column"}>
                  <Grid2
                    item
                    component={Typography}
                    textTransform={"capitalize"}
                    sx={{
                      overflowX: "clip",
                      blockOverflow: "ellipsis",
                      textOverflow: "ellipsis",
                      wordWrap: "break-word",
                      width: "15vw",
                    }}
                    noWrap
                  >
                    {chat.name}
                  </Grid2>
                  <Grid2
                    component={Typography}
                    variant="body2"
                    sx={{
                      overflowX: "clip",
                      blockOverflow: "ellipsis",
                      textOverflow: "ellipsis",
                      wordWrap: "break-word",
                      width: "15vw",
                    }}
                    noWrap
                  >
                    Created by {chat.createdBy.name.first}
                    {chat.createdBy.name.last}
                  </Grid2>
                </Grid2>
              </Grid2>
            ))
          ) : (
            <Typography
              sx={{
                overflow: "clip",
                blockOverflow: "ellipsis",
                textOverflow: "ellipsis",
              }}
            >
              Create new Conversation
            </Typography>
          )}
        </Grid2>
      </Grid2>
      <Grid2
        item
        component={Divider}
        size={{ xs: 1 }}
        variant="inset"
        orientation="vertical"
        // width={"16px"}
        height={"75vh"}
        ml={0}
      />
      {selectedChat ? (
        <Grid2 item container direction="column" size={{ xs: 9, md: 8, lg: 7 }}>
          <Grid2
            container
            component={Toolbar}
            item
            size={{ xs: 12 }}
            bgcolor={"secondary.main"}
          >
            <Grid2
              container
              component={Stack}
              item
              size={{ xs: 12 }}
              // component={Stack}
              // width={"100%"}
              spacing={1}
              justifyContent={"space-between"}
              direction="row"
            >
              <Grid2
                item
                size={{ xs: 2 }}
                component={Avatar}
                variant="rounded"
                sizes="small"
                src={selectedChat.displayPicture}
                alt={selectedChat && selectedChat.name}
              />
              <Grid2 item size={{ xs: 9 }} component={Stack} spacing={1}>
                <Typography
                  variant="h4"
                  sx={{
                    overflowX: "clip",
                    blockOverflow: "ellipsis",
                    textOverflow: "ellipsis",
                    wordWrap: "break-word",
                    width: "40vw",
                  }}
                  noWrap
                >
                  {selectedChat.name}
                </Typography>
                <Typography
                  variant="caption"
                  noWrap
                  sx={{
                    overflowX: "clip",
                    blockOverflow: "ellipsis",
                    textOverflow: "ellipsis",
                    wordWrap: "break-word",
                    width: "40vw",
                  }}
                >
                  {selectedChat.description}
                </Typography>
              </Grid2>
              <Grid2 item size={{ xs: 1 }} component={IconButton}>
                <Info
                  id="basic-button"
                  aria-controls={openChatMenu ? "grouped-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openChatMenu ? "true" : undefined}
                  onClick={handleClickChatMenu}
                />
              </Grid2>
            </Grid2>
          </Grid2>
          <Grid2 item container direction={"column"} size={{ xs: 12 }}>
            <Stack justifyContent={"space-between"}>
              <Grid2
                item
                sx={{
                  overflowY: "auto",
                  height: "75vh",
                  px: "8px",
                  py: "10px",
                  bgcolor: "primary.main",
                }}
              >
                {messages &&
                  messages
                    .filter((message) => message.chat.id === selectedChat.id)
                    .map((message, i) => (
                      <Paper
                        key={i} // message.id
                        sx={{
                          p: "8px",
                          mb: "8px",
                          mx: "8px",
                          borderRadius: "8px",
                          maxWidth: "75%",
                          bgcolor:
                            message.sender.uid === userAccount.user.uid
                              ? "primary.light"
                              : "secondary.dark", // if sender === auth user
                          color:
                            message.sender.uid === userAccount.user.uid
                              ? "primary.contrastText"
                              : "secondary.contrastText",
                          ml:
                            message.sender.uid === userAccount.user.uid
                              ? "auto"
                              : "0",
                        }}
                      >
                        <Stack direction={"column"} spacing={1}>
                          {message.sender.uid === userAccount.user.uid ? (
                            <Typography variant="overline" noWrap>
                              You
                            </Typography>
                          ) : (
                            <Stack
                              direction={"row"}
                              spacing={1}
                              justifyContent={"flex-start"}
                              alignItems={"center"}
                            >
                              <Avatar src={message.sender.displayPicture} />
                              <Typography variant="overline" noWrap>
                                {message.sender.name.first +
                                  " " +
                                  message.sender.name.last}
                              </Typography>
                            </Stack>
                          )}
                          <Typography variant="body1" whiteSpace="pre-line">
                            {message.text}
                          </Typography>
                        </Stack>
                      </Paper>
                    ))}
              </Grid2>

              <Grid2
                item
                size={{ xs: 12 }}
                container
                // spacing={2}
                direction={"row"}
                elevation={3}
                component={"form"}
                onSubmit={handleSubmitMessage}
                sx={{
                  // right: 0,
                  // left:0,
                  bottom: "7vh",
                  position: "fixed",
                  // width: "100%",
                  px: "16px",
                }}
              >
                <Grid2
                  item
                  component={Input}
                  size={{ xs: 7, md: 6, lg: 4 }}
                  maxRows={4}
                  // size="small"
                  multiline
                  autoFocus
                  label="Type a message..."
                  name="message"
                  id="message"
                  variant="outlined"
                  fullWidth
                  color="secondary.dark"
                  // value={newText}
                  // onChange={(e) => setNewText(e.target.value)}
                ></Grid2>
                <Grid2
                  component={IconButton}
                  size={{ xs: 2, md: 2, lg: 2 }}
                  // disabled={loadingSend}
                  type="submit"
                  color="secondary.dark"
                >
                  <Send />
                </Grid2>
              </Grid2>
            </Stack>
          </Grid2>
        </Grid2>
      ) : (
        <Grid2
          item
          container
          direction="column"
          size={{ xs: 9, md: 8, lg: 7 }}
          component={Stack}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            variant="overline"
            justifySelf={"center"}
            color="secondary"
          >
            start a message to create Conversation
          </Typography>
          <Button
            startIcon={<ChatBubbleOutlineOutlined />}
            variant="text"
            sx={{
              backgroundColor: "secondary.main",
              color: "secondary.contrastText",
            }}
            onClick={handleOpenChatDialog}
          >
            New Chat
          </Button>
        </Grid2>
      )}

      {/* <Fab
        size="small"
        variant="extended"
        sx={{
          backgroundColor: "transparent",
          right: "3vh",
          bottom: "10vh",
          position: "fixed",
        }}
        onClick={handleOpenChatDialog}
      >
        <ChatBubbleOutlineOutlined fontSize="small" />
        <Typography variant="subtitle1" sx={{ pl: 1 }}>
          New Chat
        </Typography>
      </Fab> */}
      <DialogForm
        title={"Create a New Conversation"}
        text={"Fill in data to start chatting."}
        open={openChatDialog}
        handleOpen={handleOpenChatDialog}
        handleClose={handleCloseChatDialog}
        handleSubmit={handleSubmitChat}
        fields={
          <ChatFormFields
            editedChat={editedChat}
            handleInputChange={handleChatInputChange}
            userAccount={userAccount}
            selectedMembers={selectedMembers}
            setSelectedMembers={setSelectedMembers}
            users={users}
            handleChatDPChange={handleChatDPChange}
          />
        } // todo: implement the dependencies
      />

      {/* edit chat */}
      <DialogForm
        title={"Edit Your Chat"}
        text={"Fill in data to point your view"}
        open={openEditChatDialog}
        handleOpen={handleOpenEditChatDialog}
        handleClose={handleCloseEditChatDialog}
        handleSubmit={handleSubmitChatUpdate}
        fields={
          <ChatFormFields
            editedChat={editedChat}
            handleInputChange={handleChatInputChange}
            userAccount={userAccount}
            selectedMembers={selectedMembers}
            setSelectedMembers={setSelectedMembers}
            users={users}
            handleChatDPChange={handleChatDPChange}
          />
        }
      />

      {/* delete chat dialog */}
      <DialogDelete
        openDeleteDialog={openDeleteDialog}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
        handleDelete={handleChatDelete}
        title={selectedChat && selectedChat.name}
        content={`Are you sure to delete "${
          selectedChat && selectedChat.name
        }" Chat?`}
      />
      <Menu
        id="grouped-menu"
        anchorEl={anchorElChatMenu}
        open={openChatMenu}
        onClose={handleClickChatMenuItem}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <ListSubheader>Manage Chat</ListSubheader>
        <MenuItem onClick={() => handleClickChatMenuItem("Edit Chat")}>
          Edit Chat
        </MenuItem>
        <MenuItem onClick={() => handleClickChatMenuItem("Delete Chat")}>
          Delete Chat
        </MenuItem>
        <ListSubheader>Others</ListSubheader>
        <MenuItem onClick={() => handleClickChatMenuItem("View Chat")}>
          View Chat
        </MenuItem>
        <MenuItem onClick={() => handleClickChatMenuItem("Report Chat")}>
          Report Chat
        </MenuItem>
      </Menu>

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
  );
};
