import React, { useState } from "react";
import { alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Login from "@mui/icons-material/LoginRounded";
import Google from "@mui/icons-material/Google";
import ArrowForward from "@mui/icons-material/ArrowForwardRounded";

const SignIn = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { handleSignIn, handleGoogleSignIn, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSignIn(formData.email, formData.password).then((user) => {
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
        variant="glass"
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          maxWidth: 420,
          width: "100%",
        }}
      >
        <Stack spacing={3.5}>
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
              <Login />
            </Box>
            <Typography variant="h5" fontWeight={850} gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to continue to your POV
            </Typography>
          </Box>

          <Stack spacing={1.5} direction="row">
            <Button
              variant="outlined"
              startIcon={<Google />}
              onClick={() => handleGoogleSignIn().then((user) => { if(user) navigate("/"); })}
              fullWidth
              sx={{
                py: 1,
                borderRadius: 2.5,
                fontWeight: 700,
                borderColor: alpha(theme.palette.divider, 0.5),
                color: "text.primary",
                transition: "all 0.2s",
                "&:hover": {
                  borderColor: "primary.main",
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  transform: "translateY(-1px)",
                },
              }}
            >
              Google
            </Button>

            {/* <Button
              variant="outlined"
              startIcon={<GitHub />}
              onClick={() => {}}
              fullWidth
              disabled
              sx={{
                py: 1,
                borderRadius: 2.5,
                fontWeight: 700,
                borderColor: alpha(theme.palette.divider, 0.5),
                color: "text.primary",
              }}
            >
              GitHub
            </Button> */}
          </Stack>

          <Divider sx={{ my: 1 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ letterSpacing: 1 }}>
              OR SIGN IN WITH EMAIL
            </Typography>
          </Divider>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
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

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                endIcon={<ArrowForward />}
                sx={{ py: 1.2, mt: 1, borderRadius: 2.5 }}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </Stack>
          </form>

          <Divider sx={{ my: 0.5 }} />

          <Typography variant="body2" align="center" color="text.secondary">
            Don't have an account?{" "}
            <Button
              component={Link}
              to="/signup"
              variant="text"
              sx={{ fontWeight: 800, p: 0, minWidth: "auto", verticalAlign: "baseline", color: "primary.main" }}
            >
              Sign Up
            </Button>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default SignIn;

