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
