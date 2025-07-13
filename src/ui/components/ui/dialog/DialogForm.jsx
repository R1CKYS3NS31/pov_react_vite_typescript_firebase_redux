import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export const DialogForm = ({
  open,
  handleClose,
  handleSubmit,
  title,
  text,
  fields,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: handleSubmit,
        },
      }}
    >
      <DialogTitle variant="h2">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText mb={2}>{text}</DialogContentText>
        {fields}
      </DialogContent>
      <DialogActions>
        <Button type="reset" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};
