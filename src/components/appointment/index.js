import React from "react";
import Header from "components/appointment/Header";
import Empty from "components/appointment/Empty";
import Show from "components/appointment/Show";
import "components/appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onAdd = () => transition(CREATE);

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => console.log("Clicked onAdd")} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          // onEdit={action("onEdit")}
          // onDelete={action("onDelete")}
        />
      )}
      { mode === CREATE && (
        <Form
          name={"Sam"}
          interviewer={null}
          interviewers={props.interviewers}
          onCancel={back}
          // onSave={onSave}
        />
      )}
    </article>
  );
}

