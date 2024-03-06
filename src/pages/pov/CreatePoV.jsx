import {
  Button,
  Card,
  CardHeader,
  FormGroup,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addPoV } from "../../services/redux/slices/pov/povSlice";
import {
  getPoVFirebase,
  savePoVFirebase,
} from "../../services/firebase/controller/pov-firebase";

export const CreatePoV = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // const [state, dispatch] = useReducer(first, second, third)

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [points, setPoints] = useState("");
  const [error, setError] = useState("");
  const accountUser = useSelector((state) => state.accountUser);

  useEffect(() => {
    if (title && subtitle && points) {
      setError("");
    } else {
      setError("*please fill required fields");
    }
  }, [title, subtitle, points]);

  //  submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // const poVFormData = new FormData(event.currentTarget);
      const newPov = {
        // id: new Date(),
        title: title,
        subtitle: subtitle,
        points: points,
        owner: accountUser.user.uid,
      };

      // poVFormData.append("title", newPov.id);
      // poVFormData.append("title", newPov.title);
      // poVFormData.append("subtitle", newPov.subtitle);
      // poVFormData.append("points", newPov.points);

      // console.log(`pov created: ${newPov.title}`);

      if (accountUser) {
        // const povCreated = await createPoV(newPov);
        const povCreated = await savePoVFirebase(newPov);
        console.log('new PoV',povCreated);
        if (povCreated) {
          const povId = povCreated.id;
          const pov = await getPoVFirebase(povId);
          console.log(pov);
          if (pov.exists()) {
            dispatch(addPoV(pov.data));
            setTitle("");
            setSubtitle("");
            setPoints("");
            // Check if there's a previous location in the state object
            if (location.state && location.state.from) {
              // Navigate back to the previous location
              navigate(location.state.from);
            } else {
              // If there's no previous location, navigate to the user's dashboard
              navigate("/", { replace: true });
            }
          }
        }
      } else {
        setError(`*${error}`);
      }
    } catch (error) {
      console.log(error);
      setError(`*${error}`);
      // alert(`Error creating PoV: ${error}`);
    }
  };

  const handleCancel = async () => {
    setTitle("");
    setSubtitle("");
    setPoints("");
    navigate("/", { replace: true });
  };

  return (
    <Grid
      container
      sx={{
        mt: 5,
      }}
      justifyContent={"center"}
    >
      <Grid item sm={6} flexGrow={1}>
        <Card
          variant="elevation"
          elevation={20}
          sx={{
            borderRadius: "30px",
          }}
        >
          <CardHeader title="Create PoV" />
          <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
            <Stack>
              <FormGroup>
                <TextField
                  variant="standard"
                  label={"Title"}
                  placeholder="Title"
                  helperText={""}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                  fullWidth
                  required
                />
                <TextField
                  variant="standard"
                  sx={{
                    mb: 2,
                  }}
                  label={"Subtitle"}
                  placeholder="Subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  autoFocus
                  fullWidth
                  required
                />
                <TextareaAutosize
                  variant="standard"
                  minRows={1}
                  label={"Points"}
                  placeholder="Points"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  autoFocus
                  required
                />
                <FormHelperText sx={{ color: "red" }}>{error}</FormHelperText>
                <Grid container justifyContent={"space-between"}>
                  <Grid item sm="5">
                    <Button
                      type="reset"
                      variant="contained"
                      color="warning"
                      sx={{ mt: 2 }}
                      onClick={handleCancel}
                      fullWidth
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item sm="5">
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      sx={{ mt: 2 }}
                      disabled={error ? true : false}
                      fullWidth
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </FormGroup>
            </Stack>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
};
