import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/material/styles";

const povPulse = keyframes`
  0%, 100% { transform: scale(1); box-shadow: 0 16px 40px rgba(246,193,67,0.35); }
  50% { transform: scale(1.06); box-shadow: 0 20px 50px rgba(246,193,67,0.5); }
`;

const AppLoadingScreen = () => (
  <Box
    sx={{
      position: "fixed",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #FFFDF5 0%, #F9F6ED 100%)",
      gap: "20px",
    }}
  >
    <Box
      sx={{
        width: 72,
        height: 72,
        background: "linear-gradient(135deg, #f6c143, #d68a4a)",
        borderRadius: "18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 36,
        fontWeight: 900,
        color: "#180d00",
        boxShadow: "0 16px 40px rgba(246,193,67,0.35)",
        animation: `${povPulse} 1.5s ease-in-out infinite`,
      }}
    >
      P
    </Box>
    <Box sx={{ textAlign: "center" }}>
      <Typography
        sx={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 900,
          fontSize: "1.5rem",
          color: "#241500",
          letterSpacing: "-0.5px",
        }}
      >
        POV App
      </Typography>
      <Typography
        sx={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.875rem",
          color: "#5C584E",
          marginTop: 0.5,
        }}
      >
        Loading your perspectives…
      </Typography>
    </Box>
  </Box>
);

export default AppLoadingScreen;
