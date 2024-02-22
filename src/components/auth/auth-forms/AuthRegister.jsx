import { useTheme } from "@emotion/react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";

//
import Google from "../../../assets/icons/social-google.svg";
import {
  LockPersonOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  strengthColor,
  strengthIndicator,
} from "../../../utils/password-strength";
import { signUp } from "../../../services/api/user/api-auth";
import { setAccountUser } from "../../../services/redux/slices/user/accountUserSlice";
import { auth } from "../../../utils/auth_helper";
import {
  currentUser,
  isUserSignedIn,
  saveUserAccount,
  signInWithGoogleAUth,
} from "../../../services/firebase/firebase-auth";
import { saveUserFirebase } from "../../../services/firebase/model/user-firebase";

export const AuthRegister = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // agreement
  const [checked, setChecked] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleAuthError, setGoogleAuthError] = useState("");

  useEffect(() => {
    if (firstName && lastName && email && password) {
      setError("");
    } else {
      setError("*please fill required fields");
    }
  }, [firstName, lastName, email, password]);

  const googleHandler = async () => {
    try {
      setGoogleAuthError("");
      setLoading(true);
      const signedInUser = await signInWithGoogleAUth();
      if (signedInUser) {
        setLoading(false);
        if (isUserSignedIn()) {
          const savedUser = await saveUserAccount();
          // console.log(savedUser);
          const token = savedUser.getIdToken()
        }
      }
    } catch (error) {
      // setGoogleAuthError(error);
      setLoading(false);
      console.log(`sign in with google - ${googleAuthError}`);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    setPassword(value);
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  const signUpUser = async (user) => {
    try {
      const signedUpUser = await signUp(user);
      // console.log(signedUpUser);

      if (signedUpUser) {
        auth.authenticate(signedUpUser.token, () => {
          dispatch(setAccountUser(signedUpUser));
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
      // alert(error)
      setError(`* ${error}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // user register
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");
    const name =
      firstName.toLocaleUpperCase() + " " + lastName.toLocaleUpperCase();

    const user = {
      name: name,
      email: email,
      password: password,
    };
    signUpUser(user);
    // console.log(user);
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            fullWidth
            onClick={googleHandler}
            size="large"
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
            Sign up with Google
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
          <Box sx={{ alignItems: "center", display: "flex" }}>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <Button
              variant="outlined"
              sx={{
                cursor: "unset",
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.grey[100]} !important`,
                color: `${theme.palette.grey[900]}!important`,
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
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              Sign up with Email address
            </Typography>
          </Box>
        </Grid>
      </Grid>
      {/* inputs */}
      <Box
        sx={{
          mt: 2,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockPersonOutlined />
        </Avatar>

        <form onSubmit={handleSubmit}>
          {/* <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}> */}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                placeholder="other names"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                placeholder="surname"
                autoComplete="family-name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                placeholder="example@domain.com"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="password"
                label="Password"
                // type="password"
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={(e) => {
                  // handleChange(e);
                  changePassword(e.target.value);
                }}
                autoComplete="new-password"
                endAdornment={
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

              {strength !== 0 && (
                <FormControl fullwidth>
                  <Box sx={{ my: 1 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Box
                          style={{ backgroundColor: level?.color }}
                          sx={{ width: 85, height: 8, borderRadius: "7px" }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" fontSize="0.75rem">
                          {level?.label}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </FormControl>
              )}

              <FormHelperText
                sx={{
                  color: "red",
                }}
              >
                {error}
              </FormHelperText>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    color="primary"
                  />
                }
                label={
                  <Typography variant="subtitle1">
                    Agree with &nbsp;
                    <Typography variant="subtitle1" component={Link} to="#">
                      Terms & Condition.
                    </Typography>
                  </Typography>
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={error ? true : false}
          >
            Sign Up
          </Button>
          {/* </Box> */}
        </form>
      </Box>
    </>
  );
};
