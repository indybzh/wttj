import React, { useState, useEffect, useReducer } from "react";
import styled from "styled-components";

import getJobs from "../api";
import { Job, defaultStateFilters } from "../types";

import JobFilters from "./job-filters";

const filtersReducer = (state: defaultStateFilters, { type, value }: any) => {
    switch (type) {
        case "init_filters": {
            return { ...state, ...value };
        }
        case "update_search_input": {
            return { ...state, searchInput: value };
        }
        case "update_group_by": {
            return { ...state, groupBy: value };
        }
        case "update_contract_type": {
            return { ...state, contractType: value };
        }
        case "udpate_published_after": {
            return { ...state, publishedAfter: value };
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
        contractType: "",
        contractTypes: [],
        groupBy: "",
        groupsBy: []
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
                        groupsBy: Array.from(
                            new Set(jobs.map((j: Job) => j.office.name))
                        )
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
        let newJobs = [...jobs];

        if (filters.contractType !== "") {
            newJobs = newJobs.filter(
                (j: Job) => j.contract_type.en === filters.contractType
            );
        }

        if (filters.searchInput.length > 1) {
            newJobs = newJobs.filter(
                (j: Job) =>
                    j.name.toLowerCase().includes(filters.searchInput) ||
                    j.description.toLowerCase().includes(filters.searchInput) ||
                    j.office.name.toLowerCase().includes(filters.searchInput)
            );
        }

        if (filters.groupBy !== "") {
            newJobs = newJobs.filter(
                (j: Job) => j.office.name === filters.groupBy
            );
        }

        setFilteredJobs(newJobs);
    }, [filters]);

    return (
        <Wrapper>
            <Title>Our offers</Title>

            <JobFilters filters={filters} dispatch={dispatch} />

            {isLoading ? (
                <div>loading...</div>
            ) : (
                <div>
                    {filteredJobs.map((job: Job) => (
                        <article key={job.id}>
                            {job.name} {job.contract_type.en} {job.office.name}
                            <button>See more</button>
                        </article>
                    ))}
                </div>
            )}
        </Wrapper>
    );
};

const Wrapper = styled("div")`
    max-width: 600px;
    margin: 0 auto;
`;

const Title = styled("h2")`
    text-align: center;
`;

export default JobList;
