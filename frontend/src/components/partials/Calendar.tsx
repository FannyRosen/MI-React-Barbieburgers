import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { FlexDiv } from "../StyledComponents/Wrappers";

export const MyCalendar = ({ handleDate }: any) => {
  const [date, setDate] = useState(new Date());
  const today = Date.now();
  const curr = new Date(today);

  useEffect(() => {
    handleDate(date);
  }, [date]);

  return (
    <FlexDiv dir={"column"} width='80%'>
      <div className='react-calendar'>
        <Calendar
          minDate={curr}
          defaultValue={curr}
          maxDate={new Date("2023-12-31")}
          onChange={setDate}
          value={date}
        />
      </div>
    </FlexDiv>
  );
};
