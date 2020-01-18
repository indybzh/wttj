import React, { useState, useEffect, useReducer, useCallback } from "react";
import styled from "styled-components";
import Modal from "react-modal";

import getJobs from "../api";
import { Job, defaultStateFilters } from "../types";
import JobFilters from "./job-filters";
import JobListItem from "./job-list-item";
import JobShow from "./job-show";
import Loader from "../feedbacks/loader";
import { Pagination } from "@welcome-ui/pagination";
import usePagination from "../hooks/use-pagination";

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
  const [jobSelected, setJobSelected] = useState();

  const [filters, dispatch] = useReducer(filtersReducer, {
    searchInput: "",
    publishedAfter: null,
    contractType: "Contract Type",
    contractTypes: ["Contract Type"],
    groupBy: "Group by",
    groupsBy: ["Group by"]
  });

  const [
    currentPage,
    pageCount,
    beginIndex,
    endIndex,
    setCurrentPage
  ] = usePagination(filteredJobs);

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

  const handleSelect = useCallback((job: Job) => {
    setJobSelected(job);
  }, []);

  return (
    <Wrapper>
      <Title>Our offers</Title>

      {isLoading ? (
        <WrapperLoader>
          <Loader />
        </WrapperLoader>
      ) : (
        <>
          <JobFilters filters={filters} dispatch={dispatch} />
          <List>
            {filteredJobs.slice(beginIndex, endIndex).map((job: Job) => (
              <JobListItem
                key={job.id}
                job={job}
                onClick={() => handleSelect(job)}
              />
            ))}
          </List>
          {pageCount > 0 && (
            <WrapperPagination>
              <Pagination
                aria-label="Pagination"
                page={currentPage}
                onChange={setCurrentPage}
                pageCount={pageCount}
              />
            </WrapperPagination>
          )}
          {jobSelected && (
            <Modal
              isOpen={true}
              ariaHideApp={false}
              style={modalStyle}
              shouldCloseOnOverlayClick={true}
              onRequestClose={() => setJobSelected(undefined)}
            >
              <JobShow
                job={jobSelected}
                onClose={() => setJobSelected(undefined)}
              />
            </Modal>
          )}
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
  min-height: calc(100vh - 100px);

  @media all and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    min-height: 100vh;
  }
`;

const Title = styled("h2")`
  text-align: center;
  ${({ theme }) => theme.texts.h2}
`;

const List = styled("ul")`
  margin: 20px 0px;
  padding: 0;
`;

const WrapperLoader = styled("div")`
  height: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WrapperPagination = styled("div")`
  text-align: center;
  margin: 50px 0px;
`;

const modalStyle = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)"
  },
  content: {
    maxWidth: 736,
    margin: "0 auto"
  }
};

export default JobList;
