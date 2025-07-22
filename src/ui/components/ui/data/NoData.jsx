import { InboxOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export const NoData = ({ message = "No data available." }) => {
  return (
    <Box
      sx={{
        height: "100%",
        minHeight: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
        color: "text.secondary",
      }}
    >
      <InboxOutlined sx={{ fontSize: 60, mb: 2, opacity: 0.3 }} />
      <Typography variant="h6" textAlign="center" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};