import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid2,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  LockPersonOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  strengthColor,
  strengthIndicator,
} from "../../../../utils/password-strength";
import { signUpUserWithEmailAndPassword } from "../../../../services/firebase/config/firebase-auth";
import { setUserFirebase } from "../../../../services/firebase/controller/user-firebase";
import { ErrorSnackbar } from "../../ui/snackbar/ErrorSnackbar";

export const AuthRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
  const [openErrorSnackBar, setOpen] = useState(false);

  useEffect(() => {
    if (firstName && lastName && email && password && checked) {
      setError("");
    } else {
      setError("*please fill required fields");
    }
  }, [firstName, lastName, email, password, checked]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseErrorSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
    await signUpUserWithEmailAndPassword(
      user.email,
      user.password,
      user.name.first + " " + user.name.last,
      "https://source.unsplash.com/random"
    )
      .then((signedUpUser) => {
        // console.log("signed up user to save ",signedUpUser) remove
        if (signedUpUser) {
          setUserFirebase({
            uid: signedUpUser.uid,
            displayName: signedUpUser.displayName,
            email: signedUpUser.email,
            displayPicture: signedUpUser.photoURL,
            name: user.name,
          })
            .then((savedUserFirebase) => {
              // console.log(savedUserFirebase); // remove
              setLoading(false);

              // Check if there's a previous location in the state object
              if (location.state && location.state.from) {
                // Navigate back to the previous location
                navigate(location.state.from);
              } else {
                // If there's no previous location, navigate to the user's dashboard
                navigate("/", { replace: true });
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
      })
      .finally(setLoading(false));
    // console.log("signedup: ", signedUpUser);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);

    // user register
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");

    const user = {
      name: {
        first: firstName,
        last: lastName,
      },
      email: email,
      password: password,
    };
    signUpUser(user);
  };

  return (
    <>
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
        <Avatar sx={{ m: 1, bgcolor: "inherit" }}>
          <LockPersonOutlined />
        </Avatar>

        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={2} sx={{ mt: 1 }}>
            <Grid2 item xs={12} sm={6}>
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
            </Grid2>
            <Grid2 item xs={12} xl={6}>
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
            </Grid2>
            <Grid2 item xs={12}>
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
            </Grid2>
            <Grid2 item xs={12}>
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

              {strength !== 0 && (
                <FormControl fullWidth="true">
                  <Box sx={{ my: 1 }}>
                    <Grid2 container spacing={2} alignItems="center">
                      <Grid2 item>
                        <Box
                          style={{ backgroundColor: level?.color }}
                          sx={{ width: 85, height: 8, borderRadius: "7px" }}
                        />
                      </Grid2>
                      <Grid2 item>
                        <Typography variant="subtitle1" fontSize="0.75rem">
                          {level?.label}
                        </Typography>
                      </Grid2>
                    </Grid2>
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
            </Grid2>

            <Grid2 item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    required
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
                      Terms & Conditions.
                    </Typography>
                  </Typography>
                }
              />
            </Grid2>
          </Grid2>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={error ? true : false}
          >
            {loading ? (
              <CircularProgress variant="indeterminate" color="primary" />
            ) : (
              "Sign Up"
            )}
          </Button>
          {/* </Box> */}
        </form>
      </Box>
      <ErrorSnackbar
        openErrorSnackBar={openErrorSnackBar}
        handleCloseErrorSnackBar={handleCloseErrorSnackBar}
        error={error}
      />
    </>
  );
};
