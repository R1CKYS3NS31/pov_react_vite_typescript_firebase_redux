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
import { useNavigate, useParams } from "react-router-dom";
import { editPoV } from "../../services/redux/slices/pov/povSlice";
import { getPoVFirebase, updatePoVFirebase } from "../../services/firebase/controller/pov-firebase";

export const PovEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { povId } = useParams();
  const accountUser = useSelector((state) => state.accountUser);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [points, setPoints] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (title && subtitle && points) {
      setError("");
    } else {
      setError("*please fill required fields");
    }
  }, [title, subtitle, points]);

  useEffect(() => {
    const povFetch = async () => {
      try {
        // const povFetched = await fetchPov(povId);
        const povFetched = await getPoVFirebase(povId)
        if (povFetched) {
          setTitle(povFetched.data.title);
          setSubtitle(povFetched.data.subtitle);
          setPoints(povFetched.data.points);
        }
      } catch (error) {
        setError(error);
      }
    };

    povFetch();
  }, [povId]);

  //  submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const editPov = {
        // id: new Date(),
        title: title,
        subtitle: subtitle,
        points: points,
      };

      // const povUpdated = await updatePoV(
      //   accountUser.user._id,
      //   povId,
      //   editPov,
      //   accountUser.token
      // );
      const povUpdated = await updatePoVFirebase(
        // accountUser.user.uid, // todo: update owner's pov
        povId,
        editPov,
        // accountUser.token
      );

      if (povUpdated) {
        dispatch(editPoV(povUpdated));
        navigate("/", { replace: true });
        setTitle("");
        setSubtitle("");
        setPoints("");
      }
    } catch (error) {
      console.log(error);
      setError(`*${error}`);
      //   alert(`Error creating PoV: ${error}`);
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
          <CardHeader title="Edit PoV" />
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
