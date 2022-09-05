import { useState } from "react";
import Calendar from "react-calendar";

export const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <div className="app">
        <div className="react-calendar">
          <Calendar onChange={setDate} value={date} />
        </div>
        <p className="text-center">
          <span className="bold">Selected Date:</span> {date.toDateString()}
        </p>
      </div>
    </>
  );
};
