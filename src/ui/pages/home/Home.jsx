import {
  Autocomplete,
  Avatar,
  createFilterOptions,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { PoV } from "../../components/pov/PoV";
import { Search } from "@mui/icons-material";
import {
  getPoVsFirebase,
  searchPoVsByTitleFirebase,
} from "../../../services/firebase/controller/pov-firebase";
import { ErrorSnackbar } from "../../components/ui/snackbar/ErrorSnackbar";
import { NoData } from "../../components/ui/data/NoData";
import { LoadingLinear } from "../../components/ui/data/LoadingLinear";

export const Home = () => {
  const [povs, setPovs] = useState({ size: 0, empty: true, docs: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openErrorSnackBar, setOpenErrorSnackBar] = useState(false);

  const handleCloseErrorSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorSnackBar(false);
  };

  useEffect(() => {
    setLoading(true);
    getPoVsFirebase()
      .then((poVsFetched) => {
        setPovs(poVsFetched);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setOpenErrorSnackBar(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = async (event, povSearch) => {
    event.preventDefault();
    setLoading(true);
    await searchPoVsByTitleFirebase(povSearch ? await povSearch.title : "")
      .then((povsSearchedFirebase) => {
        console.log(povsSearchedFirebase);
        setPovs(povsSearchedFirebase);
      })
      .catch((error) => {
        setError(error.message);
        setOpenErrorSnackBar(true);
      })
      .finally(() => setLoading(false));
  };

  const poVFilterOptions = createFilterOptions({
    stringify: (pov) => `${pov.title || ""} (${pov.points ?? ""})`,
  });

  return (
    <Grid container direction={"column"} spacing={2}>
      <Grid item container spacing={2} direction={"row"}>
        <Grid item component={Typography} variant="h3" size={5}>
          PoV Blog
        </Grid>
        <Grid item size={5}>
          <Autocomplete
            freeSolo
            id="search"
            autoHighlight
            options={povs.docs ?? []}
            getOptionLabel={(pov) => pov.title ?? ""}
            filterOptions={poVFilterOptions}
            onChange={handleSearch}
            renderOption={(props, pov) => (
              <ListItem sx={{ p: 0 }} {...props} key={pov.id}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    alt={pov.author.name.first || "Guest"}
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
              <TextField
                {...params}
                variant="standard"
                label="Search for PoV..."
                placeholder="title/point of view"
              />
            )}
            slots={{
              startAdornment: () => <Search sx={{ pr: 1 }} fontSize="small" />,
            }}
            slotProps={{
              startAdornment: {
                sx: { display: "flex", alignItems: "center" },
              },
            }}
          />
        </Grid>
      </Grid>
      <Grid item container spacing={1} justifyContent={"center"} >
        {loading ? (
          <LoadingLinear message="Loading PoVs..." />
        ) : !povs.empty &&
          povs.docs.filter((pov) => pov.published).length > 0 ? (
          povs.docs
            .filter((pov) => pov.published)
            .map((pov) => (
              <Grid item size={{ xs: 12, md: 6 }} key={pov.id}>
                <PoV poV={pov} />
              </Grid>
            ))
        ) : (
          <Grid item>
            <NoData message="No PoVs available yet!" />
          </Grid>
        )}
      </Grid>
      <ErrorSnackbar
        openErrorSnackBar={openErrorSnackBar}
        handleCloseErrorSnackBar={handleCloseErrorSnackBar}
        error={error}
      />
    </Grid>
  );
};
