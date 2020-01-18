import React from "react";
import ReactDOM from "react-dom";

import styled from "styled-components";

import JobList from "./job/job-list";

import { ThemeProvider } from "@xstyled/styled-components";
import { createTheme, GlobalStyle } from "@welcome-ui/core";

const theme = createTheme({
  texts: {
    h2: {
      "font-weight": "500",
      "line-height": "1em"
    }
  }
});

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Layout>
      <JobList />
    </Layout>
  </ThemeProvider>
);

const Layout = styled("div")`
  background: ${({ theme }) =>
    `linear-gradient(
        to bottom, 
        ${theme.colors.nude[400]}, 
        ${theme.colors.nude[400]} 25%, 
        ${theme.colors.light[900]} 25%
    )`};
  height: 100vh;
  margin: 0;
  padding-top: 100px;
`;

ReactDOM.render(<App />, document.getElementById("root"));
