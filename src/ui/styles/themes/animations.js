/**
 * Shared MUI keyframe animations.
 * Import what you need — no duplication across components.
 *
 * Color-dependent animations are factories (e.g. makePulseGlow)
 * so they stay in sync with the active theme primary color.
 */
import { keyframes } from "@mui/material/styles";

/** Fade in while sliding up — for page sections and hero content. */
export const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/** Fade in while sliding in from the right. */
export const fadeSlideIn = keyframes`
  from { opacity: 0; transform: translateX(16px); }
  to   { opacity: 1; transform: translateX(0); }
`;

/** Gentle floating animation (up and down) */
export const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`;

/** Subtle scale-in pop — for cards and dialogs. */
export const popIn = keyframes`
  from { opacity: 0; transform: scale(0.94); }
  to   { opacity: 1; transform: scale(1); }
`;

/** Animated gradient background — for shimmer text and hero words. */
export const gradientShift = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

/** Skeleton / content loading pulse. */
export const shimmer = keyframes`
  0%   { opacity: 1; }
  50%  { opacity: 0.4; }
  100% { opacity: 1; }
`;

/**
 * Theme-aware glow pulse factory.
 * @param {string} hexColor  - The primary/accent color hex (e.g. theme.palette.primary.main)
 * @returns {string}           MUI keyframes string
 *
 * Usage:
 *   const pulseGlow = makePulseGlow(theme.palette.primary.main);
 *   sx={{ animation: `${pulseGlow} 3.5s ease-in-out infinite` }}
 */
export const makePulseGlow = (hexColor = "#f6c143") => keyframes`
  0%, 100% { box-shadow: 0 0 0 0 ${hexColor}00; }
  50%       { box-shadow: 0 0 24px 6px ${hexColor}33; }
`;
