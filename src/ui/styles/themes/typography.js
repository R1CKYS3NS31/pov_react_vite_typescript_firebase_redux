/**
 * Typography used in theme
 * @param {JsonObject} theme theme customization object
 */

export const themeTypography = (theme) => {
  return {
    fontFamily: theme?.customization?.fontFamily || "'Inter', 'Roboto', sans-serif",
    htmlFontSize: 16,
    h6: {
      fontWeight: 600,
      color: theme.heading,
      fontSize: "0.8125rem",
      letterSpacing: "0.01em",
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "0.9375rem",
      color: theme.heading,
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.125rem",
      color: theme.heading,
      fontWeight: 600,
      letterSpacing: "-0.02em",
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.375rem",
      color: theme.heading,
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.25,
    },
    h2: {
      fontSize: "1.625rem",
      color: theme.heading,
      fontWeight: 700,
      letterSpacing: "-0.03em",
      lineHeight: 1.2,
    },
    h1: {
      fontSize: "2rem",
      color: theme.heading,
      fontWeight: 800,
      letterSpacing: "-0.04em",
      lineHeight: 1.15,
    },
    subtitle1: {
      fontSize: "0.9375rem",
      fontWeight: 500,
      color: theme.text?.primary,
      lineHeight: 1.6,
    },
    subtitle2: {
      fontSize: "0.8125rem",
      fontWeight: 500,
      color: theme.text?.secondary,
      lineHeight: 1.4,
    },
    caption: {
      fontSize: "0.6875rem",
      color: theme.text?.secondary,
      fontWeight: 400,
      letterSpacing: "0.02em",
    },
    body1: {
      fontSize: "0.9375rem",
      fontWeight: 400,
      lineHeight: 1.5,
      color: theme.text?.primary,
    },
    body2: {
      fontSize: "0.8125rem",
      fontWeight: 400,
      lineHeight: 1.5,
      color: theme.text?.secondary,
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
      letterSpacing: "0.02em",
      fontSize: "0.8125rem",
    },
    overline: {
      fontSize: "0.6875rem",
      fontWeight: 700,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      lineHeight: 1.5,
      color: theme.text?.secondary,
    },
  };
};
