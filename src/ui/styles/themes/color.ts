export interface ColorRamp {
  light?: string;
  dark?: string;
  main: string;
  200?: string;
  800?: string;
  contrastText?: string;
  [key: string]: string | undefined;
}

export interface GreyRamp {
  50: string;
  100: string;
  200: string;
  300: string;
  500: string;
  600: string;
  700: string;
  900: string;
}

export interface ThemeColors {
  background: {
    paper: string;
    default: string;
    contrastText: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    hint: string;
  };
  primary: ColorRamp;
  secondary: ColorRamp;
  success: ColorRamp;
  error: ColorRamp;
  info: ColorRamp;
  orange: ColorRamp;
  warning: ColorRamp;
  grey: GreyRamp;
  divider: string;
}

export const color: { light: ThemeColors; dark: ThemeColors } = {
  // light mode colors
  light: {
    // paper & background (soft warm cream for sunflower feel)
    background: {
      paper: "#FFFDF5", // Refined for premium feel
      default: "#F9F6ED", // Soft warm neutral
      contrastText: "#180d00",
    },
    text: {
      primary: "#241500",
      secondary: "#5C584E", // Improved contrast for production
      disabled: "#9a8f80",
      hint: "#3a8b4a",
    },
    // primary (sunflower yellow/gold)
    primary: {
      light: "#ffe28a",
      dark: "#b88620",
      main: "#f6c143",
      200: "#fff3cc",
      800: "#8b5a12",
      contrastText: "#180d00",
    },
    // secondary (leaf green accent)
    secondary: {
      light: "#b8e8b0",
      dark: "#22633a",
      main: "#3a8b4a",
      200: "#dff6e3",
      800: "#11462a",
      contrastText: "#ffffff", // Changed to white for WCAG accessibility
    },
    // success (soft green)
    success: {
      light: "#dff6e3",
      dark: "#178c45",
      200: "#a9e6b8",
      main: "#34c06b",
      contrastText: "#ffffff",
    },
    error: {
      light: "#f9c1b0",
      dark: "#b03528",
      main: "#e14b3b",
      contrastText: "#ffffff",
    },
    // info
    info: {
      light: "#AEC736", // Shifted for professional "Sap Green"
      dark: "#4a5d02",
      main: "#739202",
      contrastText: "#ffffff",
    },
    // orange (used sparingly)
    orange: {
      light: "#ffe8d6",
      dark: "#d6884a",
      main: "#ffb57a",
      contrastText: "#180d00",
    },
    // warning (sunflower warm)
    warning: {
      light: "#fff5d6",
      dark: "#ffb020",
      main: "#ffd166",
      contrastText: "#180d00",
    },
    // grey (from sunflower - yellow , green, brown)
    // Fixed: Standardized the ramp so MUI doesn't crash on 'undefined' shades
    grey: {
      50: "#FCFAF7",
      100: "#F2F0E9",
      200: "#E6E3D8",
      300: "#D9D4C7",
      500: "#A39F94",
      600: "#7A7569",
      700: "#5C584E",
      900: "#241500",
    },
    divider: "rgba(36, 21, 0, 0.12)",
  },
  // dark mode colors
  dark: {
    // paper & background (soft warm cream for sunflower feel)
    background: {
      paper: "#2A1D0E", // Elevated surface for Dark Mode
      default: "#160F05", // Deepest background
      contrastText: "#f5f0e6",
    },
    text: {
      primary: "#f5f0e6",
      secondary: "#B5AF9D",
      disabled: "#6e685f",
      hint: "#6e685f",
    },
    // primary (sunflower yellow/gold)
    primary: {
      light: "#ffe28a",
      dark: "#b88620",
      main: "#f6c143",
      200: "#4D3D14", // Darker tint for background usage
      800: "#E0B33A",
      contrastText: "#111111",
    },
    // secondary (leaf green accent)
    secondary: {
      light: "#b8e8b0",
      dark: "#22633a",
      main: "#4CAF50", // Higher visibility green for dark mode
      200: "#1D3D22",
      800: "#11462a",
      contrastText: "#ffffff",
    },
    // success (soft green)
    success: {
      light: "#dff6e3",
      dark: "#1B5E20",
      200: "#1D3D22",
      main: "#66BB6A",
    },
    error: {
      light: "#f9c1b0",
      dark: "#C62828",
      main: "#EF5350",
    },
    // info
    info: {
      light: "#C0D94A",
      dark: "#4a5d02",
      main: "#92B002",
      contrastText: "#ffffff",
    },
    // orange (used sparingly)
    orange: {
      light: "#ffe8d6",
      dark: "#d6884a",
      main: "#ffb57a",
      contrastText: "#ffffff",
    },
    // warning (sunflower warm)
    warning: {
      light: "#fff5d6",
      dark: "#ffb020",
      main: "#ffd166",
      contrastText: "#ffffff",
    },
    // grey (shades of brown)
    grey: {
      50: "#241E19",
      100: "#2D2620",
      200: "#3D352E",
      300: "#4F463D",
      500: "#8C8375",
      600: "#B5AF9D",
      700: "#D9D4C7",
      900: "#F5F0E6",
    },
    divider: "rgba(245, 240, 230, 0.12)",
  },
};
