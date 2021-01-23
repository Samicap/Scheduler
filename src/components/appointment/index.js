import React from "react";
import Header from "components/appointment/Header";
import Empty from "components/appointment/Empty";
import Show from "components/appointment/Show";
import "components/appointment/styles.scss";

export default function Appointment(props) {

  return (
  <article className="appointment">
    <Header 
    time={props.time}
    />
    {props.interview ? 
      <Show 
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}/> 
        : <Empty />}


  </article>
  
  );
}
