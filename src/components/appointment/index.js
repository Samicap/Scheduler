import React from "react";
import Header from "components/appointment/Header";
import Empty from "components/appointment/Empty";
import Show from "components/appointment/Show";
import Status from "components/appointment/Status";
import Confirm from "components/appointment/Confirm";
import Error from "components/appointment/Error";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import "components/appointment/styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);

    props
      .bookInterview(props.id, interview) // returns a promise
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  function removeAppointment(id) {
    transition(DELETING);

    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment" data-testid="appointment">
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
          onCancel={() => transition(SHOW)}
          onConfirm={removeAppointment} // CAll tanisiton to status in function
        />
      )}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment" onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not cancel appointment" onClose={back} />
        )}
    </article>
  );
}
