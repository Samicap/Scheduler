import { useEffect, useState } from "react";
import axios from "axios";

function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
  });
  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
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

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const newDays = [...state.days];
    // Use the appt id to find the day that needs the spots to change
    for (let dayIndex in state.days) { // need to access the index of the day. state.days is an array
      const index = state.days[dayIndex].appointments.find((i) => id === i);
      if (index) {
        newDays[dayIndex] = {
          ...state.days[dayIndex],
          spots: (state.days[dayIndex].spots -= 1),
        };

        setState({ ...state, days: newDays });
      }
    }

    // days have an array of appt ids and we need to find which one this id belongs to

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        // console.log("Axios response:" + JSON.stringify(response))
        setState({
          ...state,
          appointments,
        });
      });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      // need to update local state in memory
      const appointment = {
        ...state.appointments[id],
        interview: null,
      };
      const appointments = {
        // overwrites the old state with that id
        ...state.appointments,
        [id]: appointment,
      };

      const newDays = [...state.days];
      // console.log("appoint: ", appointments);
      // Use the appt id to find the day that needs the spots to change
      for (let dayIndex in state.days) {
        const index = state.days[dayIndex].appointments.find((i) => id === i);
        if (index) {
          newDays[dayIndex] = {
            ...state.days[dayIndex],
            spots: (state.days[dayIndex].spots += 1),
          };

          setState({ ...state, days: newDays });
        }
      }

      setState({ ...state, appointments }); // appointment array of objects
    });
  }
  return { cancelInterview, bookInterview, state, setDay };
}

export default useApplicationData;
