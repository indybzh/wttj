import React, { useRef } from "react";
import styled from "styled-components";

import { InputText } from "@welcome-ui/input-text";
import { DatePicker } from "@welcome-ui/date-picker";
import { Select } from "@welcome-ui/select";

import { defaultStateFilters } from "../types";

type JobFiltersProps = {
  filters: defaultStateFilters;
  dispatch: React.Dispatch<{
    type: string;
    key: string;
    value: string | null;
  }>;
};

const JobFilters: React.FC<JobFiltersProps> = ({ filters, dispatch }) => {
  const datePickerRef = useRef(null);

  return (
    <Form>
      <WrapperField width={35}>
        <InputText
          isClearable
          placeholder="Your dream job?"
          value={filters.searchInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: "update_filter",
              key: "searchInput",
              value: e.target.value
            })
          }
        />
      </WrapperField>
      {filters.contractTypes.length > 0 && (
        <WrapperField width={25}>
          <Select
            value={filters.contractType}
            options={filters.contractTypes.map(c => ({
              label: c,
              value: c
            }))}
            onChange={(value: string) =>
              dispatch({
                type: "update_filter",
                key: "contractType",
                value
              })
            }
          />
        </WrapperField>
      )}
      <WrapperField width={15}>
        <DatePicker
          value={filters.publishedAfter}
          ref={datePickerRef}
          placeholder="Date"
          maxDate={new Date()}
          onChange={(date: string) => {
            dispatch({
              type: "update_filter",
              key: "publishedAfter",
              value: date ?? null
            });
          }}
        />
      </WrapperField>
      {filters.groupsBy.length > 0 && (
        <WrapperField width={20}>
          <Select
            value={filters.groupBy}
            options={filters.groupsBy.map(g => ({
              label: g,
              value: g
            }))}
            onChange={(value: string) =>
              dispatch({
                type: "update_filter",
                key: "groupBy",
                value
              })
            }
          />
        </WrapperField>
      )}
    </Form>
  );
};

const Form = styled("form")`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
`;

const WrapperField = styled(({ width, ...rest }) => <div {...rest} />)`
  width: ${props => props.width}%;
`;

export default JobFilters;
