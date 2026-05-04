import { forwardRef } from "react";
import Fab, { type FabProps } from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import { useUiSettings } from "../../../hooks/useUiSettings";

const ThemeToggleFab = forwardRef<HTMLButtonElement, FabProps>((props, ref) => {
  const { themeType, toggleTheme } = useUiSettings();

  return (
    <Tooltip
      arrow
      title={`Switch to ${themeType === "dark" ? "light" : "dark"} mode`}
      placement="left"
    >
      <Fab
        ref={ref}
        {...props}
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
});

ThemeToggleFab.displayName = "ThemeToggleFab";

export default ThemeToggleFab;
