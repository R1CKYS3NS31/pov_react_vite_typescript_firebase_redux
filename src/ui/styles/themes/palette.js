/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export const themePalette = (theme) => {
  return {
    mode: theme?.customization?.themeType,
    common: {
      paper: theme.colors?.background.paper,
      background: theme.colors?.background.default,
    },
    primary: {
      ...theme.colors?.primary,
    },
    secondary: {
      ...theme.colors?.secondary,
    },
    error: {
      ...theme.colors?.error,
    },
    orange: {
      ...theme.colors?.orange,
    },
    warning: {
      ...theme.colors?.warning,
    },
    success: {
      ...theme.colors?.success,
    },
    grey: {
      ...theme.colors?.grey,
    },
    text: {
      ...theme.colors?.text,
    },
    background: {
      ...theme.colors?.background,
    },
    divider: theme.divider,
    info: {
      ...theme.colors?.info,
    },
  };
};
