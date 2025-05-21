import { Grid2, TextField } from "@mui/material";
import React from "react";

export const PoVFormFields = ({ editedPoV = {}, handleInputChange }) => {
  return (
    <Grid2 container spacing={1}>
       {/* <Grid2 item xs ={6}>
        <Avatar
          variant="rounded"
          alt={editedPoV.title}
          src={editedPoV.displayPicture}
          sx={{ width: "150px", height: "150px" }}
        />
        <input
          name="displayPicture"
          id="displayPicture"
          // value={editedPoV.displayPicture}
          // required
          type="file"
          autoFocus
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleInputChange}
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
            startIcon={<FileUpload />}
          >
            PoV attachment
          </Button>
        </label>
      </Grid2> */}
      <Grid2 item size={{xs:8}}>
        <TextField
          autoFocus
          required
          margin="dense"
          id="title"
          name="title"
          label="Title"
          value={editedPoV.title}
          onChange={handleInputChange}
          type="text"
          fullWidth
          variant="standard"
          helperText="Product name"
        />
      </Grid2>

      <Grid2 item size={{xs:12}}>
        <TextField // could use TextAreaAutoSize
          required
          variant="standard"
          margin="dense"
          id="points"
          name="points"
          label="Point"
          value={editedPoV.points}
          onChange={handleInputChange}
          multiline
          maxRows={4}
          fullWidth
          autoComplete="points"
          helperText="Point of View"
        />
      </Grid2>
    </Grid2>
  );
};
