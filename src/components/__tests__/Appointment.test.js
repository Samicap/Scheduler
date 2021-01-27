import React from "react";

import { render } from "@testing-library/react";

import Application from "components/Application";

const props =  {
"id":2,
"time":"1pm",
"interview":
  {"student":"Chad Takahashi",
  "interviewer":{
    "id":7,
    "name":"Alec Quon",
    "avatar":"https://i.imgur.com/3tVgsra.jpg"}},
"interviewers":[
  {"id":1,"name":"Sylvia Palmer","avatar":"https://i.imgur.com/LpaY82x.png"},
  {"id":4,"name":"Cohana Roy","avatar":"https://i.imgur.com/FK8V841.jpg"},
  {"id":5,"name":"Sven Jones","avatar":"https://i.imgur.com/twYrpay.jpg"},
  {"id":7,"name":"Alec Quon","avatar":"https://i.imgur.com/3tVgsra.jpg"},
  {"id":9,"name":"Lindsay Chu","avatar":"https://i.imgur.com/nPywAp1.jpg"}
]}

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Application />);
  });
});
