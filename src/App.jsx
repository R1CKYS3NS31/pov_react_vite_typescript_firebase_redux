import { ThemeProvider } from "@emotion/react";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "./styles/themes/index";
import { Routes } from "./ui/routes/routes";

// import env from 'dotenv'
// env.config()
// console.log(process.env.PROJECT_ID);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes/>
      </Router>
    </ThemeProvider>
  );
};

export default App;
