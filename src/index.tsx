import React from "react";
import ReactDOM from "react-dom";

import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "@xstyled/styled-components";
import { GlobalStyle } from "@welcome-ui/core";
import theme from "./theme";

import JobList from "./job/job-list";

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <CustomGlobalStyle />
    <JobList />
  </ThemeProvider>
);

const CustomGlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;

  }
  body {
    background: ${({ theme }: any) =>
      `linear-gradient(
          to bottom, 
          ${theme.colors.nude[400]}, 
          ${theme.colors.nude[400]} 35vh,
          ${theme.colors.light[900]} 35vh
      )`};
    margin: 0;
  }
`;

ReactDOM.render(<App />, document.getElementById("root"));
