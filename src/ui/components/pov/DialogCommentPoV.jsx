import CommentRounded from "@mui/icons-material/CommentRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
  IconButton,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

export const DialogCommentPoV = ({ open, handleClose, handleSubmit, handleUncomment, pov, account, loading }) => {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : handleClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          component: "form",
          onSubmit: handleSubmit,
          sx: { 
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden'
          }
        },
      }}
    >
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            bgcolor: (theme) => alpha(theme.palette.background.paper, 0.7),
            backdropFilter: 'blur(4px)',
            transition: 'all 0.3s ease-in-out'
          }}
        >
          <CircularProgress size={40} thickness={4} />
        </Box>
      )}

      <DialogTitle variant="h5" fontWeight={800} sx={{ pb: 1 }}>
        Comments
      </DialogTitle>
      
      <DialogContent 
        sx={{ 
          p: 0, 
          display: 'flex', 
          flexDirection: 'column',
          filter: loading ? 'blur(2px)' : 'none',
          pointerEvents: loading ? 'none' : 'auto',
          transition: 'filter 0.3s ease-in-out'
        }}
      >
        <Box sx={{ px: 3, pb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Join the conversation on "{pov?.title}"
          </Typography>
        </Box>
        
        <List sx={{ px: 2, flexGrow: 1, maxHeight: 400, overflow: 'auto', bgcolor: 'background.default' }}>
          {pov?.comments?.length > 0 ? (
            pov.comments.map((comment, index) => (
              <ListItem 
                key={comment.id || index}
                alignItems="flex-start"
                sx={{ mb: 2, px: 1 }}
                secondaryAction={
                  account?.id === comment?.postedBy?.id ? (
                    <IconButton 
                      edge="end" 
                      aria-label="delete" 
                      color="error"
                      onClick={() => handleUncomment(pov.id, comment.id)}
                      size="small"
                      disabled={loading}
                      sx={{ opacity: 0.6, '&:hover': { opacity: 1 } }}
                    >
                      <DeleteOutlineRounded fontSize="small" />
                    </IconButton>
                  ) : null
                }
              >
                <ListItemAvatar sx={{ mt: 0.5 }}>
                  <Avatar
                    alt={comment?.postedBy?.name?.first || "User"}
                    src={comment?.postedBy?.displayPicture}
                    sx={{ width: 36, height: 36 }}
                  />
                </ListItemAvatar>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 1.5, 
                    borderRadius: 3, 
                    borderTopLeftRadius: 0,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                    width: '100%',
                    mr: account?.id === comment?.postedBy?.id ? 5 : 0
                  }}
                >
                  <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 0.5 }}>
                    {comment?.postedBy?.name?.first} {comment?.postedBy?.name?.last}
                  </Typography>
                  <Typography variant="body2" color="text.primary" sx={{ whiteSpace: 'pre-wrap' }}>
                    {comment.comment}
                  </Typography>
                </Paper>
              </ListItem>
            ))
          ) : (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                No comments yet. Be the first to share your thoughts!
              </Typography>
            </Box>
          )}
        </List>

        <Box sx={{ p: 3, bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
          <Input 
            variant="standard"
            margin="dense"
            id="comment"
            name="comment"
            placeholder="Add a comment..."
            multiline
            maxRows={4}
            fullWidth
            required
            disabled={loading}
            autoComplete="off"
            startAdornment={
              <CommentRounded sx={{ pr: 1, color: 'text.secondary' }} fontSize="small" />
            }
            sx={{ pb: 1 }}
          />
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3, pt: 0 }}>
        <Button 
          onClick={handleClose} 
          color="inherit" 
          disabled={loading}
          sx={{ fontWeight: 600, borderRadius: 2 }}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          variant="contained" 
          disabled={loading}
          sx={{ fontWeight: 700, borderRadius: 2 }}
        >
          {loading ? 'Posting...' : 'Post Comment'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
