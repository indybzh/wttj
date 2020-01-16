import React from "react";
import { ThemeProvider } from "@xstyled/styled-components";
import { createTheme, GlobalStyle } from "@welcome-ui/core";
import JobList from "./Job/job-list";

const theme = createTheme();

const App: React.FC = () => (
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        <JobList />
    </ThemeProvider>
);

export default App;
