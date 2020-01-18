import React from "react";
import styled from "styled-components";
import { Button } from "@welcome-ui/button";
import { CrossIcon } from "@welcome-ui/icons";
import { Job } from "../types";

type JobShowProps = {
  job: Job;
  onClose: () => void;
};

const JobShow: React.FC<JobShowProps> = ({ job, onClose }) => (
  <div>
    <StyledCrossIcon onClick={onClose} />
    <H2>Job description</H2>
    <hr />
    <div>
      <H3>{job.name}</H3>
      <JobInfos>
        {job.contract_type.en} - {job.office.name}
      </JobInfos>
      <Text dangerouslySetInnerHTML={{ __html: job.description }} />
    </div>
    <hr />
    <div>
      <H3>Profile</H3>
      <Text dangerouslySetInnerHTML={{ __html: job.profile }} />
    </div>
    <hr />
    <div>
      <H3>Recruitement process</H3>
      <Text
        dangerouslySetInnerHTML={{ __html: job.recruitment_process as string }}
      />
    </div>
    <WrapperButton>
      <Button
        variant="tertiary"
        padding="0px 30px"
        mt="30px"
        width={1 / 3}
        as="a"
        href={
          job.websites_urls?.find(w => w.website_reference === "wttj_fr")?.url
        }
        target="_blank"
      >
        Apply
      </Button>
    </WrapperButton>
  </div>
);

const StyledCrossIcon = styled(CrossIcon)`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  height: 20px;
  width: 20px;
`;

const H2 = styled("h2")`
  ${({ theme }) => theme.texts.h2}
  font-size: 1.3rem;
`;

const H3 = styled("h3")`
  margin-bottom: 0px;
  ${({ theme }) => theme.texts.h3}
`;

const Text = styled("p")`
  ${({ theme }) => theme.texts.body2}
`;

const WrapperButton = styled("div")`
  text-align: center;
`;

const JobInfos = styled("span")`
  ${({ theme }) => theme.texts.subtitle1};
  color: ${({ theme }) => theme.colors.nude[800]};
`;

export default JobShow;
