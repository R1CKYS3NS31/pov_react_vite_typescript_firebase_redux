import { useState } from "react";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import AddRounded from "@mui/icons-material/AddRounded";
import { useNavigate } from "react-router-dom";
import { HomeHero } from "../../components/home/HomeHero";
import PovSearchBar from "../../components/pov/PovSearchBar";
import PovList from "../../components/pov/PovList";
import { usePov } from "../../../hooks/usePov";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);

  const { allPovs, searchedPovs, loading } = usePov({ search: searchQuery, page, size: 20 });

  const displayPovs = searchQuery ? searchedPovs : allPovs;
  const povItems    = displayPovs?.content   ?? [];
  const totalPages  = displayPovs?.totalPages ?? 1;

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(0);
  };

  return (
    <Stack sx={{ maxWidth: 800, mx: "auto", pb: 12 }}>
      <HomeHero />

      <PovSearchBar searchQuery={searchQuery} setSearchQuery={handleSearch} />

      <PovList
        povs={povItems}
        loading={loading}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        emptyMessage={
          searchQuery
            ? `No POVs found for "${searchQuery}"`
            : "No perspectives shared yet — be the first!"
        }
      />

      {/* Floating action button — gradient + glow from MuiFab theme override */}
      <Zoom in unmountOnExit>
        <Tooltip title="Share your perspective" placement="left" arrow>
          <Fab
            id="fab-share-pov"
            color="primary"
            size="large"
            aria-label="share pov"
            onClick={() => navigate("/account")}
            sx={{ position: "fixed", bottom: 80, right: 16, zIndex: 1000 }}
          >
            <AddRounded />
          </Fab>
        </Tooltip>
      </Zoom>
    </Stack>
  );
};

export default Home;
