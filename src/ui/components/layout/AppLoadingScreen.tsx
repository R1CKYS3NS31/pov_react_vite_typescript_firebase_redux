import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";
import { makePulseGlow } from "../../styles/themes/animations";

/**
 * Full-screen loading splash shown while Firebase auth initialises.
 * Uses theme tokens — no hardcoded hex values.
 */
const AppLoadingScreen = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const pulseGlow = makePulseGlow(primary);

  return (
    <Stack
      spacing={2.5}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        inset: 0,
        bgcolor: "background.default",
      }}
    >
      {/* Animated logo mark */}
      <Avatar
        variant="logo"
        sx={{
          animation: `${pulseGlow} 1.5s ease-in-out infinite`,
          userSelect: "none",
        }}
      >
        P
      </Avatar>

      {/* Text block */}
      <Stack
        spacing={0.5}
        sx={{
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: "-0.03em" }}>
          POV App
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Loading your perspectives…
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AppLoadingScreen;
