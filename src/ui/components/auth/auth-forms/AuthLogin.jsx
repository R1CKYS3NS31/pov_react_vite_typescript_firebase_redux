import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Grid2,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LockPersonOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { signInUserWithEmailAndPassword } from "../../../../services/firebase/config/firebase-auth";
import { getUserFirebase } from "../../../../services/firebase/controller/user-firebase";
import { ErrorSnackbar } from "../../ui/snackbar/ErrorSnackbar";

export const AuthLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openErrorSnackBar, setOpen] = useState(false);

  useEffect(() => {
    if (email && password) {
      setError("");
      setOpen(false);
    } else {
      setError("*please fill required fields");
    }
  }, [email, password]);

  const handleCloseErrorSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const signInUser = async (user) => {
    await signInUserWithEmailAndPassword(await user.email, await user.password)
      .then((signedInUser) => {
        // console.log(signedInUser); remove

        if (signedInUser) {
          const { uid, accessToken } = signedInUser;
          getUserFirebase(uid)
            .then((userFirebase) => {
              // console.log(userFirebase); remove

              if (userFirebase.uid && accessToken) {
                setLoading(false);
                // Check if there's a previous location in the state object
                if (location.state && location.state.from) {
                  // Navigate back to the previous location
                  navigate(location.state.from);
                } else {
                  // If there's no previous location, navigate to the user's dashboard
                  navigate("/", { replace: true });
                }
              }
            })
            .catch((error) => {
              throw error;
            });
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
        setOpen(true);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    const user = {
      email: email,
      password: password,
    };
    signInUser(user);
  };

  return (
    <>
      <Box
        sx={{
          my: 2,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "inherit" }}>
          <LockPersonOutlined />
        </Avatar>

        {/* inputs */}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            placeholder="example@domain.com"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            placeholder="password"
            label="Password"
            // type="password"
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            endadornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="large"
                >
                  {showPassword ? (
                    <VisibilityOutlined />
                  ) : (
                    <VisibilityOffOutlined />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText
            sx={{
              color: "red",
            }}
          >
            {error}
          </FormHelperText>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={error || loading ? true : false}
          >
            {loading ? (
              <CircularProgress variant="indeterminate" color="primary" />
            ) : (
              "Sign In"
            )}
          </Button>
          <Grid2 container>
            <Grid2 item xs>
              <Typography
                component={Link}
                to="/signin"
                variant="subtitle1"
                sx={{ textDecoration: "none" }}
              >
                Forgot password?
              </Typography>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
      <ErrorSnackbar
        openErrorSnackBar={openErrorSnackBar}
        handleCloseErrorSnackBar={handleCloseErrorSnackBar}
        error={error}
      />
    </>
  );
};
