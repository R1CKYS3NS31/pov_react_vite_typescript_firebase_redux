import { AddCircleRounded, Settings } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardHeader,
  Divider,
  Fab,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { MyPoVs } from "../../../components/user/MyPoVs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Profile = () => {
  const navigate = useNavigate();
  const accountUser = useSelector((state) => state.accountUser);

  return (
    <Grid container justifyContent={"center"} sx={{ height: "100vh" }}>
      <Grid
        item
        sm={9}
        flexGrow={1}
        sx={{
          maxWidth: "100vh",
        }}
      >
        <Card
          elevation={10}
          sx={{
            justifySelf: "center",
            p: 1,
            height: "100vh",
            m: 1,
          }}
        >
          <CardHeader title={"Profile"} />
          <Grid
            container
            justifyContent={"space-between"}
            sx={{ width: "100%" }}
          >
            <Grid item flexGrow={11} sx={{ pl: 2 }}>
              <Grid container>
                <Grid item>
                  <Avatar
                    variant="rounded"
                    src={accountUser.user.photoUrl}
                    sx={{
                      height: "80px",
                      width: "80px",
                    }}
                  />
                </Grid>
                <Grid item sx={{ pl: 1 }}>
                  <Typography variant="h4">
                    {accountUser.user.name.first +
                      " " +
                      accountUser.user.name.last}
                  </Typography>
                  <Typography variant="caption">
                    {new Date(accountUser.user.createdAt.seconds).toDateString()}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item flexGrow={1} justifySelf={"flex-end"}>
              <IconButton color="secondary">
                <Settings />
              </IconButton>
            </Grid>
          </Grid>
          <Divider variant="middle" sx={{ mt: 2 }} />
          <Grid item flexGrow={1}>
            <Grid container>
              <Grid
                item
                flexGrow={24}
                sx={{ height: "80vh", overflow: "scroll", pl: 2, mb: 1, mt: 1 }}
              >
                <MyPoVs />
              </Grid>
              <Grid item flexGrow={1}>
                <Grid
                  container
                  direction={"column"}
                  sx={{
                    flex: 1,
                    // p: "5px",
                    height: "80vh",
                    // maxWidth: "100px",
                    // backgroundColor: "#eee",
                    justifyContent: "space-between",
                  }}
                >
                  <Grid item marginTop={"20px"}></Grid>
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
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};
