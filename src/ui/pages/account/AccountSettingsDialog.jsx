import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  Grid,
  Divider,
  Stack,
  alpha,
  useTheme,
  InputAdornment,
  IconButton,
  Avatar,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/CloseRounded";
import EmailIcon from "@mui/icons-material/EmailRounded";
import SecurityIcon from "@mui/icons-material/SecurityRounded";
import VpnKeyIcon from "@mui/icons-material/VpnKeyRounded";
import SaveIcon from "@mui/icons-material/SaveRounded";
import BadgeIcon from "@mui/icons-material/BadgeRounded";
import PhotoCameraIcon from "@mui/icons-material/PhotoCameraRounded";
import DeleteIcon from "@mui/icons-material/DeleteRounded";

export const AccountSettingsDialog = ({
  open,
  onClose,
  account,
  updateAccount,
  updatePassword,
  deleteAccount,
  isAuthenticated,
  loading,
}) => {
  const theme = useTheme();

  // Form States
  const [profileData, setProfileData] = useState({
    firstName: account?.name?.first || "",
    lastName: account?.name?.last || "",
    email: account?.email || "",
    description: account?.description || "",
    displayPicture: account?.displayPicture || "",
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Adjust state when account changes or dialog opens
  const [prevAccount, setPrevAccount] = useState(null);
  const [prevOpen, setPrevOpen] = useState(false);

  if (open && (!prevOpen || account !== prevAccount)) {
    setPrevOpen(true);
    setPrevAccount(account);
    setProfileData({
      firstName:
        account?.name?.first || account?.displayName?.split(" ")[0] || "",
      lastName:
        account?.name?.last ||
        account?.displayName?.split(" ").slice(1).join(" ") ||
        "",
      email: account?.email || "",
      description: account?.description || "",
      displayPicture: account?.displayPicture || "",
    });
  } else if (!open && prevOpen) {
    setPrevOpen(false);
  }

  const handleProfileChange = (e) =>
    setProfileData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value || "",
    }));

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          displayPicture: reader.result || "",
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSecurityChange = (e) =>
    setSecurityData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value || "",
    }));

  const handleSaveProfile = async () => {
    const userData = {
      name: {
        first: profileData.firstName,
        last: profileData.lastName,
        full: `${profileData.firstName} ${profileData.lastName}`,
      },
      displayName: `${profileData.firstName} ${profileData.lastName}`,
      email: profileData.email,
      description: profileData.description,
      displayPicture: profileData.displayPicture,
    };

    await updateAccount(userData)
      .then(() => {
        onClose();
      })
  };

  const handleUpdatePassword = async () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      await updatePassword(
        securityData.currentPassword,
        securityData.newPassword,
      );
      setSecurityData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Failed to update password:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, bgcolor: "background.paper" } }}
    >
      <DialogTitle
        component="div"
        sx={{
          m: 0,
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight={800}>
          Account Settings
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: "text.secondary",
            "&:hover": {
              color: "text.primary",
              bgcolor: alpha(theme.palette.text.primary, 0.05),
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ p: { xs: 2, md: 4 } }}>
        <Stack spacing={3}>
          {/* PROFILE SECTION */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <BadgeIcon color="primary" /> Public Profile Info
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={4}
              alignItems="center"
              sx={{ mb: 4 }}
            >
              <Box sx={{ position: "relative" }}>
                <Avatar
                  src={profileData.displayPicture}
                  sx={{
                    width: 64,
                    height: 64,
                    border: `2px solid ${theme.palette.primary.main}`,
                    p: 0.5,
                    bgcolor: "background.default",
                  }}
                >
                  {profileData.firstName?.[0] || "U"}
                </Avatar>
                <IconButton
                  component="label"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    bgcolor: "primary.main",
                    color: "white",
                    "&:hover": { bgcolor: "primary.dark" },
                    boxShadow: theme.shadows[2],
                  }}
                  size="small"
                >
                  <PhotoCameraIcon fontSize="small" />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </IconButton>
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight={700}>
                  Profile Picture
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We recommend an image of at least 400x400. Gifs are also
                  supported.
                </Typography>
              </Box>
            </Stack>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  value={profileData.firstName}
                  onChange={handleProfileChange}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={profileData.lastName}
                  onChange={handleProfileChange}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Bio description"
                  name="description"
                  autoComplete="off"
                  value={profileData.description}
                  onChange={handleProfileChange}
                  variant="outlined"
                  helperText="Short introduction about yourself."
                />
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <EmailIcon color="primary" /> Contact Details
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 8 }}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  variant="outlined"
                  helperText="Your email is used for login and notifications."
                />
              </Grid>
            </Grid>
          </Box>
          <Divider />

          {/* SETTINGS SECTION */}

          {/* SECURITY SECTION */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "error.main",
              }}
            >
              <SecurityIcon /> Account Security
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
                Change Password
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    type="password"
                    name="currentPassword"
                    autoComplete="current-password"
                    value={securityData.currentPassword}
                    onChange={handleSecurityChange}
                    size="small"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <VpnKeyIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="New Password"
                    type="password"
                    name="newPassword"
                    autoComplete="new-password"
                    value={securityData.newPassword}
                    onChange={handleSecurityChange}
                    size="small"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <VpnKeyIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    type="password"
                    name="confirmPassword"
                    autoComplete="new-password"
                    value={securityData.confirmPassword}
                    onChange={handleSecurityChange}
                    size="small"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <VpnKeyIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleUpdatePassword}
                    sx={{ mt: 1, borderRadius: 2, fontWeight: 700 }}
                    disabled={
                      !securityData.currentPassword ||
                      !securityData.newPassword ||
                      !securityData.confirmPassword ||
                      securityData.newPassword !== securityData.confirmPassword ||
                      !isAuthenticated ||
                      loading
                    }
                  >
                    Change Password
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Divider />
          {/* LEAVE DELETE POV ACCOUNT */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "error.main",
              }}
            >
              <DeleteIcon /> Delete Account
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
                Delete Account
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Deleting your account will permanently remove all your data.
              </Typography>
              <Button
                variant="text"
                color="error"
                onClick={() => {
                  if (deleteAccount) deleteAccount();
                  onClose();
                }}
                sx={{ mt: 1, borderRadius: 2, fontWeight: 700 }}
                disabled={!isAuthenticated || loading}
              >
                Delete Account
              </Button>
            </Box>
          </Box>
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions
        sx={{ p: 3, bgcolor: alpha(theme.palette.background.default, 0.5) }}
      >
        <Button
          onClick={onClose}
          disabled={loading}
          sx={{ fontWeight: 700, borderRadius: 2 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSaveProfile}
          variant="contained"
          color="primary"
          disabled={loading}
          startIcon={
            loading ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <SaveIcon />
            )
          }
          sx={{ fontWeight: 700, borderRadius: 2, px: 3 }}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
