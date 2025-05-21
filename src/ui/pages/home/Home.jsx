import {
  Alert,
  AlertTitle,
  Autocomplete,
  Avatar,
  createFilterOptions,
  Grid2,
  Input,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPoVs, searchPoVs } from "../../../services/api/pov/api-pov";
import { setPovs } from "../../../services/redux/slices/pov/povSlice";
import { MainCard } from "../../components/ui/cards/MainCard";
import { PoV } from "../../components/pov/PoV";
import { Search } from "@mui/icons-material";

export const Home = () => {
  const dispatch = useDispatch();
  const povs = useSelector((state) => state.povs);

  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openErrorSnackBar, setOpenErrorSnackBar] = useState(false);

  const handleCloseErrorSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorSnackBar(false);
  };

  useEffect(() => {
    // setLoading(true);
    fetchPoVs()
      .then((poVsFetched) => {
        dispatch(setPovs(poVsFetched));
      })
      .catch((error) => {
        setError(error);
        setOpenErrorSnackBar(true);
      });
    // .finally(() => setLoading(false));
  }, [dispatch]);

  const handleSearch = async (event, povSearch) => {
    event.preventDefault();

    await searchPoVs(povSearch ? await povSearch.title : "")
      .then((povFetched) => {
        console.log(povFetched);

        dispatch(setPovs(povFetched));
      })
      .catch((error) => {
        setError(error);
        setOpenErrorSnackBar(true);
      });
  };

  const poVFilterOptoins = createFilterOptions({
    stringify: (pov) => `${pov.title} (${pov.points})`,
  });

  return (
    
      <Grid2 container>
        <Grid2 item size={{ xs: 12 }} container spacing={2} direction={"row"}>
          <Grid2 item size={{ xs: 6 }}>
            <Typography variant="h3">PoV Blog</Typography>
          </Grid2>
          <Grid2 item size={{ xs: 6 }}>
            <Autocomplete
              freeSolo
              id="search"
              autoHighlight
              options={povs}
              getOptionLabel={(pov) => pov.title}
              filterOptions={poVFilterOptoins}
              onChange={handleSearch}
              renderOption={(props, pov) => (
                <ListItem sx={{ p: 0 }} {...props}>
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      alt={pov.author.name.first}
                      src={pov.author.displayPicture}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body1" noWrap>
                        {pov.title}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body1" noWrap>
                        {pov.points}
                      </Typography>
                    }
                  />
                </ListItem>
              )}
              renderInput={(params) => (
                <Input
                  {...params}
                  variant="standard"
                  label="Search for PoV..."
                  placeholder="title/point of view"
                  type="search"
                  startAdornment={<Search sx={{pr:1}} fontSize="small" />}
                />
              )}
            />
            {/* <Input
              label="Search for PoV..."
              placeholder="Search for PoV..."
              fullWidth
              onChange={handleSearch}
              InputProps={{
                type: "search",
              }}
              startAdornment={<Search />}
            /> */}
          </Grid2>
        </Grid2>
        <Grid2 item container spacing={0.5}>
          {povs ? (
            povs.map((pov) => (
              <Grid2 item size={{ xs: 12, md: 6 }} key={pov.id}>
                <PoV pov={pov} />
              </Grid2>
            ))
          ) : (
            <Typography variant="h4" sx={{ justifySelf: "center" }}>
              no pov available
            </Typography>
          )}
        </Grid2>

        <Snackbar
          open={openErrorSnackBar}
          autoHideDuration={10000}
          onClose={handleCloseErrorSnackBar}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <Alert
            // title="Error"
            onClose={handleCloseErrorSnackBar}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        </Snackbar>
      </Grid2>
    
  );
};
