import { Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPovsByAuthor } from "../../../services/api/pov/api-pov";
import { setPovs } from "../../../services/redux/slices/pov/povSlice";
import { MyPoV } from "./MyPoV";

export const MyPoVs = () => {
  const dispatch = useDispatch();
  const povs = useSelector((state) => state.povs);
  const userAccount = useSelector((state) => state.userAccount);
  const [error, setError] = useState("");

  useEffect(() => {
    const povsFetch = async () => {
      try {
        const povsFetched = await fetchPovsByAuthor('', userAccount.token);
        // const povsFetched = await fetchPoVs();
        if (povsFetched) {
          dispatch(setPovs(povsFetched));
        }
      } catch (error) {
        setError(error);
      }
    };
    povsFetch();
  }, [dispatch, userAccount]);

  return (
    <Grid2
      container
      sx={{
        flex: 2,
      }}
      direction={"column"}
    >
      {povs ? (
        povs.map((pov) => (
          <Grid2 item key={pov.id}>
            <MyPoV pov={pov} />
          </Grid2>
        ))
      ) : error ? ( // ricky has bugs
        <Typography variant="h5" color={"red"}>
          {error}
        </Typography>
      ) : (
        <Typography variant="h4">No PoVs</Typography>
      )}
    </Grid2>
  );
};
