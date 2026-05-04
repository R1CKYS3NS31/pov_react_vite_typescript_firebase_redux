import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { usePov } from "../../../hooks/usePov";
import { HomeHero } from "../../components/home/HomeHero";
import { HomeFilters } from "../../components/home/HomeFilters";
import PovList from "../../components/pov/PovList";
import { PoVNotification } from "../../components/notification/PoVNotification";
import type { PoV } from "../../../models/pov.model";
import { PovDialog } from "../../components/pov";

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [povDialogOpen, setPovDialogOpen] = useState(false);
  const [editingPov, setEditingPov] = useState<PoV | null>(null);


  const {
    povs,
    hasMore,
    loading,
    loadingMore,
    loadMore,
  } = usePov({
    search: searchQuery,
    sortBy: sortBy,
    size: 12,
  });

  const handleEditPov = (pov: PoV) => {
    setEditingPov(pov);
    setPovDialogOpen(true);
  };

  return (
    <Box sx={{ pb: 8 }}>
      <HomeHero />

      <Container maxWidth="lg" sx={{ mt: { xs: -4, md: -6 }, position: "relative", zIndex: 2 }}>
        <Stack spacing={4}>
          <HomeFilters
            onSearch={setSearchQuery}
            onSortChange={setSortBy}
            sortBy={sortBy}
          />

          <PovList
            povs={povs}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={loadMore}
            loadingMore={loadingMore}
            onEdit={(pov: PoV) => handleEditPov(pov)}
            emptyMessage={searchQuery ? `No perspectives found for "${searchQuery}"` : "Be the first to share a perspective!"}
          />
        </Stack>
      </Container>
      <PovDialog
        open={povDialogOpen}
        onClose={() => setPovDialogOpen(false)}
        povToEdit={editingPov}
        isLocal={false}
      />
      <PoVNotification />
    </Box>
  );
};

export default Home;
