import { useTheme } from "@emotion/react";
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Grid2,
  IconButton,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LockPersonOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { isUserSignedIn, signInUserWithEmailAndPassword } from "../../../../services/firebase/config/firebase-auth";
import { getUserFirebase } from "../../../../services/firebase/controller/user-firebase";

export const AuthLogin = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();
  const location = useLocation();

  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (email && password) {
      setError("");
      setOpen(false);
    } else {
      setError("*please fill required fields");
    }
  }, [email, password]);

  const handleClose = (event, reason) => {
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
    try {
      const signedInUser = await signInUserWithEmailAndPassword(await user.email,await user.password);
      // console.log('signed user',signedInUser); // remove log

      if (signedInUser && isUserSignedIn()) {
        const {uid, accessToken } = signedInUser
        const userFirebase = await getUserFirebase(uid)
        if (userFirebase.exists && accessToken) {
          setLoading(false)
           // Check if there's a previous location in the state object
          if (location.state && location.state.from) {
            // Navigate back to the previous location
            navigate(location.state.from);
          } else {
            // If there's no previous location, navigate to the user's dashboard
            navigate("/", { replace: true });
          }
        }
      }
    } catch (error) {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // alert(errorCode + " - " + errorMessage);
      // alert(error);
      setLoading(false);
      console.log(error)
      setError(error.message);
      setOpen(true);
    }
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

    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
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
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="large"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
          <FormHelperText
            sx={{
              color: "red",
            }}
          >
            {error}
          </FormHelperText>
          {/* <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
                name="remember"
                color="primary"
              />
            }
            label="Remember me"
          /> */}
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
      <Snackbar
        open={open}
        autoHideDuration={10000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Alert
          // title="Error"
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};
