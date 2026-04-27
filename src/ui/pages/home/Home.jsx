import { useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { HomeHero } from "../../components/home/HomeHero";
import PovSearchBar from "../../components/pov/PovSearchBar";
import PovList from "../../components/pov/PovList";
import { usePov } from "../../../hooks/usePov";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState("createdAt");

  const { allPovs, searchedPovs, loading } = usePov({ search: searchQuery, page, size: 20, sortBy });

  const displayPovs = searchQuery ? searchedPovs : allPovs;
  const povItems    = displayPovs?.content   ?? [];
  const totalPages  = displayPovs?.totalPages ?? 1;

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(0);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Stack sx={{ maxWidth: 800, mx: "auto", pb: 12 }}>
      <HomeHero />
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" sx={{ mb: 2, px: { xs: 2, sm: 0 } }}>
        <Box sx={{ flexGrow: 1, width: '100%' }}>
          <PovSearchBar searchQuery={searchQuery} setSearchQuery={handleSearch} />
        </Box>
        <FormControl size="small" sx={{ minWidth: 140, width: { xs: '100%', sm: 'auto' } }}>
          <Select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(0);
            }}
            displayEmpty
            inputProps={{ 'aria-label': 'Sort By' }}
            sx={{ borderRadius: 2, fontWeight: 600 }}
          >
            <MenuItem value="createdAt">Newest First</MenuItem>
            <MenuItem value="title">Alphabetical</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <PovList
        povs={povItems}
        loading={loading}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        emptyMessage={
          searchQuery
            ? `No POVs found for "${searchQuery}"`
            : "No perspectives shared yet — be the first!"
        }
      />
    </Stack>
  );
};

export default Home;
