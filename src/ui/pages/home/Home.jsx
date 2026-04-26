import { useState } from "react";
import { alpha, useTheme, keyframes } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
import AutoAwesome from "@mui/icons-material/AutoAwesome";
import Add from "@mui/icons-material/Add";
import PovSearchBar from "../../components/pov/PovSearchBar";
import PovList from "../../components/pov/PovList";
import { usePov } from "../../../hooks/usePov";

/* ── MUI keyframe animations ── */
const gradientShift = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulseGlow = keyframes`
  0%,100% { box-shadow: 0 0 0 0 rgba(99,102,241,0); }
  50%     { box-shadow: 0 0 28px 6px rgba(99,102,241,0.18); }
`;

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isDark = theme.palette.mode === "dark";

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);

  const { allPovs, searchedPovs, loading } = usePov({
    search: searchQuery,
    page,
    size: 20,
  });

  const displayPovs  = searchQuery ? searchedPovs : allPovs;
  const povItems     = displayPovs?.content  ?? [];
  const totalPages   = displayPovs?.totalPages ?? 1;

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(0); // reset pagination on new search
  };

  const primary   = theme.palette.primary.main;
  const secondary = theme.palette.secondary?.main ?? theme.palette.primary.light;

  return (
    <>
      <Box sx={{ maxWidth: 800, mx: "auto", pb: 12 }}>
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 5, md: 7 },
            animation: `${fadeSlideUp} 0.5s ease both`,
          }}
        >
          <Chip
            icon={<AutoAwesome sx={{ fontSize: "0.82rem !important" }} />}
            label="Perspectives, unfiltered"
            size="small"
            sx={{
              mb: 3,
              px: 1,
              fontWeight: 700,
              letterSpacing: 0.5,
              fontSize: "0.72rem",
              bgcolor: alpha(primary, isDark ? 0.18 : 0.1),
              color: "primary.main",
              border: "1px solid",
              borderColor: alpha(primary, 0.25),
              "& .MuiChip-icon": { color: "primary.main" },
              animation: `${pulseGlow} 3.5s ease-in-out infinite`,
            }}
          />

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
            <Box
              component="span"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${alpha(theme.palette.text.primary, 0.5)} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Discover{" "}
            </Box>

            <Box
              component="span"
              sx={{
                background: `linear-gradient(270deg, ${primary}, ${secondary}, ${alpha(primary, 0.65)}, ${primary})`,
                backgroundSize: "300% 300%",
                animation: `${gradientShift} 5s ease infinite`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              True
            </Box>

            <br />

            <Box
              component="span"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${alpha(theme.palette.text.primary, 0.5)} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Perspectives
            </Box>
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              fontWeight: 400,
              fontSize: { xs: "1rem", md: "1.1rem" },
              lineHeight: 1.7,
              maxWidth: 520,
              mx: "auto",
              mb: 4,
            }}
          >
            Join a community dedicated to sharing transparent, profound, and
            unbiased viewpoints from around the globe.
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: "center",
            }}
          >
            <Button
              id="hero-cta-share"
              variant="contained"
              size="large"
              startIcon={<Add />}
              onClick={() => navigate("/account")}
              sx={{
                borderRadius: "12px",
                fontWeight: 800,
                textTransform: "none",
                fontSize: "0.95rem",
                px: 3.5,
                py: 1.2,
                background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
                boxShadow: `0 8px 32px -8px ${alpha(primary, 0.55)}`,
                transition: "all 0.25s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: `0 14px 40px -8px ${alpha(primary, 0.65)}`,
                },
              }}
            >
              Share Your PoV
            </Button>

            <Button
              id="hero-cta-learn"
              variant="outlined"
              size="large"
              sx={{
                borderRadius: "12px",
                fontWeight: 700,
                textTransform: "none",
                fontSize: "0.95rem",
                px: 3.5,
                py: 1.2,
                borderColor: alpha(primary, 0.4),
                color: "text.primary",
                transition: "all 0.25s ease",
                "&:hover": {
                  borderColor: primary,
                  bgcolor: alpha(primary, 0.06),
                  transform: "translateY(-2px)",
                },
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Box>

        <Box sx={{ animation: `${fadeSlideUp} 0.6s ease both` }}>
          <PovSearchBar searchQuery={searchQuery} setSearchQuery={handleSearch} />
        </Box>

        <Box sx={{ animation: `${fadeSlideUp} 0.7s ease both` }}>
          <PovList
            povs={povItems}
            loading={loading}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            emptyMessage={
              searchQuery
                ? `No POVs found for "${searchQuery}"`
                : "No perspectives shared yet — be the first!"
            }
          />
        </Box>
      </Box>
      
      <Zoom in unmountOnExit>
        <Tooltip title="Share your perspective" placement="left" arrow>
          <Fab
            id="fab-share-pov"
            color="primary"
            aria-label="share pov"
            onClick={() => navigate("/account")}
            sx={{
              position: "fixed",
              bottom: 80,
              right: 16,
              zIndex: 1000,
              background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
              boxShadow: `0 8px 28px -4px ${alpha(primary, 0.55)}`,
              transition: "all 0.25s ease",
              "&:hover": {
                transform: "scale(1.08) translateY(-2px)",
                boxShadow: `0 14px 36px -4px ${alpha(primary, 0.65)}`,
              },
            }}
          >
            <Add />
          </Fab>
        </Tooltip>
      </Zoom>
    </>
  );
};

export default Home;
