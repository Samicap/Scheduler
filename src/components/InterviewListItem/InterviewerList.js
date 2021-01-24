import React from "react";
import InterviewerListItem from "components/InterviewListItem/InterviewerListItem";
import "components/InterviewListItem/InterviewerList.scss";

export default function InterviewerList(props) {
  const interview = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });
  return <ul className="interviewers__list">{interview}</ul>;
}
