import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import type { PoV, PoVComment } from "../../../models/pov.model";
import type { User } from "../../../models/user.model";

interface DialogCommentPoVProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleUncomment: (povId: string, commentId: string | number) => void;
  pov: PoV;
  account: User;
  loading?: boolean;
}

export const DialogCommentPoV: React.FC<DialogCommentPoVProps> = ({
  open,
  handleClose,
  handleSubmit,
  handleUncomment,
  pov,
  account,
  loading = false,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 800 }}>Comments</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {pov?.comments?.map((comment: PoVComment) => (
            <Box key={comment.id}>
              <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
                <Avatar src={comment.postedBy?.displayPicture} sx={{ width: 32, height: 32 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {comment.postedBy?.name?.full || "Unknown User"}
                  </Typography>
                  <Typography variant="body2">{comment.comment}</Typography>
                </Box>
                {account?.id === comment.postedBy?.id && (
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleUncomment(pov.id, comment.id)}
                  >
                    <DeleteOutlineRounded fontSize="small" />
                  </IconButton>
                )}
              </Stack>
              <Divider sx={{ mt: 1.5 }} />
            </Box>
          ))}

          {(!pov?.comments || pov.comments.length === 0) && (
            <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2 }}>
              No comments yet. Be the first to share your perspective!
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ pt: 2 }}>
            <TextField
              fullWidth
              name="comment"
              placeholder="Add a comment..."
              multiline
              rows={2}
              required
              variant="outlined"
              size="small"
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
              <Button type="submit" variant="contained" disabled={loading} sx={{ fontWeight: 700 }}>
                Post Comment
              </Button>
            </Box>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
