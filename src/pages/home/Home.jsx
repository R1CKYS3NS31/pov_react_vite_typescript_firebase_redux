import React from "react";
import { Avatar, Container, Fab, Grid, Typography } from "@mui/material";
import {
  AddCircleRounded,
  Login,
  Logout,
  NotificationImportantOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutAccountUser } from "../../services/redux/slices/user/accountUserSlice";
import { Logo } from "../../components/ui/Logo";
import { PoVs } from "../pov/PoVs";
import { auth } from "../../utils/auth_helper";
import { signOutFirebaseUser } from "../../services/firebase/config/firebase-auth";

export const Home = () => {
  const navigate = useNavigate();
  const accountUser = useSelector((state) => state.accountUser);
  const dispatch = useDispatch();

  const handleAuth = async () => {
    accountUser
      ? signOutFirebaseUser() &&
        auth.clearJWT() &&
        dispatch(signOutAccountUser())
      : navigate("/signin", { replace: "true" });
  };

  const handleProfile = () => {
    accountUser
      ? navigate("/profile")
      : navigate("/signin", { replace: "true" });
  };

  return (
    <Container sx={{ display: "flex", gap: 2 }}>
      <Container sx={{ flex: 1 }}>
        <header>
          <Logo />
        </header>
      </Container>
      <Container sx={{ flex: 3, overflow: "scroll", maxHeight: "100vh" }} fixed>
        <PoVs />
      </Container>
      <Grid
        container
        direction={"column"}
        sx={{
          flex: 1,
          p: "5px",
          height: "100vh",
          // maxWidth: "100px",
          // backgroundColor: "#eee",
          justifyContent: "space-between",
        }}
      >
        <Grid item marginTop={"20px"}>
          <Fab
            variant="extended"
            sx={{ m: "8px", backgroundColor: "transparent" }}
            onClick={handleProfile}
          >
            <Avatar
              alt="Ricky Sensei"
              src={accountUser && accountUser.user.photoUrl}
              sx={{ m: "8px" }}
            />
            <Typography variant="h5">
              {accountUser ? accountUser.user.first : "Guest"}
            </Typography>
          </Fab>
          <Fab
            variant="extended"
            sx={{ m: "8px", backgroundColor: "transparent" }}
            onClick={handleAuth}
          >
            {accountUser ? (
              <Login sx={{ m: "8px", color: "" }} />
            ) : (
              <Logout sx={{ m: "8px", color: "" }} />
            )}

            <Typography variant="h5">
              {accountUser ? "Sign Out" : "Sign In"}
            </Typography>
          </Fab>
          <Fab size="small" sx={{ m: "8px", backgroundColor: "transparent" }}>
            <NotificationImportantOutlined />
          </Fab>
        </Grid>
        <Grid item marginBottom={"50px"}>
          <Fab
            variant="extended"
            onClick={() => navigate("/pov/create")}
            sx={{
              backgroundColor: "transparent",
            }}
          >
            <AddCircleRounded color="secondary" sx={{ pr: 1 }} />
            PoV
          </Fab>
        </Grid>
      </Grid>
    </Container>
  );
};
