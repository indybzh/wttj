import React from "react";
import { Job } from "../types";
import styled from "styled-components";
import { Button } from "@welcome-ui/button";

type JobListItemProps = {
  job: Job;
  onClick: (job: Job) => void;
};

const JobListItem: React.FC<JobListItemProps> = ({ job, onClick }) => (
  <Li>
    <Article>
      <div>
        <JobName>{job.name}</JobName>
        <JobInfos>
          {job.contract_type.en} - {job.office.name}
        </JobInfos>
      </div>
      <Button variant="secondary" onClick={onClick}>
        See more
      </Button>
    </Article>
  </Li>
);

const Li = styled("li")`
  list-style: none;
  background: ${({ theme }) => theme.colors.light[700]};
  padding: 25px 20px;
  margin-bottom: 10px;
`;

const Article = styled("article")`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const JobName = styled("h3")`
  margin: 0;
  ${({ theme }) => theme.texts.h3};
`;

const JobInfos = styled("span")`
  ${({ theme }) => theme.texts.subtitle1};
  color: ${({ theme }) => theme.colors.nude[500]};
`;

export default JobListItem;
