import { Theme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: {
      primary: string;
      secondary: string;
      z1: string;
      z2: string;
      z4: string;
    };
  }
  interface ThemeOptions {
    customShadows?: {
      primary?: string;
      secondary?: string;
      z1?: string;
      z2?: string;
      z4?: string;
    };
  }

  interface TypographyQueries {
    gradientText: React.CSSProperties;
    gradientHero: React.CSSProperties;
  }

  interface TypographyVariants {
    gradientText: React.CSSProperties;
    gradientHero: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    gradientText?: React.CSSProperties;
    gradientHero?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    gradientText: true;
    gradientHero: true;
  }
}

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    glass: true;
  }
}

declare module '@mui/material/Avatar' {
  interface AvatarPropsVariantOverrides {
    logo: true;
  }
}
