function getAppointmentsForDay(state, day) {
  // what is this state?
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
  // interview is an object

  let newInterviewObj = null;

  if (interview !== null) {
    const student = interview.student;
    const interviewersObj = state.interviewers;
    const interviewerId = interview.interviewer;
    const id = interviewerId.toString();

    const interviewer = interviewersObj[id];

    newInterviewObj = {
      student: student,
      interviewer: interviewer,
    };
  }
  return newInterviewObj;

  // const interviewer = state.interviewers[id]; // this is the object containing {id, name, avatar}
  // console.log(interviewer)
  //loop over interviwers to get keys in interviewers
  // for (let key in interviewersObj) {
  //   // check if keys in interviwers equal id given
  //   if (key === id) {
  //     // add student and interviwer object to new object
  //     console.log("Key: " + key);
  //     let interviewer = interviewersObj[key];
  //     console.log(interviewer);
  //     newInterviewObj.student = student;
  //     newInterviewObj.interviewer = interviewer;
  //     console.log("Object: " + newInterviewObj.student)
  //     console.log("==========================")
  //     return newInterviewObj;
  //   }
  // }
  // }
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
