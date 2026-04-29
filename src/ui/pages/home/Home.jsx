import { useState } from "react";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { HomeHero } from "../../components/home/HomeHero";
import PovSearchBar from "../../components/pov/PovSearchBar";
import PovList from "../../components/pov/PovList";
import { usePov } from "../../../hooks/usePov";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");

  const { povs, hasMore, loading, loadingMore, loadMore } = usePov({
    search: searchQuery,
    size: 15,
    sortBy,
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Stack sx={{ maxWidth: 800, mx: "auto", pb: 12 }}>
      <HomeHero />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          position: "sticky",
          top: { xs: 50, sm: 60 },
          zIndex: 100,
          bgcolor: "background.default",
          pt: 1,
          pb: 2,
          alignItems: "center",
          mb: 2,
          px: { xs: 2, sm: 0 },
        }}
      >
        <PovSearchBar searchQuery={searchQuery} setSearchQuery={handleSearch} />
        <FormControl
          size="small"
          sx={{ minWidth: 140, width: { xs: "100%", sm: "auto" } }}
        >
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Sort By" }}
            sx={{ borderRadius: 2, fontWeight: 600 }}
          >
            <MenuItem value="createdAt">Newest First</MenuItem>
            <MenuItem value="title">Alphabetical</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <PovList
        povs={povs}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
        loadingMore={loadingMore}
        emptyMessage={
          searchQuery
            ? `No POVs found for "${searchQuery}"`
            : "No perspectives shared yet — be the first!"
        }
      />

      {/* <ScrollTop>
        <Fab
          size="medium"
          color="primary"
          aria-label="scroll back to top"
          sx={{
            boxShadow: (theme) => theme.shadows[4],
            '&:hover': { transform: 'scale(1.1)' }
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop> */}
    </Stack>
  );
};

export default Home;
