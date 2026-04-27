import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { makePulseGlow } from "../../styles/themes/animations";

/**
 * Full-screen loading splash shown while Firebase auth initialises.
 * Uses theme tokens — no hardcoded hex values.
 */
const AppLoadingScreen = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
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
      <Stack
        sx={{
          alignItems: "center",
          justifyContent: "center",
          width: 72,
          height: 72,
          background: `linear-gradient(135deg, ${primary}, ${secondary})`,
          borderRadius: 3,
          fontSize: "2.25rem",
          fontWeight: 900,
          color: "primary.contrastText",
          boxShadow: theme.customShadows?.primary,
          animation: `${pulseGlow} 1.5s ease-in-out infinite`,
          userSelect: "none",
        }}
      >
        P
      </Stack>

      {/* Text block */}
      <Stack
        spacing={0.5}
        sx={{
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight={900} letterSpacing="-0.03em">
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
