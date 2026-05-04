import type { PaletteOptions } from "@mui/material/styles";
import type { ThemeColors } from "./color";

/**
 * Color intention that you want to used in your theme
 * @param {any} theme Theme customization object
 */

export const themePalette = (theme: any): PaletteOptions => {
  const colors: ThemeColors = theme.colors;
  
  return {
    mode: theme?.customization?.themeType,
    common: {
      black: "#000000",
      white: "#ffffff",
    },
    primary: {
      ...colors?.primary,
    },
    secondary: {
      ...colors?.secondary,
    },
    error: {
      ...colors?.error,
    },
    warning: {
      ...colors?.warning,
    },
    success: {
      ...colors?.success,
    },
    grey: {
      ...colors?.grey,
    },
    text: {
      ...colors?.text,
    },
    background: {
      ...colors?.background,
    },
    divider: theme.divider,
    info: {
      ...colors?.info,
    },
  };
};
