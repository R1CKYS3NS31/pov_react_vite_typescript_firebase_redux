import React, { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Share from "@mui/icons-material/Share";
import { alpha } from "@mui/material/styles";
import SharePovModal from "./SharePovModal";
import PublicRounded from "@mui/icons-material/PublicRounded";
import PublicOffRounded from "@mui/icons-material/PublicOffRounded";
import AddReactionOutlined from "@mui/icons-material/AddReactionOutlined";
import EditNote from "@mui/icons-material/EditNote";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import FavoriteRounded from "@mui/icons-material/FavoriteRounded";
import DeleteSweep from "@mui/icons-material/DeleteSweep";
import FileCopy from "@mui/icons-material/FileCopy";
import { useAccount } from "../../../hooks/useAccount";
import { formatNumber } from "../../../utils/formatNumber";
import { DialogCommentPoV } from "./DialogCommentPoV";
import Comment from "@mui/icons-material/Comment";
import type { PoV } from "../../../models/pov.model";
import type { User } from "../../../models/user.model";

interface PovCardProps {
  pov: PoV;
  onDelete?: (id: string) => void;
  onEdit: (pov: PoV) => void;
  loading?: boolean;
}

const PovCard: React.FC<PovCardProps> = ({
  pov,
  onDelete,
  onEdit,
  loading = false,
}) => {
  const navigate = useNavigate();
  const {
    handleLike,
    handleUnlike,
    handleComment,
    handleUncomment,
    updatePov,
    account,
    notify,
    loading: actionLoading,
  } = useAccount();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [openCommentPoVDialog, setOpenCommentPoVDialog] = useState(false);

  const isAuthor = account && pov?.author && (typeof pov.author === 'object' ? (pov.author as User).id === account.id : pov.author === account.id);
  const isAuthenticated = !!account?.id;
  const likeFound = pov?.likes?.find((like) => account && account.id === like);

  const speedActions = useMemo(() => {
    const actions = [];

    actions.push({ icon: <Share fontSize="small" />, name: "Share" });
    actions.push({ icon: <FileCopy fontSize="small" />, name: "Copy" });

    if (!isAuthenticated) {
      return actions;
    }

    actions.push({ icon: <Comment fontSize="small" />, name: "Comment" });
    actions.push(
      likeFound
        ? {
            icon: <FavoriteRounded fontSize="small" />,
            name: `Unlike (${formatNumber(pov?.likes?.length || 0)})`,
          }
        : {
            icon: <FavoriteBorder fontSize="small" />,
            name: `Like (${formatNumber(pov?.likes?.length || 0)})`,
          },
    );

    if (isAuthenticated && isAuthor) {
      actions.push({ icon: <EditNote fontSize="small" />, name: "Edit" });
      actions.push({
        icon: <DeleteSweep fontSize="small" />,
        name: "Delete",
      });
      actions.push(
        pov.published
          ? { icon: <PublicRounded fontSize="small" />, name: "Unpublish" }
          : { icon: <PublicOffRounded fontSize="small" />, name: "Publish" },
      );
    }

    return actions;
  }, [isAuthenticated, isAuthor, pov, likeFound]);

  

  const handlePublishPoV = useCallback(
    () => updatePov(pov.id, { published: !pov.published }),
    [updatePov, pov.id, pov.published],
  );

  const handleCommentPoV = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries()) as { comment: string };

    await handleComment(pov.id, account as User, formJson)
      .then(() => {
        setOpenCommentPoVDialog(false);
      })
      .catch((error: any) => {
        console.error("Error commenting on PoV:", error);
      });
  };



  const authorId = typeof pov?.author === 'object' ? (pov.author as User).id : pov.author;
  const authorName = typeof pov?.author === 'object' ? (pov.author as User).name?.full || (pov.author as User).displayName || "Unknown" : 'Unknown Author';
  const authorPicture = typeof pov?.author === 'object' ? (pov.author as User).displayPicture : '';

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!authorId || authorId === account?.id) {
      navigate("/account");
    } else {
      navigate(`/profile/${authorId}`);
    }
  };

  const handleDeleteConfirm = () => {
    onDelete?.(pov?.id);
    setDeleteDialogOpen(false);
  };

  const handleShare = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
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
    },
    [pov],
  );

  const formatDate = (dateValue: any) => {
    if (!dateValue) return "Date unknown";
    try {
      if (dateValue.toDate && typeof dateValue.toDate === "function") {
        return dateValue.toDate().toLocaleString();
      }
      const date = new Date(dateValue);
      if (!isNaN(date.getTime())) {
        return date.toLocaleString();
      }
    } catch (e) {
      console.warn("Error formatting date:", e);
    }
    return "Invalid date";
  };

  const handleClickAction = useCallback(
    (action: string) => {
      if (action === "Delete") {
        setDeleteDialogOpen(true);
      } else if (action === "Edit") {
        onEdit(pov);
      } else if (action === "Publish" || action === "Unpublish") {
        handlePublishPoV();
      } else if (action === "Share") {
        handleShare();
      } else if (action === "Copy") {
        try {
          const textToCopy = `${pov?.title}\n\n${pov?.description}\n\nShared via PoV`;
          navigator.clipboard.writeText(textToCopy);
          notify("PoV copied to clipboard!", "success");
        } catch (err) {
          notify("Failed to copy PoV", "error");
          console.error("Failed to copy: ", err);
        }
      } else if (action.startsWith("Like")) {
        if (account?.id) handleLike(pov.id, account.id);
      } else if (action.startsWith("Unlike")) {
        if (account?.id) handleUnlike(pov.id, account.id);
      } else if (action === "Comment") {
        setOpenCommentPoVDialog(true);
      }
    },
    [
      handleLike,
      handleUnlike,
      notify,
      account,
      pov,
      handleShare,
      onEdit,
      handlePublishPoV,
    ],
  );

  return (
    <>
      <Card
        sx={{
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: (theme: any) => theme.customShadows?.z4 || theme.shadows[4],
          },
        }}
      >
        <CardContent sx={{ p: 2, pb: 0.5 }}>
          {}
          <Grid container spacing={1.5} sx={{ width: "100%" }}>
            {}
            <Grid size="auto">
              <Tooltip title={`View profile`}>
                <Avatar
                  src={authorPicture}
                  alt={authorName}
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
                  {authorName[0]}
                </Avatar>
              </Tooltip>
            </Grid>

            {}
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
                    sx={{
                      fontWeight: 800,
                      color: "text.primary",
                      cursor: "pointer",
                      display: "inline-block",
                      "&:hover": { color: "primary.main" },
                    }}
                    onClick={handleAuthorClick}
                  >
                    {authorName}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ ml: 1, fontWeight: 500 }}
                  >
                    • {formatDate(pov?.createdAt)}
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="h6"
                sx={{ mt: 0.5, mb: 0.5, lineHeight: 1.3, fontWeight: 800, color: "text.primary" }}
              >
                {pov?.title || "Untitled Perspective"}
              </Typography>

              <Typography
                variant="body1"
                color="text.primary"
                sx={{
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.6,
                  mb: 1,
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {pov?.description || "No description provided."}
              </Typography>

              {((Array.isArray(pov?.points) && pov?.points?.length > 0) ||
                (typeof pov?.points === "string" && pov?.points?.trim())) && (
                <Stack spacing={0.5} sx={{ mb: 1 }}>
                  {(Array.isArray(pov?.points)
                    ? pov.points
                    : (pov.points as string).split("\n").filter((p) => p.trim())
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
                        sx={{ fontSize: "0.85rem", lineHeight: 1.4, fontWeight: 600, color: "text.primary" }}
                      >
                        {point}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <SpeedDial
        FabProps={{ size: "small" }}
        direction="left"
        ariaLabel="SpeedDial openIcon"
        sx={{
          position: "relative",
          bottom: "0px",
          right: "0px",
        }}
        icon={<SpeedDialIcon openIcon={<AddReactionOutlined  />} />}
      >
        {speedActions.map((action) => (
          <SpeedDialAction
            slotProps={{
              fab: { size: "small" },
              tooltip: { title: action.name },
            }}
            onClick={() => handleClickAction(action.name)}
            key={action.name}
            icon={action.icon}
          />
        ))}
      </SpeedDial>

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

      <DialogCommentPoV
        open={openCommentPoVDialog}
        handleClose={() => setOpenCommentPoVDialog(false)}
        handleSubmit={handleCommentPoV}
        handleUncomment={handleUncomment}
        pov={pov}
        account={account as User}
        loading={actionLoading || loading}
      />

      <SharePovModal
        open={shareDialogOpen}
        handleClose={() => setShareDialogOpen(false)}
        pov={pov}
      />
    </>
  );
};

export default PovCard;
