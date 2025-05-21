import React, { useState } from "react";
import {
  Autocomplete,
  Avatar,
  Button,
  Checkbox,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  ChangeCircleOutlined,
  CheckBoxOutlineBlank,
  CheckBoxOutlined,
} from "@mui/icons-material";

export const ChatFormFields = ({
  editedChat = {},
  handleInputChange,
  userAccount,
  selectedMembers,
  setSelectedMembers,
  users,
  handleChatDPChange,
}) => {
  return (
    <Grid2>
      <Grid2>
        <Stack direction={"row"}>
          <Avatar
            variant="rounded"
            alt={editedChat && editedChat.name}
            src={editedChat && editedChat.displayPicture}
            sx={{ width: "100px", height: "100px" }}
          />

          <label htmlFor="displayPicture">
            <Button
              variant="outlined"
              component={"span"}
              fullWidth
              color="inherit"
              size="large"
              disableRipple
              disableElevation
              sx={{
                background: "inherit",
                borderRadius: "50px",
                border: "none",
              }}
              startIcon={<ChangeCircleOutlined />}
            >
              Display Picture
            </Button>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleChatDPChange}
            style={{ display: "none" }}
            id="displayPicture"
            name="displayPicture"
          />
        </Stack>
      </Grid2>
      <Grid2 item size={{}}>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="name"
          type="name"
          value={editedChat && editedChat.name}
          onChange={handleInputChange}
          fullWidth
          variant="standard"
          helperText="Please enter chat group name"
        />
      </Grid2>
      <Grid2 item size={{}}>
        <TextField
          required
          variant="standard"
          margin="dense"
          id="description"
          name="description"
          label="Description"
          value={editedChat && editedChat.description}
          onChange={handleInputChange}
          multiline
          maxRows={4}
          fullWidth
          autoComplete="description"
          helperText="Please enter chat group description"
          // variant="standard"
        />
      </Grid2>
      <Grid2 item size={{}}>
        <Autocomplete
          multiple
          disableCloseOnSelect
          id="members"
          name="members"
          options={users}
          getOptionLabel={(user) =>
            user && user.name.first + " " + user.name.last
          }
          defaultValue={users.filter(
            (user) => user.uid=== userAccount.user.uid
          )}
          value={selectedMembers}
          onChange={(event, newValue) => {
            setSelectedMembers(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              id="members"
              name="members"
              label="Search to add members"
              placeholder="Members"
              fullWidth
              helperText="Please search for members"
              margin="dense"
            />
          )}
          renderOption={(props, option, { selected }) => (
            <li {...props} style={{ m: 0, p: 0 }} key={option.id}>
              <Checkbox
                icon={<CheckBoxOutlineBlank fontSize="small" />}
                checkedIcon={<CheckBoxOutlined fontSize="small" />}
                style={{ marginRight: 2 }}
                checked={selected}
              />
              <Typography>
                {option.name.first + " " + option.name.last}
              </Typography>
            </li>
          )}
        />
      </Grid2>
    </Grid2>
  );
};
