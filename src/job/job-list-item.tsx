import React from "react";
import { Job } from "../types";
import styled, { keyframes } from "styled-components";
import { Button } from "@welcome-ui/button";

type JobListItemProps = {
  job: Job;
  onClick: (job: Job) => void;
};

const JobListItem: React.FC<JobListItemProps> = React.memo(
  ({ job, onClick }) => (
    <Li>
      <Article>
        <div>
          <JobName>{job.name}</JobName>
          <JobInfos>
            {job.contract_type.en} - {job.office.name}
          </JobInfos>
        </div>
        <StyledButton variant="quaternary" onClick={onClick}>
          See more
        </StyledButton>
      </Article>
    </Li>
  )
);

const fadeInDown = keyframes`
  from {
    opacity: 0.5;
    transform: translate3d(0, -5px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const Li = styled("li")`
  list-style: none;
  background-color: ${({ theme }) => theme.colors.light[700]};
  padding: 25px 20px;
  margin-bottom: 10px;
  transition: background-color 0.3s;
  animation: ${fadeInDown} 0.2s linear;

  &:hover {
    background-color: ${({ theme }) => theme.colors.light[900]};
  }
`;

const Article = styled("article")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  @media all and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const JobName = styled("h3")`
  margin: 0;
  ${({ theme }) => theme.texts.h3};
`;

const JobInfos = styled("span")`
  ${({ theme }) => theme.texts.subtitle1};
  color: ${({ theme }) => theme.colors.nude[500]};
`;

const StyledButton = styled(Button)`
  padding: 0px 20px;
  min-width: 100px;

  @media all and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    align-self: flex-end;
  }
`;

export default JobListItem;
