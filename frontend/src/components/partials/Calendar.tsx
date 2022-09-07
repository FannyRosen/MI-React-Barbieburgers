import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { FlexDiv } from "../StyledComponents/Wrappers";

interface IProps {
  handleDate(d: Date): void;
  defaultDate?: Date;
}
const today = Date.now();
const curr = new Date(today);

export const MyCalendar = (props: IProps) => {
  const theDate = new Date(props.defaultDate || curr);
  const [date, setDate] = useState(theDate);

  useEffect(() => {
    props.handleDate(date);
  }, [date]);

  return (
    <FlexDiv dir={"column"} width="50%" tabletwidth="90%">
      <div className="react-calendar">
        <Calendar
          minDate={curr}
          maxDate={new Date("2023-12-31")}
          onChange={setDate}
          value={date}
        />
      </div>
    </FlexDiv>
  );
};
