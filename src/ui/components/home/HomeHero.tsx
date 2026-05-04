import { alpha, useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import AddRounded from "@mui/icons-material/AddRounded";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import { useNavigate } from "react-router-dom";
import {
  fadeSlideUp,
  gradientShift,
  makePulseGlow,
} from "../../styles/themes/animations";

/**
 * HomeHero — the above-the-fold hero section of the home page.
 */
export const HomeHero = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const primary = theme.palette.primary.main;
  const pulseGlow = makePulseGlow(primary);

  return (
    <Stack
      sx={{
        alignItems: "center",
        textAlign: "center",
        mb: { xs: 5, md: 7 },
        animation: `${fadeSlideUp} 0.5s ease both`,
      }}
    >
      {/* ── Badge pill ── */}
      <Chip
        icon={<AutoAwesomeRounded sx={{ fontSize: "0.82rem !important" }} />}
        label="Perspectives, unfiltered"
        size="small"
        sx={{
          mb: 3,
          px: 1,
          letterSpacing: 0.5,
          bgcolor: alpha(primary, 0.12),
          color: "primary.main",
          border: "1px solid",
          borderColor: alpha(primary, 0.25),
          "& .MuiChip-icon": { color: "primary.main" },
          animation: `${pulseGlow} 3.5s ease-in-out infinite`,
        }}
      />

      {/* ── Display heading ── */}
      <Typography
        component="h1"
        sx={{
          fontWeight: 950,
          fontSize: { xs: "2.5rem", sm: "3.2rem", md: "4rem" },
          lineHeight: 1.08,
          letterSpacing: "-0.035em",
          mb: 2.5,
        }}
      >
        <Typography variant="gradientText" component="span" sx={{ fontSize: "inherit", fontWeight: "inherit" }}>
          Discover{" "}
        </Typography>

        <Typography
          variant="gradientHero"
          component="span"
          sx={{ fontSize: "inherit", fontWeight: "inherit", animation: `${gradientShift} 5s ease infinite` }}
        >
          True
        </Typography>

        <br />

        <Typography variant="gradientText" component="span" sx={{ fontSize: "inherit", fontWeight: "inherit" }}>
          Perspectives
        </Typography>
      </Typography>

      {/* ── Sub-headline ── */}
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ lineHeight: 1.7, maxWidth: 520, mb: 4 }}
      >
        Join a community dedicated to sharing transparent, profound, and
        unbiased viewpoints from around the globe.
      </Typography>

      {/* ── CTA buttons ── */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        <Button
          id="hero-cta-share"
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddRounded />}
          onClick={() => navigate("/account")}
          sx={{ px: 3.5, py: 1.2, fontSize: "0.95rem", borderRadius: 3, fontWeight: 700 }}
        >
          Share Your PoV
        </Button>

        <Button
          id="hero-cta-learn"
          variant="outlined"
          size="large"
          sx={{
            px: 3.5,
            py: 1.2,
            fontSize: "0.95rem",
            borderRadius: 3,
            borderColor: alpha(primary, 0.4),
            color: "text.primary",
            fontWeight: 700,
            "&:hover": {
              borderColor: "primary.main",
              bgcolor: alpha(primary, 0.06),
              transform: "translateY(-2px)",
            },
          }}
        >
          Learn More
        </Button>
      </Stack>
    </Stack>
  );
};
