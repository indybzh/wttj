import React, { useState, useEffect, useReducer } from "react";
import styled from "styled-components";

import getJobs from "../api";
import { Job, defaultStateFilters } from "../types";

import JobFilters from "./job-filters";
import JobListItem from "./job-list-item";

const filtersReducer = (
  state: defaultStateFilters,
  {
    type,
    key,
    value
  }: {
    type: string;
    key?: string;
    value: any;
  }
) => {
  switch (type) {
    case "init_filters": {
      return {
        ...state,
        contractTypes: [...state.contractTypes, ...value.contractTypes],
        groupsBy: [...state.groupsBy, ...value.groupsBy]
      };
    }
    case "update_filter": {
      return { ...state, [key as string]: value };
    }
    default:
      throw new Error(`Unknow type: ${type}`);
  }
};

const JobList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [filters, dispatch] = useReducer(filtersReducer, {
    searchInput: "",
    publishedAfter: null,
    contractType: "Contract Type",
    contractTypes: ["Contract Type"],
    groupBy: "Group by",
    groupsBy: ["Group by"]
  });

  useEffect(() => {
    getJobs()
      .then(({ jobs }) => {
        dispatch({
          type: "init_filters",
          value: {
            contractTypes: Array.from(
              new Set(jobs.map((j: Job) => j.contract_type.en))
            ),
            groupsBy: Array.from(new Set(jobs.map((j: Job) => j.office.name)))
          }
        });
        setJobs(jobs);
        setFilteredJobs(jobs);
      })
      .catch(err => {
        throw new Error(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const { searchInput, contractType, publishedAfter, groupBy } = filters;
    const conditions: Array<(j: Job) => boolean> = [];

    if (searchInput.length > 1) {
      conditions.push(
        (j: Job) =>
          j.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          j.description.toLowerCase().includes(searchInput.toLowerCase()) ||
          j.office.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    if (contractType !== "Contract Type") {
      conditions.push((j: Job) => j.contract_type.en === contractType);
    }

    if (publishedAfter && publishedAfter !== "") {
      conditions.push(
        (j: Job) =>
          new Date(j.published_at).getTime() >
          new Date(publishedAfter).getTime()
      );
    }

    if (groupBy !== "Group by") {
      conditions.push((j: Job) => j.office.name === groupBy);
    }

    const newJobs = conditions.reduce((acc, cur) => acc.filter(cur), jobs);
    setFilteredJobs(newJobs);
  }, [filters]); // eslint-disable-line

  return (
    <Wrapper>
      <Title>Our offers</Title>

      {isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          <JobFilters filters={filters} dispatch={dispatch} />
          <List>
            {filteredJobs.map((job: Job) => (
              <JobListItem key={job.id} job={job} onClick={() => {}} />
            ))}
          </List>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled("div")`
  max-width: ${({ theme }) => theme.breakpoints.md}px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.nude[100]};
  padding: 5px 20px;
  min-height: 600px;
`;

const Title = styled("h2")`
  text-align: center;
  ${({ theme }) => theme.texts.h2}
`;

const List = styled("ul")`
  margin-top: 20px;
  padding: 0;
`;

export default JobList;
