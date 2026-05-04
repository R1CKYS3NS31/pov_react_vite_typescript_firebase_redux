import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { alpha } from "@mui/material/styles";
import type { PoV } from "../../../models/pov.model";
import { useNotificationHandler } from "../../../hooks/useNotificationHandler";

interface SharePovModalProps {
  open: boolean;
  handleClose: () => void;
  pov: PoV;
}

const SharePovModal: React.FC<SharePovModalProps> = ({ open, handleClose, pov }) => {
  const { notify } = useNotificationHandler();
  const shareUrl = `${window.location.origin}/pov/${pov?.id}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    notify("Link copied to clipboard!", "success");
  };

  const shareActions = [
    {
      name: "Copy Link",
      icon: <ContentCopyIcon />,
      action: copyToClipboard,
      color: "#f6c143", // Primary main
    },
    {
      name: "Facebook",
      icon: <FacebookIcon />,
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, "_blank"),
      color: "#1877F2",
    },
    {
      name: "Twitter",
      icon: <TwitterIcon />,
      action: () => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${pov?.title}`, "_blank"),
      color: "#1DA1F2",
    },
    {
      name: "WhatsApp",
      icon: <WhatsAppIcon />,
      action: () => window.open(`https://api.whatsapp.com/send?text=${pov?.title} ${shareUrl}`, "_blank"),
      color: "#25D366",
    },
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 800 }}>Share this POV</DialogTitle>
      <DialogContent>
        <Stack direction="row" spacing={2} sx={{ py: 2, justifyContent: "space-around" }}>
          {shareActions.map((action) => (
            <Stack key={action.name} spacing={1} sx={{ alignItems: "center" }}>
              <IconButton
                onClick={action.action}
                sx={{
                  bgcolor: alpha(action.color, 0.1),
                  color: action.color,
                  "&:hover": { bgcolor: alpha(action.color, 0.2) },
                }}
              >
                {action.icon}
              </IconButton>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {action.name}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ fontWeight: 700 }}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SharePovModal;
