import { useTheme } from "@emotion/react";
import {
  Divider,
  Grid2,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  AuthCardWrapper,
  AuthWrapper,
} from "../../../components/auth/AuthWrapper";
import { Link } from "react-router-dom";
import { Logo } from "../../../components/ui/Logo";
import { AuthLogin } from "../../../components/auth/auth-forms/AuthLogin";
import { AuthFooter } from "../../../components/ui/cards/AuthFooter";

export const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AuthWrapper>
      <Grid2
        container
        direction={"column"}
        justifyContent={"flex-end"}
        sx={{ minheight: "100vh" }}
      >
        <Grid2 item xs={12}>
          <Grid2
            container
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ minHeight: "calc(100vh-60px)" }}
          >
            <Grid2 item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid2
                  container
                  spacing={2}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Grid2 item sx={{ mb: 0 }}>
                    <Typography
                      component={Link}
                      to="/"
                      variant="subtitle1"
                      sx={{ textDecoration: "none" }}
                    >
                      <Logo />
                    </Typography>
                  </Grid2>
                  <Grid2 item xs={12}>
                    <Grid2
                      container
                      direction={matchDownSM ? "column-reverse" : "row"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Grid2 item>
                        <Stack
                          alignItems={"center"}
                          justifyContent={"center"}
                          spacing={1}
                        >
                          <Typography
                            color={theme.palette.secondary.main}
                            gutterBottom
                            variant={matchDownSM ? "h3" : "h2"}
                          >
                            Hi, Welcome Back
                          </Typography>
                          <Typography
                            variant="caption"
                            fontSize={"16px"}
                            textAlign={matchDownSM ? "center" : "inherit"}
                          >
                            Enter your credentials to continue
                          </Typography>
                        </Stack>
                      </Grid2>
                    </Grid2>
                  </Grid2>
                  <Grid2 item xs={12}>
                    {/* auth form - login */}
                    <AuthLogin />
                  </Grid2>
                  <Grid2 item xs={12}>
                    <Divider />
                  </Grid2>
                  <Grid2 item xs={12}>
                    <Grid2
                      item
                      container
                      direction={"column"}
                      alignItems={"center"}
                      xs={12}
                    >
                      <Typography
                        component={Link}
                        to={"/signup"}
                        variant="subtitle1"
                        sx={{ textDecoration: "none" }}
                      >
                        Don&apos;t have an account?
                      </Typography>
                    </Grid2>
                  </Grid2>
                </Grid2>
              </AuthCardWrapper>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid2>
      </Grid2>
    </AuthWrapper>
  );
};
