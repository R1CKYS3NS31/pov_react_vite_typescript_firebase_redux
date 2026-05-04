import { createTheme } from "@mui/material/styles";
import type { Theme, ThemeOptions } from "@mui/material/styles";

// project imports
import { componentStyleOverrides } from "./compStyleOverride";
import { themePalette } from "./palette";
import { themeTypography } from "./typography";
import { color } from "./color";

/**
 * Represent theme style and structure as per Material-UI
 * @param {any} customization customization parameter object
 */

export const theme = (customization: any = {}): Theme => {
  const finalCustomization = {
    themeType: customization.themeType || "light",
    borderRadius: customization.borderRadius ?? 8,
    fontFamily: customization.fontFamily || "'Inter', 'Roboto', sans-serif",
    ...customization,
  };

  const isDark = finalCustomization.themeType === "dark";
  const activeColors = isDark ? color.dark : color.light;

  const themeOption = {
    colors: activeColors,
    heading: activeColors.text.primary,
    paper: activeColors.background.paper,
    backgroundDefault: activeColors.background.default,
    background: activeColors.primary.light,
    text: activeColors.text,
    menuSelected: activeColors.secondary.dark,
    menuSelectedBack: activeColors.secondary.light,
    divider: activeColors.divider,
    customization: finalCustomization,
  };

  const themeOptions: ThemeOptions = {
    direction: "ltr",
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: "48px",
        padding: "16px",
        "@media (min-width: 600px)": {
          minHeight: "48px",
        },
      },
    },
    typography: themeTypography(themeOption) as any,
    shape: {
      borderRadius: finalCustomization.borderRadius,
    },
  };

  const themes = createTheme(themeOptions) as any;
  themes.components = componentStyleOverrides(themeOption);
  themes.customShadows = {
    primary: `0 6px 20px -4px ${activeColors.primary.main}80`,
    secondary: `0 6px 20px -4px ${activeColors.secondary.main}80`,
    z1: isDark ? "0 2px 12px rgba(0,0,0,0.5)" : "0 2px 12px rgba(0,0,0,0.06)",
    z2: isDark ? "0 4px 24px rgba(0,0,0,0.55)" : "0 4px 24px rgba(0,0,0,0.08)",
    z4: isDark ? "0 8px 32px rgba(0,0,0,0.6)" : "0 8px 32px rgba(0,0,0,0.10)",
  };
  return themes as Theme;
};
