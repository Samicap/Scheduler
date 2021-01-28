import React from "react";
import "components/Application.scss";
import DayList from "components/DayList/DayList";
import "components/appointment";
import Appointment from "components/appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
import useApplicationData from "../hooks/useApplicationData";

export default function Application(props) {
  // console.log("orange: ", useApplicationData())

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();

  // console.log("State.spot: ", state.spot)
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  // });

  // const setDay = (day) => setState({ ...state, day });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  // console.log("DAily APpt: ", JSON.stringify(dailyAppointments))
  const interviewers = getInterviewersForDay(state, state.day); // Gets the list/array of interviewers appear on the form when passed to appointments component

  // function bookInterview(id, interview) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview },
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment,
  //   };

  //   return axios
  //     .put(`/api/appointments/${id}`, { interview })
  //     .then((response) => {
  //       // console.log("Axios response:" + JSON.stringify(response))
  //       setState({
  //         ...state,
  //         appointments,
  //       });

  //       console.log(id, interview);
  //     });
  // }

  // function cancelInterview(id) {
  //   // need to

  //   return axios.delete(`/api/appointments/${id}`).then((response) => {
  //     // need to update local state in memory
  //     const appointment = {
  //       ...state.appointments[id],
  //       interview: null,
  //     };
  //     const appointments = {
  //       // overwrites the old state with that id
  //       ...state.appointments,
  //       [id]: appointment,
  //     };
  //     console.log("Appointmnets", appointments);

  //     setState({ ...state, appointments }); // appointment array of objects
  //   });
  // }

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  // useEffect(() => {
  //   Promise.all([
  //     axios.get("/api/days"),
  //     axios.get("/api/appointments"),
  //     axios.get("/api/interviewers"),
  //   ]).then((res) => {
  //     setState((prev) => ({
  //       ...prev,
  //       days: res[0].data,
  //       appointments: res[1].data,
  //       interviewers: res[2].data,
  //     }));
  //     // console.log("Interviewers" + state.interviewers);
  //   });
  // }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
        {/* <Appointment key={appointment.id} {...appointment} /> */}
      </section>
    </main>
  );
}
