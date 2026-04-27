import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import HomeRounded from "@mui/icons-material/HomeRounded";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import { floatAnimation } from "../../styles/themes/animations";

const NotFound = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Stack
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        p: 3,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        {/* Large 404 display */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "6rem", sm: "10rem" },
            fontWeight: 950,
            lineHeight: 1,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            mb: 2,
            userSelect: "none",
            animation: `${floatAnimation} 3s ease-in-out infinite`,
          }}
        >
          404
        </Typography>

        <Typography variant="h4" fontWeight={900} gutterBottom color="text.primary">
          Page Not Found
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 5, lineHeight: 1.8, maxWidth: 400, mx: "auto" }}
        >
          Looks like this perspective doesn't exist. The page you're looking for
          may have been moved, deleted, or perhaps never existed.
        </Typography>

        <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<HomeRounded />}
            onClick={() => navigate("/")}
            sx={{ px: 4, borderRadius: 2 }}
          >
            Go Home
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<ArrowBackRounded />}
            onClick={() => navigate(-1)}
            sx={{ px: 4, borderRadius: 2 }}
          >
            Go Back
          </Button>
        </Stack>
      </Container>
    </Stack>
  );
};

export default NotFound;
