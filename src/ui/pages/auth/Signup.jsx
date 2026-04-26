import React, { useState } from "react";
import { alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import PersonAddRounded from "@mui/icons-material/PersonAddRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import Google from "@mui/icons-material/Google";

const Signup = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { handleSignUp, handleGoogleSignIn, loading } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    description: "I am a new user ready to explore different perspectives!",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return; // Validation error handle
    }

    const userData = {
      name: { first: formData.firstName, last: formData.lastName },
      email: formData.email,
      password: formData.password,
      description: formData.description,
    };

    await handleSignUp(userData).then((user) => {
      if (user) navigate("/");
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 100px)",
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          maxWidth: 440,
          width: "100%",
          bgcolor: alpha(theme.palette.background.paper, 0.7),
          backdropFilter: "blur(20px)",
          border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
          boxShadow: theme.shadows[3],
        }}
      >
        <Stack spacing={3}>
          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                bgcolor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "primary.contrastText",
                mx: "auto",
                mb: 2,
                boxShadow: `0 8px 24px -4px ${alpha(theme.palette.primary.main, 0.5)}`,
              }}
            >
              <PersonAddRounded />
            </Box>
            <Typography variant="h5" fontWeight={850} gutterBottom>
              Join POV
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create an account to share your unique perspectives.
            </Typography>
          </Box>

          <Stack spacing={1.5} direction="row">
            <Button
              variant="outlined"
              startIcon={<Google />}
              onClick={() =>
                handleGoogleSignIn().then((user) => {
                  if (user) navigate("/");
                })
              }
              fullWidth
              sx={{
                py: 1,
                borderRadius: 2.5,
                fontWeight: 700,
                borderColor: alpha(theme.palette.divider, 0.5),
                color: "text.primary",
                "&:hover": {
                  borderColor: "primary.main",
                  transform: "translateY(-1px)",
                },
              }}
            >
              Google
            </Button>
            {/* <Button
              variant="outlined"
              startIcon={<GitHub />}
              onClick={() => handleSignIn("github")}
              fullWidth
              sx={{
                py: 1,
                borderRadius: 2.5,
                fontWeight: 700,
                borderColor: alpha(theme.palette.divider, 0.5),
                color: "text.primary",
                "&:hover": { borderColor: "primary.main", transform: "translateY(-1px)" },
              }}
            >
              GitHub
            </Button> */}
          </Stack>

          <Divider sx={{ my: 1 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={700}
              sx={{ letterSpacing: 1 }}
            >
              OR REGISTER WITH EMAIL
            </Typography>
          </Divider>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="First Name"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Last Name"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                size="small"
                label="Email Address"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                size="small"
                label="Password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                size="small"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                error={
                  formData.password !== formData.confirmPassword &&
                  formData.confirmPassword !== ""
                }
              />

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                endIcon={<ArrowForwardRounded />}
                sx={{
                  py: 1.2,
                  borderRadius: 2.5,
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary?.main || theme.palette.primary.light} 100%)`,
                  boxShadow: `0 6px 20px -4px ${alpha(theme.palette.primary.main, 0.5)}`,
                }}
              >
                {loading ? "Creating..." : "Create Account"}
              </Button>
            </Stack>
          </form>

          <Divider sx={{ my: 0.5 }} />

          <Typography variant="body2" align="center" color="text.secondary">
            Already have an account?{" "}
            <Button
              component={Link}
              to="/signin"
              variant="text"
              sx={{
                fontWeight: 800,
                p: 0,
                minWidth: "auto",
                verticalAlign: "baseline",
                color: "primary.main",
              }}
            >
              Sign In
            </Button>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Signup;
