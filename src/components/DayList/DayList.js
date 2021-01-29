import React from "react";
import DayListItem from "components/DayList/DayListItem";

export default function DayList(props) {
  const dayTest2 = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });
  return <ul>{dayTest2}</ul>;
}
