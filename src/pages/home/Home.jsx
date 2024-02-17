import React from "react";
import { Container, Fab, Grid } from "@mui/material";
import { PoVs } from "../../components/home/PoVs";
import { AddCircleRounded, Login, Person2Rounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ display: "flex", gap: 2 }}>
      <Container sx={{ flex: 1 }}>
        <header>
          <h1>PoV</h1>
        </header>
      </Container>
      <Container sx={{ flex: 3, overflow:'scroll' }} fixed>
        <PoVs />
      </Container>
      <Grid
        container
        direction={"column"}
        sx={{
          flex: 1,
          p:'5px',
          height: "100vh",
          maxWidth: "100px",
          // backgroundColor: "#eee",
                  justifyContent: "space-between",
        }}
      >
        <Grid item marginTop={"20px"}>
          <Fab sx={{ m:'8px',backgroundColor: "transparent",}}>
            <Person2Rounded />
          </Fab>
          <Fab sx={{ m:'8px',backgroundColor: "transparent",}}>
            <Login/>
          </Fab>
        </Grid>
        <Grid item marginBottom={"50px"}>
          <Fab
            variant="extended"
            onClick={() => navigate("/create", { replace: true })}
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
