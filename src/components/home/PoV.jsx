import { Edit, LabelImportant } from "@mui/icons-material";
import { Card, Fab, Grid, Stack, Typography } from "@mui/material";

export const PoV = ({ pov }) => {
  return (
    <Grid
      container
      direction={"row"}
      sx={{
        flex: "2",
        mt: 5,
        width: "100%",
        // display:'flex'
      }}
    >
      <Grid
        item
        sx={
          {
            // width: "100%",
            // flex:'1'
          }
        }
        flexGrow={10}
      >
        <Card
          variant="elevation"
          elevation={10}
          sx={{
            display: "flex",
            padding: "15px",
            flexDirection: "column",
            borderRadius: "20px",
          }}
        >
          <Typography variant="h3" color={"primary"} sx={{ mb: 1 }}>
            {pov.title.toUpperCase()}
          </Typography>
          <Typography variant="subtitle1" color={"secondary"} sx={{ mb: 2 }}>
            {pov.subtitle}
          </Typography>
          {pov.points.split("\n").map((point) => (
            <Stack direction={"row"}>
              <LabelImportant sx={{ mr: 1 }} fontSize="small" />
              <Typography variant="p">{point}</Typography>
            </Stack>
          ))}
        </Card>
      </Grid>
      <Grid item flexGrow={1} margin={1}>
        <Fab size="small">
          <Edit fontSize="small" />
        </Fab>
      </Grid>
    </Grid>
  );
};
