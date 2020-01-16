import React from "react";
import { defaultStateFilters } from "../types";

import styled from "styled-components";
import { InputText } from "@welcome-ui/input-text";
import { DatePicker } from "@welcome-ui/date-picker";

type JobFiltersProps = {
    filters: defaultStateFilters;
    dispatch: React.Dispatch<{ type: string; value: string }>;
};

const JobFilters: React.FC<JobFiltersProps> = ({ filters, dispatch }) => (
    <Form>
        <InputText
            isClearable
            placeholder="Your dream job?"
            value={filters.searchInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch({
                    type: "update_search_input",
                    value: e.target.value
                })
            }
        />
        {filters.contractTypes.length > 0 && (
            <select
                onChange={e =>
                    dispatch({
                        type: "update_contract_type",
                        value: e.target.value
                    })
                }
                value={filters.contractType}
            >
                <option value="">Contract Type</option>
                {filters.contractTypes.map((ct: string) => (
                    <option key={ct} value={ct}>
                        {ct}
                    </option>
                ))}
            </select>
        )}
        <DatePicker
            value={filters.publishedAfter}
            placeholder="Date"
            onChange={(date: string) =>
                dispatch({
                    type: "udpate_published_after",
                    value: date
                })
            }
        />
        {filters.groupsBy.length > 0 && (
            <select
                onChange={e =>
                    dispatch({
                        type: "update_group_by",
                        value: e.target.value
                    })
                }
                value={filters.groupBy}
            >
                <option value="">Group by</option>
                {filters.groupsBy.map((v: string) => (
                    <option key={v} value={v}>
                        {v}
                    </option>
                ))}
            </select>
        )}
    </Form>
);

const Form = styled("form")`
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
`;

export default JobFilters;
