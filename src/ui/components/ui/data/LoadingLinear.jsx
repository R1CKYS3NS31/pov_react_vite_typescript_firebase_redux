import { Box, LinearProgress, Typography } from "@mui/material";

export const LoadingLinear = ({
  message = "Loading...",
  progress = null, // number 0-100 or null for indeterminate
  color = "primary",
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        p: 2,
      }}
      role="alert"
      aria-live="polite"
    >
      <LinearProgress
        variant={progress !== null ? "determinate" : "indeterminate"}
        value={progress ?? undefined}
        color={color}
        sx={{ width: "100%", borderRadius: 1, height: 8 }}
      />
      <Typography
        variant="body2"
        color="text.secondary"
        aria-label="loading message"
        sx={{ userSelect: "none" }}
      >
        {message}
      </Typography>
    </Box>
  );
};
