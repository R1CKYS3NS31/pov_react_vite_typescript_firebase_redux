import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPovs } from "../../services/redux/slices/pov/povSlice";
import { PoV } from "../../components/pov/PoV";
import { getPoVsFirebase } from "../../services/firebase/controller/pov-firebase";

export const PoVs = () => {
  const dispatch = useDispatch();
  const povs = useSelector((state) => state.povs);

  useEffect(() => {
    const povsFetch = async () => {
      // const povsFetched = await fetchPoVs();
      const povsFetched = await getPoVsFirebase()
      console.log(povsFetched); // log povs
      if (povsFetched) {
        dispatch(setPovs(povsFetched));
      }
    };
    povsFetch();
  }, [dispatch]);

  return (
    <Grid
      container      
      sx={{
        flex: 2,
      }}
      direction={"column"}
    >
      {!povs.empty &&
        povs.docs.map((pov) => (
          <Grid item key={pov.id}>
            <PoV pov={pov} />
          </Grid>
        ))}
    </Grid>
  );
};
