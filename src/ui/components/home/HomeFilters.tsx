import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRounded from "@mui/icons-material/SearchRounded";
import SortRounded from "@mui/icons-material/SortRounded";
import { alpha, useTheme } from "@mui/material/styles";

interface HomeFiltersProps {
  onSearch: (query: string) => void;
  onSortChange: (sortBy: string) => void;
  sortBy: string;
}

export const HomeFilters: React.FC<HomeFiltersProps> = ({
  onSearch,
  onSortChange,
  sortBy,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 4,
        bgcolor: "background.paper",
        boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
        border: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        alignItems: "center",
      }}
    >
      <TextField
        fullWidth
        placeholder="Search perspectives..."
        onChange={(e) => onSearch(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 3,
              bgcolor: (theme) => alpha(theme.palette.text.primary, 0.03),
              fontWeight: 600,
            },
          },
        }}
      />

      <TextField
        select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        sx={{ minWidth: { xs: "100%", sm: 200 } }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SortRounded sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
            sx: { borderRadius: 3, fontWeight: 600 },
          },
        }}
      >
        <MenuItem value="createdAt">Newest First</MenuItem>
        <MenuItem value="likesCount">Most Liked</MenuItem>
        <MenuItem value="commentsCount">Most Discussed</MenuItem>
      </TextField>
    </Box>
  );
};
