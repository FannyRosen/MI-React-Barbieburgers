import { colors } from "./StyledComponents/mixins";
import { FlexDiv, ImageDiv } from "./StyledComponents/Wrappers";
import background from "../assets/background.png";
import { StyledButton } from "./StyledComponents/StyledButton";
import { useEffect, useRef, useState } from "react";
import { PageIndicator } from "./partials/PageIndicator";
import { Navigate } from "react-router-dom";
import { IFormCustomer } from "../models/ICustomer";
import {
  fetchBookings,
  postBooking,
} from "../services/handleBookingsFetch.service";
import { Loader } from "./partials/Loader";
import { StyledLabel } from "./StyledComponents/TextElements";
import { Form, Input } from "./StyledComponents/Form";

// validera datum

export const Book = () => {
  const [phase, setPhase] = useState(1);
  const [date, setDate] = useState<Date>(new Date());
  const [numberOfPeople, setNOP] = useState<number>(0);
  const [customerInfo, setCustomerInfo] = useState<IFormCustomer>({
    name: "",
    email: "",
    phone: "",
  });
  const [arrayFirstSitting, setArrayFirstSitting] = useState<IArrayOfDates[]>(
    []
  );
  const [firstIsAvailable, setFirstIsAvailable] = useState(false);
  const [secondIsAvailable, setSecondIsAvailable] = useState(false);

  const [arraySecondSitting, setArraySecondSitting] = useState<IArrayOfDates[]>(
    []
  );
  const [sitting, setSitting] = useState(0);

  const curr = new Date();
  curr.setDate(curr.getDate());
  const inputDate = curr.toISOString().substring(0, 10);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(e.target.value));
  };

  const handleNOPChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNOP(parseInt(e.currentTarget.value));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(customerInfo);
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
    <Navigate to={"/thankyou"} />;
  };

  interface IArrayOfDates {
    date: Date;
  }

  const checkDate = () => {
    fetchBookings()
      .then(async (response) => {
        for (let i = 0; i < response.data.length; i++) {
          let dbDate = new Date(response.data[i].date);
          if (dbDate.getTime() == date.getTime()) {
            if (response.data[i].sittingTime == "6.00 pm") {
              setArrayFirstSitting([...arrayFirstSitting, { date: dbDate }]);
            }
            if (response.data[i].sittingTime == "9.00 pm") {
              setArraySecondSitting([...arraySecondSitting, { date: dbDate }]);
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setPhase(2);
  };

  useEffect(() => {
    if (arrayFirstSitting.length >= 15) {
      setFirstIsAvailable(false);
    } else if (arrayFirstSitting.length <= 15) {
      setFirstIsAvailable(true);
    }
    if (arraySecondSitting.length >= 15) {
      setSecondIsAvailable(false);
    } else if (arraySecondSitting.length <= 15) {
      setSecondIsAvailable(true);
    }
  }, [arrayFirstSitting, arraySecondSitting]);

  const completeBooking = () => {
    postBooking({
      date,
      sittingTime: sitting.toString(),
      numberOfPeople,
      name: customerInfo.name,
      email: customerInfo.email,
      phone: customerInfo.phone,
    });
    <Navigate to={"/thankyou"} />;
  };

  return (
    <ImageDiv image={background} height="100vh" margin="0 50px 0 50px">
      <FlexDiv
        borderRadius="10px"
        background={colors.LightPink}
        width="80%"
        height="min-content"
        dir="column"
      >
        <FlexDiv dir="column" padding="40px">
          {phase === 1 && (
            <>
              <h2>Book a table</h2>
              <Form
                onSubmit={() => {
                  if (numberOfPeople != 0) {
                    checkDate();
                  } else {
                    console.log("error");
                  }
                }}
              >
                <FlexDiv dir="column" gap="10px">
                  <StyledLabel>Choose a date</StyledLabel>
                  <input
                    required
                    onChange={handleDateChange}
                    id="date"
                    type="date"
                    name="date"
                    defaultValue={""}
                    min={inputDate}
                    max={"2023-12-31"}
                  />

                  <label>Number of people</label>
                  <select
                    required
                    id="date"
                    name="date"
                    onChange={handleNOPChange}
                    defaultValue="0"
                  >
                    <option disabled value="0">
                      0
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                  <p>
                    Maximum per table: 6 <br />
                    If you are more than 6 people you will be divided between
                    tables
                  </p>
                  <Input type="submit" value={"Check availability"} />
                </FlexDiv>
              </Form>
            </>
          )}
          {phase === 2 && (
            <>
              <h2>Available sittings</h2>
              <FlexDiv gap="10px" dir="column">
                {firstIsAvailable ? (
                  <StyledButton
                    color="white"
                    onClick={() => {
                      setSitting(1);
                      setPhase(3);
                    }}
                  >
                    Book 6.00pm
                  </StyledButton>
                ) : (
                  <p>First sitting is not available</p>
                )}
                {secondIsAvailable ? (
                  <StyledButton
                    color="white"
                    onClick={() => {
                      setSitting(2);
                      setPhase(3);
                    }}
                  >
                    Book 9.00pm
                  </StyledButton>
                ) : (
                  <p>Second sitting is not available</p>
                )}
              </FlexDiv>
            </>
          )}
          {phase === 3 && (
            <>
              <h2>Your information</h2>
              <p>
                Your booking: <br />
                {date.toLocaleDateString()} <br />
                {sitting == 1 ? "6.00 pm" : "9.00 pm"}
                <br />
                {numberOfPeople} people
              </p>

              <Form onSubmit={completeBooking}>
                <FlexDiv dir="column">
                  <label>Name:</label>
                  <input
                    required
                    onChange={handleChange}
                    type="text"
                    name="name"
                  />
                  <label>Email:</label>
                  <input
                    required
                    onChange={handleChange}
                    type="email"
                    name="email"
                  />
                  <label>Phone number:</label>
                  <input
                    required
                    onChange={handleChange}
                    type="number"
                    name="phone"
                  />

                  <Input type="submit" value={"book"} />
                </FlexDiv>
              </Form>
            </>
          )}
          <PageIndicator phase={phase} />
        </FlexDiv>
      </FlexDiv>
    </ImageDiv>
  );
};
