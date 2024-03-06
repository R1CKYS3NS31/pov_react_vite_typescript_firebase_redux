import { useTheme } from "@emotion/react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Google from "../../../assets/icons/social-google.svg";
import {
  LockPersonOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { setAccountUser } from "../../../services/redux/slices/user/accountUserSlice";
import { signin } from "../../../services/api/user/api-auth";
import { auth } from "../../../utils/auth_helper";
import {
  isUserSignedIn,
  signInWithGoogleAUth,
} from "../../../services/firebase/config/firebase-auth";
import { saveUserFirebase } from "../../../services/firebase/controller/user-firebase";

export const AuthLogin = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleAuthError, setGoogleAuthError] = useState("");

  useEffect(() => {
    if (email && password) {
      setError("");
    } else {
      setError("*please fill required fields");
    }
  }, [email, password]);

  // sign in with Google
  const googleHandler = async () => {
    try {
      setGoogleAuthError("");
      setLoading(true);
      const signedIn = await signInWithGoogleAUth();
      if (signedIn && isUserSignedIn()) {
        setLoading(false);
        console.log('user',signedIn.user); // remove log
        const token = await signedIn.user.getIdToken();
        const { uid, displayName, email, photoUrl } = signedIn.user;
        const { first, last } = displayName;
        const user = {
          uid: uid, // potential error
          name: {
            first: first,
            last: last,
          },
          email: email,
          photoUrl: photoUrl,
        };

        auth.authenticate(token, () => {
          dispatch(setAccountUser({ token: token, user: user }));
        });

        const savedUser = await saveUserFirebase(user);
        console.log(savedUser); // remove log
      }
    } catch (error) {
      // setGoogleAuthError(error);
      setLoading(false);
      console.error(`sign in with google - ${error}`);
    }
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
      // const signedInUser = await signin(user);
      const signedInUser = await signin(user);
      // console.log(signedInUser);

      if (signedInUser) {
        auth.authenticate(signedInUser.token, () => {
          dispatch(setAccountUser(signedInUser));
        });

        // Check if there's a previous location in the state object
        if (location.state && location.state.from) {
          // Navigate back to the previous location
          navigate(location.state.from);
        } else {
          // If there's no previous location, navigate to the user's dashboard
          navigate("/", { replace: true });
        }
      }
    } catch (error) {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // alert(errorCode + " - " + errorMessage);
      // alert(error);
      setError(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
      <Grid
        container
        direction={"column"}
        justifyContent={"center"}
        spacing={2}
      >
        <Grid item xs={12}>
          <Button
            disableElevation
            fullWidth
            onClick={googleHandler}
            size="large"
            variant="outlined"
            sx={{
              color: "grey.700",
              backgroundColor: theme.palette.grey[50],
              borderColor: theme.palette.grey[100],
            }}
          >
            {loading ? (
              "Loading..."
            ) : (
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                <img
                  src={Google}
                  alt="google"
                  width={16}
                  height={16}
                  style={{ marginRight: matchDownSM ? 8 : 16 }}
                />
              </Box>
            )}
            {" Sign in with Google"}
          </Button>
          <FormHelperText
            sx={{
              color: "red",
            }}
          >
            {googleAuthError}
          </FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <Button
              variant="outlined"
              sx={{
                cursor: "unset",
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.grey[100]} !important`,
                fontWeight: 500,
                borderRadius: "8px",
              }}
              disableRipple
              disabled
            >
              OR
            </Button>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          container
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              Sign in with Email address
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          my: 2,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
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
              // ricky has bugs
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="large"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
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
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
                name="remember"
                color="primary"
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={error ? true : false}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography
                component={Link}
                to="/signin"
                variant="subtitle1"
                sx={{ textDecoration: "none" }}
              >
                Forgot password?
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
