import React from "react";
import ReactDOM from "react-dom";

import styled from "styled-components";

import JobList from "./job/job-list";

import { ThemeProvider } from "@xstyled/styled-components";
import { GlobalStyle } from "@welcome-ui/core";
import theme from "./theme";

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
        ${theme.colors.nude[400]} 30%,
        ${theme.colors.light[900]} 30%
    )`};
  height: 100vh;
  margin: 0;
  padding-top: 100px;

  @media all and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding-top: 0px;
  }
`;

ReactDOM.render(<App />, document.getElementById("root"));
