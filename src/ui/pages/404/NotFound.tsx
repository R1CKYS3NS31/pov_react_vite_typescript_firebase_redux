import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import HomeRounded from "@mui/icons-material/HomeRounded";

const NotFound: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        p: 3,
        textAlign: "center",
      }}
    >
      <Stack spacing={3} sx={{ alignItems: "center" }}>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 900,
            fontSize: { xs: "5rem", md: "8rem" },
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
          }}
        >
          404
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>
          Oops! Perspective Lost
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
          The page you're looking for doesn't exist or has been moved to a different viewpoint.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          size="large"
          startIcon={<HomeRounded />}
          sx={{ borderRadius: 3, px: 4, py: 1.5, fontWeight: 700 }}
        >
          Back to Home
        </Button>
      </Stack>
    </Box>
  );
};

export default NotFound;
