function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  if (state.days === []) return [];

  const daysArray = state.days.filter((element) => element.name === day); // [1, 2]

  let keys = [];
  if (daysArray[0] !== undefined) keys = daysArray[0].appointments;

  if (keys === []) return [];

  let outputs = [];

  for (let key of keys) {
    outputs.push(state.appointments[key.toString()]);
  }

  return outputs;
}

// export function getAppointmentsForDay(state, day) {
//   if (state.days.length === 0) {
//     return [];
//   }
//   // find the object in our state.days array who's name matches the provided day.
//   let dayArr = state.days.filter(eachDay => eachDay.name === day);
//   if (dayArr.length === 0) {
//     return [];
//   }
//   // access that specific days appointment array.
//   let appointmentsArr = dayArr[0].appointments;
//   let eachAppointment = appointmentsArr.map(appointment => state.appointments[appointment])
//   return eachAppointment;
// }

function getInterview(state, interview) {
  if (!interview) return interview;

  let interviewerId = interview.interviewer;

  return {
    ...interview,
    interviewer: {
      id: interviewerId,
      name: state.interviewers[interviewerId].name,
      avatar: state.interviewers[interviewerId].avatar,
    },
  };
}

function getInterviewersForDay(state, day) {
  if (state.days === []) return [];

  const daysArray = state.days.filter((element) => element.name === day); // [1, 2]

  let keys = [];
  if (daysArray[0] !== undefined) keys = daysArray[0].interviewers;

  if (keys === []) return [];

  let outputs = [];
  for (let key of keys) {
    outputs.push(state.interviewers[key.toString()]);
  }

  return outputs;
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
