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
      <WrapperField width={[35, 100]}>
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
        <WrapperField width={[25, 100]}>
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
      <WrapperField width={[15, 49]}>
        <StyledDatePicker
          value={filters.publishedAfter}
          ref={datePickerRef}
          placeholder="Date"
          maxDate={new Date()}
          popperProps={{
            placement: "bottom-start"
          }}
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
        <WrapperField width={[20, 49]}>
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

  @media all and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    flex-wrap: wrap;

    & > div {
      margin-bottom: 5px;
    }
  }
`;

const WrapperField = styled(({ width, ...rest }) => <div {...rest} />)`
  width: ${props => props.width[0]}%;

  @media all and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    width: ${props => props.width[1]}%;
  }

  /* workarround datepicker */
  & .react-datepicker-wrapper {
    width: 100% !important;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  ::placeholder {
    font-weight: ${({ theme }) => theme.fields.default["font-weight"]};
    color: ${({ theme }) => theme.fields.default["color"]};
  }
`;

export default JobFilters;
