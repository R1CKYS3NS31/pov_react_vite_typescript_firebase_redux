import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPovsByOwner } from "../../services/api/pov/api-pov";
import { setPovs } from "../../services/redux/slices/pov/povSlice";
import { MyPoV } from "./MyPoV";

export const MyPoVs = () => {
  const dispatch = useDispatch();
  const povs = useSelector((state) => state.povs);
  const accountUser = useSelector((state) => state.accountUser);
  const [error, setError] = useState("");

  useEffect(() => {
    const povsFetch = async () => {
      try {
        const povsFetched = await fetchPovsByOwner('', accountUser.token);
        // const povsFetched = await fetchPoVs();
        if (povsFetched) {
          dispatch(setPovs(povsFetched));
        }
      } catch (error) {
        setError(error);
      }
    };
    povsFetch();
  }, [dispatch, accountUser]);

  return (
    <Grid
      container
      sx={{
        flex: 2,
      }}
      direction={"column"}
    >
      {povs ? (
        povs.map((pov) => (
          <Grid item key={pov.id}>
            <MyPoV pov={pov} />
          </Grid>
        ))
      ) : error ? ( // ricky has bugs
        <Typography variant="h5" color={"red"}>
          {error}
        </Typography>
      ) : (
        <Typography variant="h4">No PoVs</Typography>
      )}
    </Grid>
  );
};
