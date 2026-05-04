import { alpha } from "@mui/material/styles";
import type { Components, Theme } from "@mui/material/styles";

/**
 * Component style overrides
 * @param {any} theme theme customization object
 */

export const componentStyleOverrides = (theme: any): Components<Theme> => {
  const isDark = theme.customization?.themeType === "dark";
  const br = theme.customization?.borderRadius ?? 8;
  const primary = theme.colors?.primary?.main || "#f6c143";
  const primaryDark = theme.colors?.primary?.dark || "#b88620";
  const primaryContrast = theme.colors?.primary?.contrastText || "#180d00";
  const secondary = theme.colors?.secondary?.main || "#3a8b4a";
  const secondaryDark = theme.colors?.secondary?.dark || "#22633a";
  const secondaryContrast = theme.colors?.secondary?.contrastText || "#ffffff";

  return {
    // ─── Buttons ───────────────────────────────────────────────────────────
    MuiButton: {
      defaultProps: { size: "small" },
      styleOverrides: {
        root: {
          fontWeight: 700,
          borderRadius: `${br}px`,
          padding: "6px 16px",
          transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
          textTransform: "none",
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
          "&:active": { transform: "scale(0.97)" },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${primary}, ${primaryDark})`,
          color: primaryContrast,
          boxShadow: `0 4px 14px ${alpha(primary, 0.35)}`,
          "&:hover": {
            transform: "translateY(-1.5px)",
            filter: "brightness(1.06)",
            boxShadow: `0 8px 20px ${alpha(primary, 0.5)}`,
          },
          "&:active": { transform: "scale(0.97)" },
        },
        containedSecondary: {
          background: `linear-gradient(135deg, ${secondary}, ${secondaryDark})`,
          color: secondaryContrast,
          "&:hover": {
            transform: "translateY(-1.5px)",
            filter: "brightness(1.06)",
          },
          "&:active": { transform: "scale(0.97)" },
        },
        outlinedPrimary: { borderColor: primary },
      } as any,
    },

    // ─── Global baseline ────────────────────────────────────────────────────
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: "smooth" },
        body: {
          "& ::selection": {
            background: alpha(primary, 0.3),
            color: "inherit",
          },
          "&::-webkit-scrollbar": { width: "8px", height: "8px" },
          "&::-webkit-scrollbar-track": {
            background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
            borderRadius: "4px",
            "&:hover": {
              background: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)",
            },
          },
        },
      },
    } as any,

    // ─── AppBar — glassmorphism ─────────────────────────────────────────────
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: isDark
            ? alpha(theme.colors?.background?.default || "#160F05", 0.88)
            : alpha(theme.colors?.background?.default || "#F9F6ED", 0.88),
          backdropFilter: "blur(24px) saturate(180%)",
          borderBottom: `1px solid ${theme.divider}`,
          boxShadow: isDark
            ? "0 1px 20px rgba(0,0,0,0.4)"
            : "0 1px 20px rgba(0,0,0,0.05)",
          color: theme.colors?.text?.primary,
        },
      },
    },

    // ─── Paper ─────────────────────────────────────────────────────────────
    MuiPaper: {
      defaultProps: { elevation: 0 },
      variants: [
        {
          props: { variant: "glass" },
          style: {
            backdropFilter: "blur(20px) saturate(160%)",
            backgroundColor: isDark ? alpha(theme.paper, 0.55) : alpha(theme.paper, 0.85),
            border: `1px solid ${theme.divider}`,
            boxShadow: isDark
              ? "0 4px 24px rgba(0,0,0,0.55)"
              : "0 4px 24px rgba(0,0,0,0.08)",
          },
        },
      ],
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: theme.paper,
          borderRadius: `${br}px`,
        },
        elevation1: {
          boxShadow: isDark
            ? "0 2px 12px rgba(0,0,0,0.5)"
            : "0 2px 12px rgba(0,0,0,0.06)",
        },
        elevation2: {
          boxShadow: isDark
            ? "0 4px 24px rgba(0,0,0,0.55)"
            : "0 4px 24px rgba(0,0,0,0.08)",
        },
      } as any,
    },

    // ─── Card ──────────────────────────────────────────────────────────────
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: `${br + 4}px`,
          boxShadow: isDark
            ? "0 2px 20px rgba(0,0,0,0.5)"
            : "0 2px 20px rgba(0,0,0,0.06)",
          overflow: "hidden",
        },
      },
    },

    // ─── FAB — gradient primary + glow + hover ──────────────────────────────
    MuiFab: {
      defaultProps: { size: "medium" },
      styleOverrides: {
        root: {
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": { transform: "scale(1.06) translateY(-2px)" },
          "&:active": { transform: "scale(0.95)" },
        },
        colorPrimary: {
          background: `linear-gradient(135deg, ${primary} 0%, ${primaryDark} 100%)`,
          color: primaryContrast,
          boxShadow: `0 8px 24px ${alpha(primary, 0.45)}`,
          "&:hover": {
            boxShadow: `0 14px 32px ${alpha(primary, 0.55)}`,
            filter: "brightness(1.06)",
          },
          "&:active": { transform: "scale(0.95)" },
        },
      } as any,
    },

    // ─── Tabs — gradient indicator ──────────────────────────────────────────
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: "3px 3px 0 0",
          background: `linear-gradient(90deg, ${primary}, ${secondary})`,
        },
        root: { minHeight: 44 },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: "none",
          fontSize: "0.875rem",
          letterSpacing: "0.01em",
          minHeight: 44,
          gap: 6,
          transition: "color 0.2s",
          "&.Mui-selected": { fontWeight: 800 },
        },
      },
    },

    // ─── TextField / Input ──────────────────────────────────────────────────
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: `${br}px`,
          transition: "all 200ms ease",
          "& .MuiOutlinedInput-notchedOutline": { border: "none" },
          "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
          backgroundColor: isDark
            ? "rgba(255,255,255,0.05)"
            : theme.colors?.grey?.[100] || "rgba(0,0,0,0.04)",
          "&.Mui-focused": {
            backgroundColor: isDark
              ? "rgba(255,255,255,0.08)"
              : theme.colors?.grey?.[50] || "rgba(0,0,0,0.02)",
            boxShadow: `0 0 0 3px ${alpha(primary, 0.15)}`,
          },
          "&:hover": {
            backgroundColor: isDark
              ? "rgba(255,255,255,0.07)"
              : theme.colors?.grey?.[200] || "rgba(0,0,0,0.06)",
          },
        },
        input: { fontWeight: 500, padding: "10px 12px" },
      } as any,
    },

    // ─── Lists & Menus ──────────────────────────────────────────────────────
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: `${br}px`,
          margin: "2px 8px",
          transition: "all 200ms ease",
          "&.Mui-selected": {
            color: theme.menuSelected,
            backgroundColor: theme.menuSelectedBack,
            fontWeight: 600,
            "&:hover": { backgroundColor: theme.menuSelectedBack },
            "& .MuiListItemIcon-root": { color: theme.menuSelected },
          },
          "&:hover": {
            backgroundColor: isDark ? "rgba(255,255,255,0.03)" : theme.menuSelectedBack,
            transform: "translateX(4px)",
          },
        },
      } as any,
    },

    MuiList: { defaultProps: { dense: true } },

    MuiMenuItem: {
      defaultProps: { dense: true },
      styleOverrides: {
        root: {
          borderRadius: `${br}px`,
          padding: "8px 12px",
          fontWeight: 600,
          fontSize: "0.875rem",
          gap: 8,
          transition: "background-color 200ms ease",
        },
      },
    },

    // ─── Chips ─────────────────────────────────────────────────────────────
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: "8px",
          "&.MuiChip-clickable:hover": { transform: "scale(1.02)" },
        },
        sizeSmall: { fontSize: "0.72rem", height: 22 },
      } as any,
    },

    // ─── Divider ───────────────────────────────────────────────────────────
    MuiDivider: {
      styleOverrides: {
        root: {
          border: "none",
          height: 1,
          margin: "0",
          flexShrink: 0,
          background: `linear-gradient(90deg, transparent, ${theme.colors?.primary?.main || "#f6c143"}, transparent)`,
          opacity: 0.6,
        },
      },
    },

    // ─── Avatar ────────────────────────────────────────────────────────────
    MuiAvatar: {
      variants: [
        {
          props: { variant: "logo" },
          style: {
            background: `linear-gradient(135deg, ${primary}, ${secondary})`,
            color: primaryContrast,
            boxShadow: `0 8px 24px ${alpha(primary, 0.45)}`,
            borderRadius: "12px",
            width: 72,
            height: 72,
            fontSize: "2.25rem",
            fontWeight: 900,
          },
        },
      ],
      styleOverrides: {
        root: {
          color: theme.colors?.primary?.dark || "#8B5A12",
          background: theme.colors?.primary?.[200] || "#FFF3CC",
          boxShadow: "0 6px 18px rgba(16,24,32,0.08)",
          fontWeight: 600,
          fontSize: "0.8125rem",
        },
      } as any,
    },

    // ─── Dialogs ───────────────────────────────────────────────────────────
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: `${br + 4}px`,
          boxShadow: isDark
            ? "0 24px 60px rgba(0,0,0,0.7)"
            : "0 24px 60px rgba(0,0,0,0.15)",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: { fontSize: "1rem", fontWeight: 800, padding: "16px 20px 8px" },
      },
    },
    MuiDialogContent: {
      styleOverrides: { root: { padding: "16px 20px" } },
    },

    // ─── Tooltips ──────────────────────────────────────────────────────────
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: isDark ? theme.colors?.grey?.[100] || "#f5f5f5" : theme.colors?.grey?.[900] || "#1e1e1e",
          color: isDark ? theme.colors?.grey?.[900] || "#1e1e1e" : theme.colors?.grey?.[50] || "#ffffff",
          fontSize: "0.75rem",
          padding: "8px 12px",
          borderRadius: "6px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        },
        arrow: {
          color: isDark ? theme.colors?.grey?.[100] || "#f5f5f5" : theme.colors?.grey?.[900] || "#1e1e1e",
        }
      } as any,
    },

    // ─── Alerts ────────────────────────────────────────────────────────────
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          fontWeight: 600,
          fontSize: "0.875rem",
        },
        filledSuccess: {
          background: `linear-gradient(135deg, ${theme.colors?.success?.main}, ${theme.colors?.success?.dark})`,
        },
        filledError: {
          background: `linear-gradient(135deg, ${theme.colors?.error?.main}, ${theme.colors?.error?.dark})`,
        },
      } as any,
    },

    // ─── Misc ──────────────────────────────────────────────────────────────
    MuiCardContent: {
      styleOverrides: {
        root: { padding: "16px", "&:last-child": { paddingBottom: "16px" } },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: { fontWeight: 700, fontSize: "0.65rem" },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          fontWeight: 600,
          "&:hover": { textDecoration: "underline" },
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: { borderRadius: "10px", fontWeight: 600 },
      },
    },
    MuiIconButton: {
      defaultProps: { size: "small" },
      styleOverrides: { root: { padding: "6px" } },
    },
    MuiTable: { defaultProps: { size: "small" } },
    MuiButtonGroup: { defaultProps: { size: "small" } },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          fontWeight: 800,
          borderRadius: `${br}px`,
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            backgroundColor: alpha(primary, 0.08),
            transform: "translateY(-2px)",
          },
          "&:active": { transform: "scale(0.95)" },
          "&.Mui-selected": {
            background: `linear-gradient(135deg, ${primary} 0%, ${primaryDark} 100%) !important`,
            color: primaryContrast,
            boxShadow: `0 6px 16px -4px ${alpha(primary, 0.5)}`,
            border: "none",
            "&:hover": {
              transform: "translateY(-2px) scale(1.05)",
              boxShadow: `0 8px 20px -4px ${alpha(primary, 0.6)}`,
            },
            "&:active": { transform: "scale(0.95)" },
          },
        },
        ellipsis: {
          border: "none",
          backgroundColor: "transparent",
          "&:hover": { backgroundColor: "transparent", transform: "none" },
        },
      } as any,
    },
    MuiCheckbox: { defaultProps: { size: "small" } },
    MuiFormControl: { defaultProps: { margin: "dense", size: "small" } },
    MuiFormHelperText: { defaultProps: { margin: "dense" } },
    MuiInputLabel: { defaultProps: { margin: "dense" } },
    MuiRadio: { defaultProps: { size: "small" } },
    MuiSwitch: { defaultProps: { size: "small" } },
    MuiTextField: { defaultProps: { margin: "dense", size: "small" } },
    MuiTypography: {
      variants: [
        {
          props: { variant: "gradientText" },
          style: {
            background: `linear-gradient(135deg, ${theme.colors?.text?.primary || "#180d00"}, ${alpha(theme.colors?.text?.primary || "#180d00", 0.5)})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          },
        },
        {
          props: { variant: "gradientHero" },
          style: {
            background: `linear-gradient(270deg, ${primary}, ${secondary}, ${alpha(primary, 0.65)}, ${primary})`,
            backgroundSize: "300% 300%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          },
        },
      ],
    } as any,
  };
};
