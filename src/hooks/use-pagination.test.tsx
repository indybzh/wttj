import React, { useState } from "react";
import usePagination from "./use-pagination";

import { render, fireEvent } from "@testing-library/react";

import { ThemeProvider } from "@xstyled/styled-components";
import { createTheme } from "@welcome-ui/core";

const customRender: React.FC = ({ children }) => (
  <ThemeProvider theme={createTheme()}>{children}</ThemeProvider>
);

const TestWrapper = ({ jobs }: any) => {
  const [
    currentPage,
    pageCount,
    beginIndex,
    endIndex,
    setCurrentPage
  ] = usePagination(jobs);

  return (
    <div>
      <span id="current-page">{currentPage}</span>
      <span id="page-count">{pageCount}</span>
      <span id="begin-index">{beginIndex}</span>
      <span id="end-index">{endIndex}</span>

      <button onClick={() => setCurrentPage(currentPage + 1)} />
    </div>
  );
};

it("should return the 2 pages with 20 items", () => {
  const { container } = render(<TestWrapper jobs={Array(20)} />, {
    wrapper: customRender
  });

  const currentPage = container.querySelector("#current-page");
  expect(currentPage?.textContent).toBe("1");
  const pageCount = container.querySelector("#page-count");
  expect(pageCount?.textContent).toBe("2");
  const beginIndex = container.querySelector("#begin-index");
  expect(beginIndex?.textContent).toBe("0");
  const endIndex = container.querySelector("#end-index");
  expect(endIndex?.textContent).toBe("10");
});

it("should not paginate with 10 items", () => {
  const { container } = render(<TestWrapper jobs={Array(10)} />, {
    wrapper: customRender
  });

  const pageCount = container.querySelector("#page-count");
  expect(pageCount?.textContent).toBe("0");
});

it("should return 3 pages with 21 items", () => {
  const { container } = render(<TestWrapper jobs={Array(21)} />, {
    wrapper: customRender
  });

  const currentPage = container.querySelector("#current-page");
  expect(currentPage?.textContent).toBe("1");
  const pageCount = container.querySelector("#page-count");
  expect(pageCount?.textContent).toBe("3");
  const beginIndex = container.querySelector("#begin-index");
  expect(beginIndex?.textContent).toBe("0");
  const endIndex = container.querySelector("#end-index");
  expect(endIndex?.textContent).toBe("10");
});

it("should update current page on click", () => {
  const { container } = render(<TestWrapper jobs={Array(21)} />, {
    wrapper: customRender
  });

  const currentPage = container.querySelector("#current-page");
  expect(currentPage?.textContent).toBe("1");
  const pageCount = container.querySelector("#page-count");
  expect(pageCount?.textContent).toBe("3");
  const beginIndex = container.querySelector("#begin-index");
  expect(beginIndex?.textContent).toBe("0");
  const endIndex = container.querySelector("#end-index");
  expect(endIndex?.textContent).toBe("10");

  const button = container.querySelector("button");
  fireEvent.click(button as Element);

  expect(currentPage?.textContent).toBe("2");
  expect(pageCount?.textContent).toBe("3");
  expect(beginIndex?.textContent).toBe("10");
  expect(endIndex?.textContent).toBe("20");

  fireEvent.click(button as Element);

  expect(currentPage?.textContent).toBe("3");
  expect(pageCount?.textContent).toBe("3");
  expect(beginIndex?.textContent).toBe("20");
  expect(endIndex?.textContent).toBe("30");
});
