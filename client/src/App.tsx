import { useMemo } from "react";
import { Box } from "@mui/material";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../src/pages/Navbar/Navbar";

import { themeSettings } from "./theme";
import Dashbord from "./pages/Dashboard/Dashbord";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashbord />} />
              <Route path="/predictions" element={<div>predection</div>} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
