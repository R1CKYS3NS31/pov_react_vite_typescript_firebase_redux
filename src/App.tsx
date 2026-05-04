import React, { Suspense } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useUiSettings } from "./hooks/useUiSettings";
import AppLoadingScreen from "./ui/components/layout/AppLoadingScreen";
import { AppRoutes } from "./ui/routes/AppRoutes";
import { PoVNotification } from "./ui/components/notification/PoVNotification";
import { ErrorBoundary } from "./ui/components/error/ErrorBoundary";

const App: React.FC = () => {
  const { activeTheme } = useUiSettings();

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      <ErrorBoundary>
        <Suspense fallback={<AppLoadingScreen />}>
          <AppRoutes />
        </Suspense>
      </ErrorBoundary>
      <PoVNotification />
    </ThemeProvider>
  );
};

export default App;
