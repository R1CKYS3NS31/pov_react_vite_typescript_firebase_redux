import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Share from "@mui/icons-material/Share";
import { alpha } from "@mui/material/styles";
import SharePovModal from "./SharePovModal";
import PublicRounded from "@mui/icons-material/PublicRounded";
import PublicOffRounded from "@mui/icons-material/PublicOffRounded";
import { selectUserAccount } from "../../../service/redux/selectors/userAccountSelector";

const PovCard = ({
  pov,
  onDelete,
  onEdit,
  onPublish,
  showActions = true,
  isLoading = false,
}) => {
  const navigate = useNavigate();
  // Read account from Redux — zero-cost synchronous selector, no Firestore fetch.
  const account = useSelector(selectUserAccount);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  const handleAuthorClick = (e) => {
    e.stopPropagation();
    if (!pov?.author?.id || pov?.author?.id === account?.id) {
      navigate("/account");
    } else {
      navigate(`/profile/${pov?.author?.id}`);
    }
  };

  const handleDeleteConfirm = () => {
    onDelete?.(pov?.id);
    setDeleteDialogOpen(false);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    try {
      if (
        navigator.share &&
        /mobile|android|iphone/i.test(navigator.userAgent)
      ) {
        const url = `${window.location.origin}/pov/${pov?.id}`;
        navigator
          .share({ title: pov?.title, text: pov?.description, url })
          .catch(() => {
            setShareDialogOpen(true);
          });
      } else {
        setShareDialogOpen(true);
      }
    } catch {
      setShareDialogOpen(true);
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "Date unknown";
    try {
      // Handle Firebase Timestamp
      if (dateValue.toDate && typeof dateValue.toDate === "function") {
        return dateValue.toDate().toLocaleString();
      }
      // Handle Date object or ISO string
      const date = new Date(dateValue);
      if (!isNaN(date.getTime())) {
        return date.toLocaleString();
      }
    } catch (e) {
      console.warn("Error formatting date:", e);
    }
    return "Invalid date";
  };

  return (
    <>
      <Card
        sx={{
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          borderRadius: 4,
          border: "none",
          boxShadow: (theme) => theme.shadows[1],
          bgcolor: "background.paper",
          mb: 1.5,
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: (theme) => theme.shadows[4],
          },
        }}
      >
        <CardContent sx={{ p: 2, pb: 0.5 }}>
          <Grid container spacing={1.5} sx={{ width: "100%" }}>
            {/* Author Avatar Column */}
            <Grid size="auto">
              <Tooltip title={`View ${pov?.author?.name?.first}'s profile`}>
                <Avatar
                  src={pov?.author?.displayPicture}
                  alt={`${pov?.author?.name?.full}`}
                  onClick={handleAuthorClick}
                  sx={{
                    width: 34,
                    height: 34,
                    bgcolor: "secondary.main",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  {/* {authorInitials} */}
                </Avatar>
              </Tooltip>
            </Grid>

            {/* Content Column */}
            <Grid size="grow" sx={{ minWidth: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight={800}
                    color="text.primary"
                    onClick={handleAuthorClick}
                    sx={{
                      cursor: "pointer",
                      display: "inline-block",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    {pov?.author?.name?.full || pov?.author?.displayName}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ ml: 1, fontWeight: 500 }}
                  >
                    • {formatDate(pov?.createdAt)}
                  </Typography>
                </Box>

                {/* Contextual Actions (Top Right) */}
                <Box sx={{ display: "flex", gap: 0.5, mt: -0.5, mr: -1 }}>
                  <Tooltip title="Share PoV">
                    <IconButton
                      size="small"
                      color="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(e);
                      }}
                      disabled={isLoading}
                      sx={{
                        opacity: 0.6,
                        "&:hover": { opacity: 1, bgcolor: "primary.light" },
                      }}
                    >
                      <Share fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  {onPublish && (
                    <Tooltip
                      title={pov?.published ? "Unpublish POV" : "Publish POV"}
                    >
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPublish(pov);
                        }}
                        disabled={isLoading}
                        sx={{
                          opacity: 0.6,
                          "&:hover": { opacity: 1, bgcolor: "action.hover" },
                        }}
                      >
                        {pov?.published ? (
                          <PublicRounded fontSize="small" />
                        ) : (
                          <PublicOffRounded fontSize="small" />
                        )}
                      </IconButton>
                    </Tooltip>
                  )}
                  {onEdit && (
                    <Tooltip title="Edit POV">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(pov);
                        }}
                        disabled={isLoading}
                        sx={{
                          opacity: 0.6,
                          "&:hover": { opacity: 1, bgcolor: "action.hover" },
                        }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  {onDelete && (
                    <Tooltip title="Delete POV">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteDialogOpen(true);
                        }}
                        disabled={isLoading}
                        sx={{
                          opacity: 0.6,
                          "&:hover": { opacity: 1, bgcolor: "error.lighter" },
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </Box>

              {/* POV Title */}
              <Typography
                variant="h6"
                fontWeight={800}
                color="text.primary"
                sx={{ mt: 0.5, mb: 0.5, lineHeight: 1.3 }}
              >
                {pov?.title || "Untitled Perspective"}
              </Typography>

              {/* POV Description */}
              <Typography
                variant="body1"
                color="text.primary"
                sx={{
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.6,
                  mb: 1,
                  display: "-webkit-box",
                  WebkitLineClamp: showActions ? 5 : "none",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {pov?.description || "No description provided."}
              </Typography>

              {/* POV Points (Unified String/Array Schema) */}
              {((Array.isArray(pov?.points) && pov?.points?.length > 0) ||
                (typeof pov?.points === "string" && pov?.points?.trim())) && (
                <Stack spacing={0.5} sx={{ mb: 1 }}>
                  {(Array.isArray(pov?.points)
                    ? pov.points
                    : pov.points.split("\n").filter((p) => p.trim())
                  ).map((point, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        px: 1.25,
                        py: 0.5,
                        borderRadius: 1.5,
                        bgcolor: (theme) =>
                          alpha(theme.palette.secondary.main, 0.06),
                        borderLeft: "3px solid",
                        borderColor: "secondary.main",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color="text.primary"
                        sx={{ fontSize: "0.85rem", lineHeight: 1.4 }}
                      >
                        {point}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              )}

              {/* Point/Comment Input */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        slotProps={{
          paper: {
            sx: { borderRadius: 3, border: "none" },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, color: "text.primary" }}>
          Delete this POV?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "text.secondary" }}>
            This action is permanent and cannot be undone. Are you sure you want
            to delete{" "}
            <Box component="strong" sx={{ color: "text.primary" }}>
              "{pov?.title}"
            </Box>
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 2, pt: 0 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            color="inherit"
            sx={{ borderRadius: 2, fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{ borderRadius: 2, fontWeight: 700 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <SharePovModal
        open={shareDialogOpen}
        handleClose={() => setShareDialogOpen(false)}
        pov={pov}
      />
    </>
  );
};

export default PovCard;
