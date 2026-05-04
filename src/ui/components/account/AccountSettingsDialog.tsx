import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteForever from "@mui/icons-material/DeleteForever";
import Divider from "@mui/material/Divider";
import { alpha, useTheme } from "@mui/material/styles";
import type { User } from "../../../models/user.model";

interface AccountSettingsDialogProps {
  open: boolean;
  onClose: () => void;
  account: User | null;
  updateAccount: (data: Partial<User>) => Promise<any> | any;
  deleteAccount: () => Promise<any> | any;
  loading?: boolean;
}

export const AccountSettingsDialog: React.FC<AccountSettingsDialogProps> = ({
  open,
  onClose,
  account,
  updateAccount,
  deleteAccount,
  loading = false,
}) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    description: "",
    displayPicture: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    if (account && open) {
      setFormData({
        firstName: account.name?.first || "",
        lastName: account.name?.last || "",
        description: account.description || "",
        displayPicture: account.displayPicture || "",
        email: account.email || "",
        currentPassword: "",
        newPassword: "",
      });
    }
  }, [account, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!account) return;
    
    const updates: Partial<User> = {
      name: {
        first: formData.firstName,
        last: formData.lastName,
        full: `${formData.firstName} ${formData.lastName}`.trim()
      },
      description: formData.description,
      displayPicture: formData.displayPicture,
    };

    const result = await updateAccount(updates);
    if (result) onClose();
  };

  const handleDelete = async () => {
    if (!account) return;
    const result = await deleteAccount();
    if (result) {
      setDeleteConfirm(false);
      onClose();
    }
  };

  if (!account) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      slotProps={{
        paper: {
          sx: { borderRadius: 3, p: 1 }
        }
      }}
    >
      <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>Account Settings</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          {/* Avatar Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={formData.displayPicture}
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "primary.main",
                  fontSize: "2rem",
                  fontWeight: 800,
                  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
                }}
              >
                {formData.firstName[0]}
              </Avatar>
              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  bottom: -4,
                  right: -4,
                  bgcolor: "background.paper",
                  boxShadow: theme.shadows[2],
                  "&:hover": { bgcolor: "grey.100" },
                }}
              >
                <PhotoCamera fontSize="small" />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                Profile Picture URL
              </Typography>
              <TextField
                fullWidth
                size="small"
                name="displayPicture"
                placeholder="https://..."
                value={formData.displayPicture}
                onChange={handleChange}
              />
            </Box>
          </Box>

          <Divider />

          {/* Personal Info */}
          {}
          <Grid container spacing={2}>
            {}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                slotProps={{ input: { sx: { fontWeight: 600 } } }}
              />
            </Grid>
            {}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                slotProps={{ input: { sx: { fontWeight: 600 } } }}
              />
            </Grid>
            {}
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Email Address"
                value={formData.email}
                disabled
                helperText="Email cannot be changed"
              />
            </Grid>
            {}
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Bio"
                name="description"
                multiline
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell the world about your perspective..."
              />
            </Grid>
          </Grid>

          <Divider />

          {/* Security */}
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Security</Typography>
          {}
          <Grid container spacing={2}>
            {}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="password"
                label="Current Password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
              />
            </Grid>
            {}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="password"
                label="New Password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Divider />

          {/* Danger Zone */}
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.error.main, 0.04),
              border: `1px solid ${alpha(theme.palette.error.main, 0.1)}`,
            }}
          >
            <Typography variant="subtitle2" color="error" sx={{ fontWeight: 800, mb: 1 }}>
              Danger Zone
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 2 }}>
              Deleting your account will permanently remove all your data and perspectives. This cannot be undone.
            </Typography>
            {deleteConfirm ? (
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={handleDelete}
                  startIcon={<DeleteForever />}
                  sx={{ fontWeight: 700, borderRadius: 2 }}
                >
                  Confirm Delete
                </Button>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => setDeleteConfirm(false)}
                  sx={{ fontWeight: 600 }}
                >
                  Cancel
                </Button>
              </Stack>
            ) : (
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => setDeleteConfirm(true)}
                sx={{ fontWeight: 700, borderRadius: 2 }}
              >
                Delete Account
              </Button>
            )}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={onClose} color="inherit" sx={{ fontWeight: 600 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={loading}
          sx={{ px: 4, borderRadius: 2, fontWeight: 700 }}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
