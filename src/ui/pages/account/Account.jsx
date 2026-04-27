import { useState } from "react";
import { alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useSearchParams } from "react-router-dom";
import AddRounded from "@mui/icons-material/AddRounded";
import FolderRounded from "@mui/icons-material/FolderRounded";
import CloudUploadRounded from "@mui/icons-material/CloudUploadRounded";
import LoginRounded from "@mui/icons-material/LoginRounded";

import { useAccount } from "../../../hooks/useAccount";
import { useAuth } from "../../../hooks/useAuth";
import { AccountProfileCard } from "../../components/account/AccountProfileCard";
import { AccountPovTabs } from "../../components/account/AccountPovTabs";
import { AccountPovPanel } from "../../components/account/AccountPovPanel";
import { AccountSettingsDialog } from "../../components/account/AccountSettingsDialog";
import { PovDialog } from "../../components/pov/PovDialog";

/* ─── helpers ─────────────────────────────────────────────────────────────── */
const toArray = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  return [];
};

const Account = () => {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;

  /* ── data ── */
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

  const myItems    = toArray(myPoVs);
  const localItems = toArray(localPoVs);
  const myPages    = myPoVs?.totalPages    ?? 1;
  const localPages = localPoVs?.totalPages ?? 1;

  /* ── local UI state ── */
  const [settingsOpen,  setSettingsOpen]  = useState(false);
  const [povDialogOpen, setPovDialogOpen] = useState(false);
  const [editingPov,    setEditingPov]    = useState(null);
  const [isLocalEdit,   setIsLocalEdit]   = useState(false);
  const [activeTab,     setActiveTab]     = useState(
    parseInt(searchParams.get("tab") || "0", 10),
  );

  /* ── handlers ── */
  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
    setSearchParams({ tab: newValue });
  };

  const handleCreateNew = () => {
    setEditingPov(null);
    setIsLocalEdit(true);
    setPovDialogOpen(true);
  };

  const handleEditPov = (pov, isLocal = false) => {
    setEditingPov(pov);
    setIsLocalEdit(isLocal);
    setPovDialogOpen(true);
  };

  const handlePublish = (pov) => updatePov(pov.id, { published: !pov.published });

  /* ─── render ─────────────────────────────────────────────────────────────── */
  return (
    <Box sx={{ position: "relative", minHeight: "calc(100vh - 48px)", p: { xs: 1.5, md: 2.5 } }}>
      {/* Ambient glow */}
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

      <Grid container spacing={2.5} sx={{ position: "relative", zIndex: 1, width: "100%" }}>

        {/* ── Left: profile sidebar ────────────────────────────────────────── */}
        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <AccountProfileCard
            account={account}
            isAuthenticated={isAuthenticated}
            myCount={myItems.length}
            localCount={localItems.length}
            onEditProfile={() => setSettingsOpen(true)}
            onSignOut={handleSignOut}
          />
        </Grid>

        {/* ── Right: perspectives panel ─────────────────────────────────────── */}
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

          <AccountPovTabs
            activeTab={activeTab}
            onChange={handleTabChange}
            localCount={localItems.length}
            myCount={myItems.length}
          />

          {/* Local Drafts panel */}
          {activeTab === 0 && (
            <AccountPovPanel
              id="account-tabpanel-local"
              labelledBy="account-tab-local"
              items={localItems}
              totalPages={localPages}
              loading={loading}
              emptyIcon={<FolderRounded sx={{ fontSize: 44 }} />}
              emptyTitle="No local drafts yet"
              emptyDescription="Create a perspective offline — it stays here until you're ready to post."
              emptyAction={
                <Button
                  id="btn-create-draft"
                  variant="outlined"
                  startIcon={<AddRounded />}
                  onClick={handleCreateNew}
                  sx={{ borderRadius: 2.5, fontWeight: 700 }}
                >
                  Create Draft
                </Button>
              }
              emptyMessage="No local drafts yet."
              onEdit={(pov) => handleEditPov(pov, true)}
              onDelete={deletePovLocal}
            />
          )}

          {/* My POVs panel */}
          {activeTab === 1 && (
            <AccountPovPanel
              id="account-tabpanel-posted"
              labelledBy="account-tab-posted"
              items={myItems}
              totalPages={myPages}
              loading={loading}
              emptyIcon={<CloudUploadRounded sx={{ fontSize: 44 }} />}
              emptyTitle={isAuthenticated ? "No posted perspectives yet" : "Not signed in"}
              emptyDescription={
                isAuthenticated
                  ? "Post your first PoV and let the world see your perspective."
                  : "Sign in to post and manage your perspectives."
              }
              emptyAction={
                isAuthenticated ? (
                  <Button
                    id="btn-post-first"
                    variant="contained"
                    startIcon={<AddRounded />}
                    onClick={handleCreateNew}
                    sx={{ borderRadius: 2.5 }}
                  >
                    Post Your First PoV
                  </Button>
                ) : (
                  <Button
                    id="btn-sign-in-posted"
                    component={Link}
                    to="/signin"
                    variant="outlined"
                    startIcon={<LoginRounded />}
                    sx={{ borderRadius: 2.5, fontWeight: 700 }}
                  >
                    Sign In
                  </Button>
                )
              }
              emptyMessage="No posted perspectives yet."
              onEdit={(pov) => handleEditPov(pov, false)}
              onDelete={deletePov}
              onPublish={handlePublish}
            />
          )}
        </Grid>
      </Grid>

      {/* Create FAB */}
      <Fab
        id="account-fab-create"
        color="primary"
        size="small"
        aria-label="create pov"
        onClick={handleCreateNew}
        sx={{ position: "fixed", bottom: 80, right: 16, zIndex: 1000 }}
      >
        <AddRounded />
      </Fab>

      {/* Dialogs */}
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
