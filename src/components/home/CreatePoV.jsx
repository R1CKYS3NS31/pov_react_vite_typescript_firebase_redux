import {
  Button,
  Card,
  FormGroup,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPoV } from "../../services/redux/slices/pov/povSlice";
import { createPoV } from "../../services/api/pov/api-pov";

export const CreatePoV = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [state, dispatch] = useReducer(first, second, third)

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [points, setPoints] = useState("");
  // const [disabled, setDisabled] = useState(true);

  //  submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const poVFormData = new FormData();
      const newPov = {
        // id: new Date(),
        title: title,
        subtitle: subtitle,
        points: points,
      };

      // poVFormData.append("title", newPov.id);
      // poVFormData.append("title", newPov.title);
      // poVFormData.append("subtitle", newPov.subtitle);
      // poVFormData.append("points", newPov.points);

      // console.log(`pov created: ${newPov.title}`);

      const povCreated = await createPoV(newPov);

      if (povCreated) {
        dispatch(addPoV(povCreated));
        setTitle("");
        setSubtitle("");
        setPoints("");
        // setDisabled(true);
      }
    } catch (error) {
      console.log(error);
      alert(`Error creating PoV: ${error}`);
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
        flex: "2",
        mt: 5,
      }}
      sm="1"
    >
      <Grid item>
        <Card variant="elevation" elevation={20}>
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
                <FormHelperText></FormHelperText>
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
                      // disabled={
                      //   (title !== "") && (subtitle !== "") && (points !== "")
                      // }
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
