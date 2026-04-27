import { useParams, useNavigate } from "react-router-dom";
import { alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import PersonOutlineRounded from "@mui/icons-material/PersonOutlineRounded";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import { useProfile } from "../../../hooks/useProfile";
import PovList from "../../components/pov/PovList";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const primary = theme.palette.primary.main;

  const { profile, userPovs, loadingProfile } = useProfile(id);

  /* ── Loading ── */
  if (loadingProfile) {
    return (
      <Stack
        sx={{
          minHeight: "50vh",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <CircularProgress />
      </Stack>
    );
  }

  /* ── Not found ── */
  if (!profile) {
    return (
      <Stack 
      spacing={2} 
      sx={{
        py: 10,
        alignItems:"center",
        justifyContent:"center",
      }}>
        <Typography variant="h5" color="text.secondary" fontWeight={700}>
          User not found
        </Typography>
        <Button startIcon={<ArrowBackRounded />} variant="outlined" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Stack>
    );
  }

  const povItems   = userPovs?.content || (Array.isArray(userPovs) ? userPovs : []);
  const totalPages = userPovs?.totalPages || 1;

  const displayName =
    profile?.name?.full ||
    `${profile?.name?.first ?? ""} ${profile?.name?.last ?? ""}`.trim() ||
    "Unknown User";

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "calc(100vh - 48px)",
        p: { xs: 1.5, md: 2.5 },
      }}
    >
      {/* Ambient glow */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: "-10%",
          right: "5%",
          width: "55vw",
          height: "55vw",
          background: `radial-gradient(circle, ${alpha(primary, 0.07)} 0%, transparent 65%)`,
          filter: "blur(80px)",
          zIndex: 0,
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <Button
        startIcon={<ArrowBackRounded />}
        onClick={() => navigate(-1)}
        color="inherit"
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      <Grid container spacing={2.5} sx={{ position: "relative", zIndex: 1 }}>

        {/* ── Left: profile card ── */}
        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <Paper variant="glass" sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
            <Avatar
              src={profile?.displayPicture}
              sx={{
                width: 96,
                height: 96,
                fontSize: "2.4rem",
                fontWeight: 800,
                bgcolor: "primary.main",
                boxShadow: `0 6px 18px ${alpha(primary, 0.35)}`,
                mx: "auto",
                mb: 2,
              }}
            >
              {!profile?.displayPicture &&
                (profile?.name?.first?.[0] ?? <PersonOutlineRounded fontSize="large" />)}
            </Avatar>

            <Typography variant="h5" fontWeight={800} mb={0.5}>
              {displayName}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3, lineHeight: 1.6 }}>
              {profile?.description ?? "No bio provided."}
            </Typography>
            <Stack
              sx={{
                px: 2,
                py: 1.5,
                borderRadius: 2,
                bgcolor: alpha(primary, 0.08),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5" fontWeight={800} color="primary.main">
                {povItems.length}
              </Typography>
              <Typography variant="overline" color="text.secondary">
                Perspectives
              </Typography>
            </Stack>
          </Paper>
        </Grid>

        {/* ── Right: pov list ── */}
        <Grid size={{ xs: 12, md: 8, lg: 9 }}>
          <Stack
            direction="row"
            sx={{
              mb: 3,
              px: 1,
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Typography variant="h6" fontWeight={800}>
              {profile?.name?.first ? `${profile.name.first}'s Perspectives` : "Perspectives"}
            </Typography>
          </Stack>

          <PovList
            povs={povItems}
            loading={loadingProfile}
            totalPages={totalPages}
            emptyMessage={`${profile?.name?.first || "This user"} hasn't shared any perspectives yet.`}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
