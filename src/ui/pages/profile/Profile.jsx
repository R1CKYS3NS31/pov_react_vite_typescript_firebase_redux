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
import PersonOutlineIcon from "@mui/icons-material/PersonOutlineRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBackRounded";
import { useProfile } from "../../../hooks/useProfile";
import PovList from "../../components/pov/PovList";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;

  const { profile, userPovs, loadingProfile } = useProfile(id);

  if (loadingProfile) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h5" color="text.secondary" fontWeight={700}>
          User not found
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mt: 3, borderRadius: 2, fontWeight: 600 }}
          variant="outlined"
        >
          Go Back
        </Button>
      </Box>
    );
  }

  const povItems = userPovs?.content || (Array.isArray(userPovs) ? userPovs : []);
  const totalPages = userPovs?.totalPages || 1;

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "calc(100vh - 48px)",
        p: { xs: 1.5, md: 2.5 },
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: "-10%",
          right: "5%",
          width: "55vw",
          height: "55vw",
          background: `radial-gradient(circle, ${alpha(primary, isDark ? 0.1 : 0.05)} 0%, transparent 65%)`,
          filter: "blur(80px)",
          zIndex: 0,
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2, fontWeight: 700, borderRadius: 2 }}
        color="inherit"
      >
        Back
      </Button>

      <Grid
        container
        spacing={2.5}
        sx={{ position: "relative", zIndex: 1, width: "100%" }}
      >
        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
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
                (profile?.name?.first?.[0] ?? <PersonOutlineIcon fontSize="large" />)}
            </Avatar>

            <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
              {profile?.name?.full ||
                `${profile?.name?.first ?? ""} ${profile?.name?.last ?? ""}`.trim() ||
                "Unknown User"}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1, mb: 3, lineHeight: 1.6 }}
            >
              {profile?.description ?? "No bio provided."}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
            
              sx={{  justifyContent:"center", mb: 1, flexWrap: "wrap" }}
            >
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  borderRadius: 2,
                  bgcolor: alpha(primary, 0.08),
                  minWidth: 120,
                }}
              >
                <Typography variant="h5" fontWeight={800} color="primary.main">
                  {povItems.length}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={700}
                  sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
                >
                  Perspectives
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 8, lg: 9 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
              px: 1,
            }}
          >
            <Typography variant="h6" fontWeight={800} color="text.primary">
              {profile?.name?.first ? `${profile.name.first}'s Perspectives` : "Perspectives"}
            </Typography>
          </Box>

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
