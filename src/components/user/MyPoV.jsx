import { DeleteForever, Edit, LabelImportant } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Card,
  Fab,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { removePov } from "../../services/redux/slices/pov/povSlice";
import { deletePoVFirebase } from "../../services/firebase/controller/pov-firebase";

export const MyPoV = ({ pov }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accountUser = useSelector((state) => state.accountUser);
  const [error, setError] = useState("");

  const handleDeletePov = async (povId) => {
    try {
      // if (pov.owner === accountUser.user.uid) {
      // const povDeleted = await deletePoV(povId, accountUser.token);
      await deletePoVFirebase(povId);
      dispatch(removePov(povId));
      // }
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <Grid
      container
      direction={"row"}
      sx={{
        flex: "2",
        mt: 2,
        mb: 2,
      }}
    >
      <Grid
        item
        flexGrow={12}
        sx={{
          maxWidth: "58vw",
        }}
      >
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
      <Grid item flexGrow={1} margin={1}>
        <Grid container direction={"column"} spacing={1}>
          <Grid item>
            <Fab
              size="small"
              onClick={() => navigate(`/pov/edit/${pov.id}`, { replace: true })}
            >
              <Edit fontSize="small" />
            </Fab>
          </Grid>
          <Grid item>
            <Fab size="small" onClick={() => handleDeletePov(pov.id)}>
              <DeleteForever fontSize="small" />
            </Fab>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
