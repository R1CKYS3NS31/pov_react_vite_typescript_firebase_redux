import {
  Autocomplete,
  Avatar,
  createFilterOptions,
  Grid2,
  Input,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { PoV } from "../../components/pov/PoV";
import { Search } from "@mui/icons-material";
import { getPoVsFirebase } from "../../../services/firebase/controller/pov-firebase";
import { ErrorSnackbar } from "../../components/ui/snackbar/ErrorSnackbar";

export const Home = () => {
  const [povs, setPovs] = useState({ size: 0, empty: true, docs: [] });

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
    getPoVsFirebase()
      .then((poVsFetched) => {
        console.log(poVsFetched);

        setPovs(poVsFetched);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setOpenErrorSnackBar(true);
      });
    // .finally(() => setLoading(false));
  }, []);

  const handleSearch = async (event, povSearch) => {
    event.preventDefault();

    // await searchPoVs(povSearch ? await povSearch.title : "")
    //   .then((povFetched) => {
    //     console.log(povFetched);

    //     dispatch(setPovs(povFetched));
    //   })
    //   .catch((error) => {
    //     setError(error.message);
    //     setOpenErrorSnackBar(true);
    //   });
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
            options={povs.docs}
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
                startAdornment={<Search sx={{ pr: 1 }} fontSize="small" />}
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
        {!povs.empty ? (
          povs.docs.map((pov) => (
            <Grid2 item size={{ xs: 12, md: 6 }} key={pov.id}>
              <PoV pov={pov} />
            </Grid2>
          ))
        ) : (
          <Typography variant="h4" sx={{ justifyContent: "center" }}>
            no pov available
          </Typography>
        )}
      </Grid2>
      <ErrorSnackbar
        openErrorSnackBar={openErrorSnackBar}
        handleCloseErrorSnackBar={handleCloseErrorSnackBar}
        error={error}
      />
    </Grid2>
  );
};
