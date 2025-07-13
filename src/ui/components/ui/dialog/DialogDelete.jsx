import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import { forwardRef } from "react";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const DialogDelete = ({
  openDeleteDialog,
  handleCloseDeleteDialog,
  handleDelete,
  title,
  content,
}) => {
  return (
    <Dialog
      open={openDeleteDialog}
      slots={{
        transition: Transition,
      }}
      keepMounted
      onClose={handleCloseDeleteDialog}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        <Typography variant="inherit"> Delete {title}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={handleCloseDeleteDialog}
          color="error"
        >
          Cancel
        </Button>
        <Button variant="outlined" onClick={handleDelete} color="success">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
