import { CommentOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Input,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

export const DialogCommentPoV = ({ open, handleClose, handleSubmit, pov }) => {
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
      <DialogTitle variant="h2">Comment</DialogTitle>
      <DialogContent>
        <DialogContentText mb={2}>
          Comment on '{pov.title}' PoV
        </DialogContentText>
        <Grid container spacing={1} direction={"row"}>
          <Grid
            item
            container
            direction={"column"}
            spacing={1}
            size={{ xs: 12 }}
          >
            <Grid item size={{ xs: 12 }}>
              {pov.comments && pov.comments.map((comment) => (
                // <Card>
                <ListItem sx={{ p: 0 }}>
                  <ListItemAvatar>
                    <Avatar
                      variant="circular"
                      alt={comment.postedBy.name.first}
                      src={comment.postedBy.displayPicture}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body1" noWrap>
                        {comment.postedBy.name.first +
                          " " +
                          comment.postedBy.name.last}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body1">{comment.comment}</Typography>
                    }
                  />
                </ListItem>
                // </Card>
              ))}
            </Grid>
            <Grid item spacing={1} size={{ xs: 12 }}>
              <Input // could use TextAreaAutoSize
                variant="standard"
                margin="dense"
                id="comment"
                name="comment"
                label="Comment on PoV"
                multiline
                maxRows={4}
                fullWidth
                autoComplete="comment"
                startAdornment={
                  <CommentOutlined sx={{ pr: 1 }} fontSize="small" />
                }
                // helperText="Comment on PoV"
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button type="reset" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit">Comment</Button>
      </DialogActions>
    </Dialog>
  );
};
