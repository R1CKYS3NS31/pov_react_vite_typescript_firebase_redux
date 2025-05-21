import { CommentOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid2,
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
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle variant="h2">Comment</DialogTitle>
      <DialogContent>
        <DialogContentText mb={2}>
          Comment on '{pov.title}' PoV
        </DialogContentText>
        <Grid2 container spacing={1} direction={"row"}>
          {/* <Grid2 item size={{ xs: 12, lg: 6 }}>
            <PoV pov={pov} />
          </Grid2> */}
          {/* <Grid2 item size={{ xs: 1 }}>
            <Divider variant="middle" orientation="vertical" title="PoV" />
          </Grid2> */}
          <Grid2
            item
            container
            direction={"column"}
            spacing={1}
            size={{ xs: 12 }}
          >
            <Grid2 item size={{ xs: 12 }}>
              {pov.comments.map((comment) => (
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
            </Grid2>
            <Grid2 item spacing={1} size={{ xs: 12 }}>
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
            </Grid2>
          </Grid2>
        </Grid2>
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
