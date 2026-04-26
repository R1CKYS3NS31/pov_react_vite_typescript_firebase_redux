import { alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import EditRounded from "@mui/icons-material/EditRounded";
import PersonOutlineRounded from "@mui/icons-material/PersonOutlineRounded";
import LoginRounded from "@mui/icons-material/LoginRounded";

/**
 * Left-column profile sidebar displayed on the Account page.
 * Pure presentational — all state lives in Account.jsx.
 */
export const AccountProfileCard = ({
  account,
  isAuthenticated,
  myCount = 0,
  localCount = 0,
  onEditProfile,
  onSignOut,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;

  const displayName =
    account?.name?.full ||
    `${account?.name?.first ?? ""} ${account?.name?.last ?? ""}`.trim() ||
    account?.displayName ||
    "Guest User";

  return (
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
      {/* Avatar + edit button */}
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
            (account?.name?.first?.[0] ?? <PersonOutlineRounded />)}
        </Avatar>

        {isAuthenticated && (
          <Tooltip title="Edit profile" arrow>
            <IconButton
              id="btn-edit-profile"
              onClick={onEditProfile}
              size="small"
              sx={{
                position: "absolute",
                bottom: -4,
                right: -4,
                bgcolor: "background.paper",
                boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.18)}`,
                transition: "transform 0.2s",
                "&:hover": { bgcolor: "background.paper", transform: "scale(1.12)" },
              }}
            >
              <EditRounded fontSize="small" color="primary" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Identity */}
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
        {displayName}
      </Typography>
      <Typography variant="caption" color="text.secondary" display="block">
        {account?.email ?? "No email — please sign in."}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1, mb: 3, lineHeight: 1.6 }}
      >
        {account?.description ?? "No bio provided."}
      </Typography>

      {/* Stats chips */}
      <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: "center", justifyContent: "center", mb: 3, flexWrap: "wrap" }}
      >
        <Chip
          label={`${localCount} Drafted`}
          size="small"
          variant="outlined"
          color="primary"
          sx={{ fontWeight: 700, fontSize: "0.72rem" }}
        />
        <Chip
          label={`${myCount} Posted`}
          size="small"
          variant="outlined"
          color="primary"
          sx={{ fontWeight: 700, fontSize: "0.72rem" }}
        />
      </Stack>

      {/* Auth action */}
      {isAuthenticated ? (
        <Button
          id="btn-sign-out"
          variant="outlined"
          color="error"
          fullWidth
          onClick={onSignOut}
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
          startIcon={<LoginRounded />}
          color="secondary"
          fullWidth
          sx={{ borderRadius: 3, fontWeight: 700, py: 1 }}
        >
          Sign In
        </Button>
      )}
    </Paper>
  );
};
