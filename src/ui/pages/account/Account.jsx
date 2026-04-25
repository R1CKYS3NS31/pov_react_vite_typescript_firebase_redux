import { useState } from "react";
import { alpha, useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import EditIcon from "@mui/icons-material/EditRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import AddIcon from "@mui/icons-material/AddRounded";
import LoginIcon from "@mui/icons-material/LoginRounded";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlineRounded";
import { PovDialog } from "../../components/pov/PovDialog";
import PovList from "../../components/pov/PovList";
import { useAccount } from "../../../hooks/useAccount";
import { AccountSettingsDialog } from "./AccountSettingsDialog";
import { CloudUploadRounded, FolderRounded } from "@mui/icons-material";

const Account = () => {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;
  const secondary =
    theme.palette.secondary?.main ?? theme.palette.primary.light;

  const {
    account,
    deleteAccount,
    updateAccount,
    myPoVs,
    localPoVs,
    deletePovLocal,
    deletePov,
    updatePov,
    loading,
  } = useAccount();

  const {
    isAuthenticated,
    handleSignOut,
    handleUpdatePassword: updatePassword,
  } = useAuth();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [povDialogOpen, setPovDialogOpen] = useState(false);
  const [editingPov, setEditingPov] = useState(null);
  const [isLocalEdit, setIsLocalEdit] = useState(false);
  const [activeTab, setActiveTab] = useState(
    parseInt(searchParams.get("tab") || "0", 10),
  );

  const toArray = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.content)) return data.content;
    return [];
  };
  const toTotalPages = (data) => data?.totalPages ?? 1;

  const myItems = toArray(myPoVs);
  const localItems = toArray(localPoVs);
  const myPages = toTotalPages(myPoVs);
  const localPages = toTotalPages(localPoVs);

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
    setSearchParams({ tab: newValue });
  };

  const handleCreateNew = () => {
    setEditingPov(null);
    setIsLocalEdit(true);
    setPovDialogOpen(true);
  };

  const handleEditPov = (pov) => {
    setEditingPov(pov);
    setIsLocalEdit(false);
    setPovDialogOpen(true);
  };

  const handleLocalDelete = (id) => deletePovLocal(id);
  const handleLocalEdit = (pov) => handleEditPov(pov, true);
  const handleMyDelete = (id) => deletePov(id);
  const handleMyEdit = (pov) => handleEditPov(pov);
  const handlePublish = (pov) => {
    updatePov(pov.id, { published: !pov.published });
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "calc(100vh - 48px)",
        p: { xs: 1.5, md: 2.5 },
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: "-10%",
          left: "5%",
          width: "55vw",
          height: "55vw",
          background: `radial-gradient(circle, ${alpha(primary, isDark ? 0.12 : 0.08)} 0%, transparent 65%)`,
          filter: "blur(80px)",
          zIndex: 0,
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <Grid
        container
        spacing={2.5}
        sx={{ position: "relative", zIndex: 1, width: "100%" }}
      >
        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              textAlign: "center",
              bgcolor: isDark
                ? alpha(theme.palette.background.paper, 0.55)
                : alpha(theme.palette.background.paper, 0.85),
              backdropFilter: "blur(20px)",
              border: "1px solid",
              borderColor: alpha(theme.palette.divider, 0.5),
              boxShadow: theme.shadows[2],
            }}
          >
            <Box sx={{ position: "relative", display: "inline-block", mb: 2 }}>
              <Avatar
                src={account?.displayPicture}
                sx={{
                  width: 72,
                  height: 72,
                  fontSize: "1.6rem",
                  fontWeight: 800,
                  bgcolor: "primary.main",
                  boxShadow: `0 6px 18px ${alpha(primary, 0.35)}`,
                  mx: "auto",
                }}
              >
                {!account?.displayPicture &&
                  (account?.name?.first?.[0] ?? <PersonOutlineIcon />)}
              </Avatar>
              {isAuthenticated && (
                <Tooltip title="Edit profile" arrow>
                  <IconButton
                    id="btn-edit-profile"
                    onClick={() => setSettingsOpen(true)}
                    size="small"
                    sx={{
                      position: "absolute",
                      bottom: -4,
                      right: -4,
                      bgcolor: "background.paper",
                      boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.18)}`,
                      transition: "transform 0.2s",
                      "&:hover": {
                        bgcolor: "background.paper",
                        transform: "scale(1.12)",
                      },
                    }}
                  >
                    <EditIcon fontSize="small" color="primary" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
              {account?.name?.full ||
                `${account?.name?.first ?? ""} ${account?.name?.last ?? ""}`.trim() ||
                account?.displayName ||
                "Guest User"}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              {account?.email ?? "No email — please sign in."}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1, mb: 3, lineHeight: 1.6 }}
            >
              {account?.description ?? "No bio provided."}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              sx={{ mb: 3, flexWrap: "wrap" }}
            >
              <Chip
                label={`${myItems.length} Posted`}
                size="small"
                variant="outlined"
                color="primary"
                sx={{ fontWeight: 700, fontSize: "0.72rem" }}
              />
            </Stack>
            {isAuthenticated ? (
              <Button
                id="btn-sign-out"
                variant="outlined"
                color="error"
                fullWidth
                onClick={handleSignOut}
                sx={{ borderRadius: 3, fontWeight: 700, py: 1 }}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                id="btn-sign-in"
                component={Link}
                to="/signin"
                variant="outlined"
                startIcon={<LoginIcon />}
                // onClick={handleSignIn}
                color="secondary"
                fullWidth
                sx={{ borderRadius: 3, fontWeight: 700, py: 1 }}
              >
                Sign In
              </Button>
            )}
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 8, lg: 9 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
              px: 1,
            }}
          >
            <Typography variant="h6" fontWeight={800} color="text.primary">
              Your Perspectives
            </Typography>
          </Box>

          <Stack
            direction="row"
            sx={{
              mb: 3,
              borderRadius: 3,
              bgcolor: isDark
                ? alpha(theme.palette.background.paper, 0.6)
                : alpha(theme.palette.background.paper, 0.8),
              backdropFilter: "blur(12px)",
              border: "1px solid",
              borderColor: "divider",
              px: 1,
              py: 0.5,
            }}
          >
            <Tabs
              variant="fullWidth"
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                width: "100%",
                "& .MuiTabs-indicator": {
                  height: 3,
                  borderRadius: "3px 3px 0 0",
                  background: `linear-gradient(90deg, ${primary}, ${secondary})`,
                },
                "& .MuiTab-root": {
                  minHeight: 44,
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "0.875rem",
                  letterSpacing: 0.2,
                  gap: 0.75,
                  transition: "color 0.2s",
                },
              }}
            >
              <Tab
                id="account-tab-local"
                aria-controls="account-tabpanel-local"
                icon={<FolderRoundedIcon sx={{ fontSize: 17 }} />}
                iconPosition="start"
                label={
                  <Stack direction="row" alignItems="center" spacing={0.75}>
                    <span>Local Drafts</span>
                    {localItems.length > 0 && (
                      <Chip
                        label={localItems.length}
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: "0.68rem",
                          fontWeight: 800,
                          bgcolor:
                            activeTab === 0
                              ? alpha(primary, 0.15)
                              : "transparent",
                          color:
                            activeTab === 0 ? "primary.main" : "text.secondary",
                          border: "1px solid",
                          borderColor:
                            activeTab === 0
                              ? alpha(primary, 0.3)
                              : "transparent",
                        }}
                      />
                    )}
                  </Stack>
                }
              />
              <Tab
                id="account-tab-posted"
                aria-controls="account-tabpanel-posted"
                icon={<CloudUploadRoundedIcon sx={{ fontSize: 17 }} />}
                iconPosition="start"
                label={
                  <Stack direction="row" alignItems="center" spacing={0.75}>
                    <span>My POVs</span>
                    {myItems.length > 0 && (
                      <Chip
                        label={myItems.length}
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: "0.68rem",
                          fontWeight: 800,
                          bgcolor:
                            activeTab === 1
                              ? alpha(primary, 0.15)
                              : "transparent",
                          color:
                            activeTab === 1 ? "primary.main" : "text.secondary",
                          border: "1px solid",
                          borderColor:
                            activeTab === 1
                              ? alpha(primary, 0.3)
                              : "transparent",
                        }}
                      />
                    )}
                  </Stack>
                }
              />
            </Tabs>
          </Stack>
          {/* 
          {myItems.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 280,
                bgcolor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                borderRadius: 4,
                border: "2px dashed",
                borderColor: "divider",
                textAlign: "center",
                p: 4,
              }}
            >
              <Typography
                variant="h6"
                fontWeight={700}
                color="text.secondary"
                gutterBottom
              >
                {isAuthenticated
                  ? "No posted perspectives yet"
                  : "Not signed in"}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3, opacity: 0.75 }}
              >
                {isAuthenticated
                  ? "Post your first PoV and let the world see your perspective."
                  : "Sign in to post and manage your perspectives."}
              </Typography>
              {isAuthenticated ? (
                <Button
                  id="btn-post-first"
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleCreateNew}
                  sx={{
                    borderRadius: 2.5,
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
                    boxShadow: `0 6px 20px -4px ${alpha(primary, 0.5)}`,
                  }}
                >
                  Post Your First PoV
                </Button>
              ) : (
                <Button
                  id="btn-sign-in-posted"
                  component={Link}
                  to="/signin"
                  variant="outlined"
                  startIcon={<LoginIcon />}
                  sx={{ borderRadius: 2.5, fontWeight: 700 }}
                >
                  Sign In
                </Button>
              )}
            </Box>
          ) : (
            <PovList
              povs={myItems}
              loading={loading}
              onPublish={handlePublish}
              onEdit={handleMyEdit}
              onDelete={handleMyDelete}
              totalPages={myPages}
              emptyMessage="No posted perspectives yet."
            />
          )}
        </Grid>
      </Grid> */}

          {activeTab === 0 && (
            <Box
              id="account-tabpanel-local"
              role="tabpanel"
              aria-labelledby="account-tab-local"
              sx={{ pt: 1 }}
            >
              {!loading && localItems.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 280,
                    bgcolor: isDark
                      ? "rgba(255,255,255,0.02)"
                      : "rgba(0,0,0,0.02)",
                    borderRadius: 4,
                    border: "2px dashed",
                    borderColor: "divider",
                    textAlign: "center",
                    p: 4,
                  }}
                >
                  <FolderRounded
                    sx={{ fontSize: 44, mb: 1.5, color: alpha(primary, 0.35) }}
                  />
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    color="text.secondary"
                    gutterBottom
                  >
                    No local drafts yet
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3, opacity: 0.75 }}
                  >
                    Create a perspective offline — it stays here until
                    you&apos;re ready to post.
                  </Typography>
                  <Button
                    id="btn-create-draft"
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleCreateNew}
                    sx={{ borderRadius: 2.5, fontWeight: 700 }}
                  >
                    Create Draft
                  </Button>
                </Box>
              ) : (
                <PovList
                  povs={localItems}
                  loading={loading}
                  onEdit={handleLocalEdit}
                  onDelete={handleLocalDelete}
                  totalPages={localPages}
                  emptyMessage="No local drafts yet."
                />
              )}
            </Box>
          )}

          {activeTab === 1 && (
            <Box
              id="account-tabpanel-posted"
              role="tabpanel"
              aria-labelledby="account-tab-posted"
              sx={{ pt: 1 }}
            >
              {!loading && myItems.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 280,
                    bgcolor: isDark
                      ? "rgba(255,255,255,0.02)"
                      : "rgba(0,0,0,0.02)",
                    borderRadius: 4,
                    border: "2px dashed",
                    borderColor: "divider",
                    textAlign: "center",
                    p: 4,
                  }}
                >
                  <CloudUploadRounded
                    sx={{ fontSize: 44, mb: 1.5, color: alpha(primary, 0.35) }}
                  />
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    color="text.secondary"
                    gutterBottom
                  >
                    {isAuthenticated
                      ? "No posted perspectives yet"
                      : "Not signed in"}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3, opacity: 0.75 }}
                  >
                    {isAuthenticated
                      ? "Post your first PoV and let the world see your perspective."
                      : "Sign in to post and manage your perspectives."}
                  </Typography>
                  {isAuthenticated ? (
                    <Button
                      id="btn-post-first"
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={handleCreateNew}
                      sx={{
                        borderRadius: 2.5,
                        fontWeight: 700,
                        background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
                        boxShadow: `0 6px 20px -4px ${alpha(primary, 0.5)}`,
                      }}
                    >
                      Post Your First PoV
                    </Button>
                  ) : (
                    <Button
                      id="btn-sign-in-posted"
                      component={Link}
                      to="/signin"
                      variant="outlined"
                      startIcon={<LoginIcon />}
                      sx={{ borderRadius: 2.5, fontWeight: 700 }}
                    >
                      Sign In
                    </Button>
                  )}
                </Box>
              ) : (
                <PovList
                  povs={myItems}
                  loading={loading}
                  onEdit={handleMyEdit}
                  onDelete={handleMyDelete}
                  onPublish={handlePublish}
                  totalPages={myPages}
                  emptyMessage="No posted perspectives yet."
                />
              )}
            </Box>
          )}
        </Grid>
      </Grid>
      <Fab
        id="account-fab-create"
        color="primary"
        aria-label="create pov"
        onClick={handleCreateNew}
        sx={{
          position: "fixed",
          bottom: { xs: 80, md: 32 },
          right: { xs: 16, md: 32 },
          boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.5)}`,
          background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
          transition: "all 0.25s ease",
          "&:hover": {
            transform: "scale(1.06) translateY(-2px)",
            boxShadow: `0 14px 32px ${alpha(primary, 0.6)}`,
          },
        }}
      >
        <AddIcon />
      </Fab>
      <AccountSettingsDialog
        key={settingsOpen ? "open" : "closed"}
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        account={account}
        updateAccount={updateAccount}
        updatePassword={updatePassword}
        deleteAccount={deleteAccount}
        isAuthenticated={isAuthenticated}
        loading={loading}
      />
      <PovDialog
        open={povDialogOpen}
        onClose={() => setPovDialogOpen(false)}
        povToEdit={editingPov}
        isLocal={isLocalEdit}
      />
    </Box>
  );
};
export default Account;
