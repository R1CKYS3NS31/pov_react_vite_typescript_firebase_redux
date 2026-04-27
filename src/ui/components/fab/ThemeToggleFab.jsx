import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import { useUiSettings } from "../../../hooks/useUiSettings";

const ThemeToggleFab = () => {
  const { themeType, toggleTheme } = useUiSettings();

  return (
    <Tooltip
      arrow
      title={`Switch to ${themeType === "dark" ? "light" : "dark"} mode`}
      placement="left"
    >
      <Fab
        color="primary"
        aria-label="toggle theme"
        size="small"
        onClick={() => toggleTheme()}
        sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}
      >
        {themeType === "dark" ? <LightMode /> : <DarkMode />}
      </Fab>
    </Tooltip>
  );
};

export default ThemeToggleFab;
