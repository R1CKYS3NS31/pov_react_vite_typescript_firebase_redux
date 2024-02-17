import { ThemeProvider } from "@emotion/react";
import { Routes } from "./routes/routes";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "./styles/themes/index";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes />
      </Router>
    </ThemeProvider>
  );
};

export default App;
