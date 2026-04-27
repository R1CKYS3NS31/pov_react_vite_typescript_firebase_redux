import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Search from "@mui/icons-material/Search";
import Clear from "@mui/icons-material/Clear";

const PovSearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <Paper
      component="form"
      variant="glass"
      onSubmit={(e) => e.preventDefault()}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        mb: 4,
        borderRadius: 4,
        transition: "all 0.3s ease",
        "&:focus-within": {
          boxShadow: (theme) => theme.shadows[6],
          borderColor: "primary.main",
        },
      }}
    >
      <IconButton
        sx={{ p: "10px", color: "primary.main", opacity: 0.8 }}
        aria-label="search"
        disabled
      >
        <Search fontSize="small" />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1, fontWeight: 500 }}
        placeholder="Search POVs by title, keyword, or author..."
        inputProps={{ "aria-label": "search povs" }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <IconButton
          sx={{
            p: "10px",
            transition: "transform 0.2s",
            "&:hover": { color: "error.main", transform: "scale(1.1)" },
          }}
          aria-label="clear"
          onClick={() => setSearchQuery("")}
        >
          <Clear fontSize="small" />
        </IconButton>
      )}
    </Paper>
  );
};

export default PovSearchBar;
