import React from "react";
import { render, fireEvent } from "@testing-library/react";
import JobListItem from "./job-list-item";

import { ThemeProvider } from "@xstyled/styled-components";
import { createTheme } from "@welcome-ui/core";
import { Job } from "../types";

const customRender: React.FC = ({ children }) => (
  <ThemeProvider theme={createTheme()}>{children}</ThemeProvider>
);

const job: Job = {
  id: 1,
  name: "Backend Developer (Ruby / Elixir)",
  published_at: "2020-01-16T09:50:58.202+01:00",
  description: "",
  profile: "",
  contract_type: {
    en: "Full-Time"
  },
  office: {
    name: "Paris"
  }
};

it("should render job-list-item", () => {
  const { container } = render(<JobListItem job={job} onClick={() => {}} />, {
    wrapper: customRender
  });

  const li = container.querySelectorAll("li");
  expect(li.length).toBe(1);
});

it("should display job.name", () => {
  const { getByText, container } = render(
    <JobListItem job={job} onClick={() => {}} />,
    {
      wrapper: customRender
    }
  );

  expect(getByText(job.name)).toBeInTheDocument();
  const h3s = container.querySelectorAll("h3");
  expect(h3s.length).toBe(1);
  expect(h3s[0].textContent).toBe(job.name);
});

it("should display job.contract_type.en and job.office.name", () => {
  const { getByText } = render(<JobListItem job={job} onClick={() => {}} />, {
    wrapper: customRender
  });

  expect(
    getByText(`${job.contract_type.en} - ${job.office.name}`)
  ).toBeInTheDocument();
});

it("should call onClick props", () => {
  let i = 0;
  const { container } = render(<JobListItem job={job} onClick={() => i++} />, {
    wrapper: customRender
  });

  const buttons = container.querySelectorAll("button");
  expect(buttons.length).toBe(1);

  fireEvent.click(buttons[0]);
  expect(i).toBe(1);
});
