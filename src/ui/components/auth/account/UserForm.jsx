import { ChangeCircleOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  CircularProgress,
  FormHelperText,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export const UserForm = ({
  handleSubmitUser,
  updateUserHandle,
  userAccount,
  loading,
  error,
  setError,
}) => {
  const [email, setEmail] = useState(userAccount.email);
  const [tel, setTel] = useState(userAccount.tel);
  const [firstName, setFirstName] = useState(userAccount.name.first);
  const [lastName, setLastName] = useState(userAccount.name.last);
  const [description, setDescription] = useState(userAccount.description);
  const [displayPicture, setPhotoUrl] = useState(userAccount.displayPicture);

  useEffect(() => {
    if (firstName && lastName && email && tel && description) {
      setError("");
    } else {
      setError("*please fill required fields");
    }
  }, [firstName, lastName, email, tel, description, setError]);

  // Function to handle file input change
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoUrl(reader.result);
    };
    reader.readAsDataURL(file);

    const user = new FormData();
    user.append("displayPicture", file);
    await updateUserHandle(user);
  };

  return (
    <form onSubmit={handleSubmitUser}>
      <Grid2 container size={{ xs: 12 }} spacing={2} sx={{ p: 1 }}>
        <Grid2 item size={{ xs: 12, sm: 4 }}>
          <Stack direction={"column"}>
            <Avatar
              variant="rounded"
              alt={firstName}
              src={displayPicture}
              sx={{ width: "100px", height: "100px" }}
            />

            <label htmlFor="displayPicture">
              <Button
                variant="outlined"
                component={"span"}
                fullWidth
                color="inherit"
                size="large"
                disableRipple
                disableElevation
                sx={{
                  background: "inherit",
                  borderRadius: "50px",
                  border: "none",
                }}
                startIcon={<ChangeCircleOutlined />}
              >
                Profile picture
              </Button>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="displayPicture"
              name="displayPicture"
            />
          </Stack>
        </Grid2>
        <Grid2 item size={{ xs: 12, sm: 8 }} container spacing={1}>
          <Grid2 item size={{ xs: 12, sm: 6 }}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              placeholder="other names"
              required
              fullWidth
              variant="standard"
              id="firstName"
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              // autoFocus
            />
          </Grid2>
          <Grid2 item size={{ xs: 12, sm: 6 }}>
            <TextField
              required
              fullWidth
              variant="standard"
              id="lastName"
              label="Last Name"
              name="lastName"
              placeholder="surname"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid2>
          <Grid2 item size={{ xs: 12, sm: 8 }}>
            <TextField
              required
              fullWidth
              variant="standard"
              id="email"
              label="Email Address"
              name="email"
              placeholder="example@domain.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid2>
        </Grid2>
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <TextField
            required
            fullWidth
            variant="standard"
            id="tel"
            label="Telephone/Mobile Number"
            name="tel"
            type="number"
            placeholder="254712345678"
            autoComplete="tel"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
        </Grid2>
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <TextField
            required
            variant="standard"
            margin="dense"
            id="description"
            name="description"
            placeholder="description"
            label="Descrition/About"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            maxRows={4}
            fullWidth
            autoComplete="description"
            helperText="user description or about"
          />
        </Grid2>

        <Grid2 item size={{ xs: 12 }}>
          <FormHelperText
            component={Typography}
            variant="subtitle1"
            sx={{
              color: "error.main",
            }}
          >
            {error}
          </FormHelperText>
        </Grid2>
        <Grid2 item size={{ xs: 12, sm: 6 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={error || loading ? true : false}
          >
            {loading ? (
              <CircularProgress variant="indeterminate" color="primary" />
            ) : (
              "Submit Account Setting"
            )}
          </Button>
        </Grid2>
      </Grid2>
    </form>
  );
};
