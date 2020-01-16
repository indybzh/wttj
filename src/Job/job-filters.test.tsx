import React from "react";
import { render } from "@testing-library/react";
import JobFilters from "./job-filters";
import { defaultStateFilters } from "../types";

const filters: defaultStateFilters = {
    searchInput: "",
    publishedAfter: null,
    contractType: "",
    contractTypes: [],
    groupBy: "",
    groupsBy: []
};

it("should render search input without selects", () => {
    const { container } = render(
        <JobFilters filters={filters} dispatch={() => {}} />
    );

    const inputs = container.querySelectorAll("input");
    expect(inputs.length).toBe(2);
    const selects = container.querySelectorAll("select");
    expect(selects.length).toBe(0);
});

it("should render inputs and selects", () => {
    const { container } = render(
        <JobFilters
            filters={{
                ...filters,
                groupsBy: ["Paris", "Prague"],
                contractTypes: ["Full-Time", "Internship"]
            }}
            dispatch={() => {}}
        />
    );

    const inputs = container.querySelectorAll("input");
    expect(inputs.length).toBe(2);
    const selects = container.querySelectorAll("select");
    expect(selects.length).toBe(2);
});

it("should display search input placeholder", () => {
    const { container } = render(
        <JobFilters
            filters={{
                ...filters,
                groupsBy: ["Paris", "Prague"],
                contractTypes: ["Full-Time", "Internship"]
            }}
            dispatch={() => {}}
        />
    );

    const input = container.querySelector("input");
    expect(input?.placeholder).toBe("Your dream job?");
});
