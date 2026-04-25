import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Suspense } from "react";
import ThemeToggleFab from "./ui/components/fab/ThemeToggleFab";
import { useUiSettings } from "./hooks/useUiSettings";
import AppLoadingScreen from "./ui/components/layout/AppLoadingScreen";
import { AppRoutes } from "./ui/routes/AppRoutes";
import { PoVNotification } from "./ui/components/notification/PoVNotification";
import { ErrorBoundary } from "./ui/components/error/ErrorBoundary";

const App = () => {

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
