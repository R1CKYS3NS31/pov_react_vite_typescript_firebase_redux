import { LabelImportant } from "@mui/icons-material";
import { Card, Grid, Stack, Typography } from "@mui/material";

export const PoV = ({ pov }) => {
  // const navigate = useNavigate();
  return (
    <Grid
      container
      direction={"row"}
      sx={{
        flex: "2",
        mt: 2,
        mb: 2,
        // width: "100%",
      }}
    >
      <Grid item flexGrow={12}>
        <Card
          variant="elevation"
          elevation={10}
          sx={{
            display: "flex",
            padding: "15px",
            flexDirection: "column",
            borderRadius: "30px",
            // minHeight: "80vh",
          }}
        >
          <Typography
            variant="h3"
            color={"primary"}
            sx={{ mb: 1, overflowWrap: "anywhere" }}
          >
            {pov.title.toUpperCase()}
          </Typography>
          <Typography
            variant="subtitle1"
            color={"secondary"}
            sx={{ mb: 2, overflowWrap: "anywhere" }}
          >
            {pov.subtitle}
          </Typography>
          {pov.points.split("\n").map((point, i) => (
            <Stack direction={"row"} key={i}>
              <LabelImportant sx={{ mr: 1 }} fontSize="small" />
              <Typography variant="p" sx={{ overflowWrap: "anywhere" }}>
                {point}
              </Typography>
            </Stack>
          ))}
        </Card>
      </Grid>
      {/* <Grid item flexGrow={1} margin={1}>
        <Grid container direction={"column"} spacing={1}>
          <Grid item>
            <Fab
              size="small"
              onClick={() =>
                navigate(`/pov/edit/${pov.id}`, { replace: true })
              }
            >
              <Edit fontSize="small" />
            </Fab>
          </Grid>
          <Grid item>
            <Fab size="small" onClick={}>
              <DeleteForever fontSize="small" />
            </Fab>
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  );
};
