import React from "react";
import { render, fireEvent } from "@testing-library/react";
import JobShow from "./job-show";

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
  description: "<p>description</p>",
  profile: "<p>profile</p>",
  contract_type: {
    en: "Full-Time"
  },
  office: {
    name: "Paris"
  },
  websites_urls: [
    {
      website_reference: "wttj_fr",
      url:
        "https://www.welcometothejungle.com/fr/companies/wttj/jobs/developpeur-full-stack-react-js-ruby-go-elixir_paris"
    }
  ]
};

it("should render job-show", () => {
  const { getByText } = render(<JobShow job={job} onClose={() => {}} />, {
    wrapper: customRender
  });

  expect(getByText(job.name, { selector: "h3" })).toBeInTheDocument();
  expect(getByText("description", { selector: "p" })).toBeInTheDocument();
});

it("should close job-show on fired onClose prope", () => {
  let i = 0;
  const { container } = render(<JobShow job={job} onClose={() => i++} />, {
    wrapper: customRender
  });

  const svg = container.querySelector("svg");
  fireEvent.click(svg as Element);
  expect(i).toBe(1);
});

it("should display good link on Apply button", () => {
  const { container } = render(<JobShow job={job} onClose={() => {}} />, {
    wrapper: customRender
  });

  const a = container.querySelector("a");
  expect(a?.href).toBe(
    "https://www.welcometothejungle.com/fr/companies/wttj/jobs/developpeur-full-stack-react-js-ruby-go-elixir_paris"
  );
});
