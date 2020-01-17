import React from "react";
import { render, fireEvent } from "@testing-library/react";
import JobFilters from "./job-filters";
import { defaultStateFilters } from "../types";

import { ThemeProvider } from "@xstyled/styled-components";
import { createTheme } from "@welcome-ui/core";

const filters: defaultStateFilters = {
  searchInput: "",
  publishedAfter: null,
  contractType: "",
  contractTypes: [],
  groupBy: "",
  groupsBy: []
};

const customRender: React.FC = ({ children }) => (
  <ThemeProvider theme={createTheme()}>{children}</ThemeProvider>
);

it("should render inputs without selects", () => {
  const { container } = render(
    <JobFilters filters={filters} dispatch={() => {}} />,
    { wrapper: customRender }
  );

  const inputs = container.querySelectorAll("input");
  expect(inputs.length).toBe(2);
  const selects = container.querySelectorAll("[role='combobox']");
  expect(selects.length).toBe(0);
});

it("should render inputs and selects", () => {
  const { container } = render(
    <JobFilters
      filters={{
        ...filters,
        groupsBy: ["Paris", "Prague", "Barcelona"],
        contractTypes: ["Full-Time", "Internship"]
      }}
      dispatch={() => {}}
    />,
    { wrapper: customRender }
  );

  const inputs = container.querySelectorAll("input");
  expect(inputs.length).toBe(2);
  const selects = container.querySelectorAll("[role='combobox']");
  expect(selects.length).toBe(2);
});

it("should render options of select", () => {
  const { container } = render(
    <JobFilters
      filters={{
        ...filters,
        contractTypes: ["Full-Time", "Internship"]
      }}
      dispatch={() => {}}
    />,
    { wrapper: customRender }
  );

  const select = container.querySelector("[role='combobox']");
  fireEvent.click((select as Element).children[0].children[0]);
  expect(select?.getAttribute("aria-expanded")).toBe("true");

  const options = container.querySelectorAll("[role='option']");
  expect(options.length).toBe(2);
  expect(options[0].textContent).toBe("Full-Time");
  expect(options[1].textContent).toBe("Internship");

  fireEvent.click(options[1]);
  expect(select?.getAttribute("aria-expanded")).toBe("false");
});

it("should render datepicker", () => {
  const { container } = render(
    <JobFilters filters={filters} dispatch={() => {}} />,
    { wrapper: customRender }
  );

  const datepicker = container.querySelector("input.date-picker");
  expect(datepicker).toBeInTheDocument();
});
