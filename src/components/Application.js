import React, { useEffect, useState } from "react";
import "components/Application.scss";
import DayList from "components/DayList/DayList";
import "components/appointment";
import Appointment from "components/appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
  // const [day, setDay] = useState("Monday");// Initial value
  // const [days, setDays] = useState([]);
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // appointments: {},
  });

  const setDay = (day) => setState({ ...state, day });
  // const setDays = (days) => setState((prev) => ({ ...prev, days }));

  // const dailyAppointments = [];
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });
  // let URL1 = "/api/days";
  // let URL2 = "/api/appointments";
  // let URL3 = "/api/interviewers";

  // const promise1 = axios.get(URL1);
  // const promise2 = axios.get(URL2);
  // const promise3 = axios.get(URL3);

  useEffect(() => {
    // Promise.all([promise1, promise2, promise3]).then((res) => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((res) => {
      setState((prev) => ({
        ...prev,
        days: res[0].data,
        appointments: res[1].data,
        interviewers: res[2].data,
      }));
      // console.log("Interviewers" + state.interviewers);
    });
  }, []);

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
