import React from "react";
import Header from "components/appointment/Header";
import Empty from "components/appointment/Empty";
import Show from "components/appointment/Show";
import Status from "components/appointment/Status";
import Confirm from "components/appointment/Confirm";
import "components/appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);

    props
      .bookInterview(props.id, interview) // returns a promise
      .then(() => transition(SHOW));
  }

  function removeAppointment(id) {
    transition(DELETING);
    props.cancelInterview(props.id).then(() => transition(EMPTY));
  }


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CREATE && (
        <Form
          name={""}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => transition(SHOW)} // Needs a transition to show? or back?
          onConfirm={removeAppointment} // CAll tanisiton to status in function
        />
      )}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === EDIT && 
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.name}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />}
    </article>
  );
}
