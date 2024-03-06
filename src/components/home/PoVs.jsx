import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPoVs } from "../../services/api/pov/api-pov";
import { setPovs } from "../../services/redux/slices/pov/povSlice";
import { PoV } from "./PoV";

export const PoVs = () => {
  const dispatch = useDispatch();
  const povs = useSelector((state) => state.povs);

  // useEffect(() => {
  //   const productsFetch = async () => {
  //     const productsFetched = await fetchProducts()
  //     if (productsFetched)
  //       dispatch(setProducts(productsFetched))
  //   }

  //   const latestProductsFetch = async () => {
  //     const latestProductsFetched = await fetchLatestProducts()
  //     if (latestProductsFetched)
  //       dispatch(setLatestProducts(latestProductsFetched))
  //   }

  //   latestProductsFetch()
  //   productsFetch()
  // }, [dispatch])

  useEffect(() => {
    const povsFetch = async () => {
      const povsFetched = await fetchPoVs();
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
      <Typography variant="h2">PoVs</Typography>
      {povs &&
        povs.map((pov) => (
          <Grid item key={pov.id}>
            <PoV pov={pov} />
          </Grid>
        ))}
    </Grid>
  );
};
