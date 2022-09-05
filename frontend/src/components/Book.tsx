import { colors } from "./StyledComponents/mixins";
import { FlexDiv } from "./StyledComponents/Wrappers";
import { StyledButton } from "./StyledComponents/StyledButton";
import { useEffect, useState } from "react";
import { PageIndicator } from "./partials/PageIndicator";
import { useNavigate } from "react-router-dom";
import { IFormCustomer } from "../models/ICustomer";
import {
  fetchBookings,
  postBooking,
} from "../services/handleBookingsFetch.service";
import { Loader } from "./partials/Loader";
import { StyledLabel } from "./StyledComponents/TextElements";
import { Form, Input, Label } from "./StyledComponents/Form";
import { Background } from "./StyledComponents/Background";

export const Book = () => {
  const [phase, setPhase] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
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
  const navigate = useNavigate();
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
    setCustomerInfo((customerInfo) => ({
      ...customerInfo,
      [e.target.name]: e.target.value,
    }));
  };

  interface IArrayOfDates {
    date: Date;
  }

  const checkDate = () => {
    setIsLoading(true);
    fetchBookings()
      .then(async (response) => {
        console.log(response);

        for (let i = 0; i < response.data.length; i++) {
          let dbDate = new Date(response.data[i].date);
          if (dbDate.getTime() == date.getTime()) {
            console.log("found same date");

            if (response.data[i].sittingTime === 1) {
              setArrayFirstSitting((arrayFirstSitting) => [
                ...arrayFirstSitting,
                { date: dbDate },
              ]);
            }
            if (response.data[i].sittingTime === 2) {
              setArraySecondSitting((arraySecondSitting) => [
                ...arraySecondSitting,
                { date: dbDate },
              ]);
            }
          }
        }

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    setPhase(2);
  };

  useEffect(() => {
    if (arrayFirstSitting.length >= 2) {
      setFirstIsAvailable(false);
    } else if (arrayFirstSitting.length <= 2) {
      setFirstIsAvailable(true);
    }
    if (arraySecondSitting.length >= 2) {
      setSecondIsAvailable(false);
    } else if (arraySecondSitting.length <= 2) {
      setSecondIsAvailable(true);
    }
  }, [arrayFirstSitting, arraySecondSitting, phase]);

  const completeBooking = () => {
    postBooking({
      date,
      sittingTime: sitting,
      numberOfPeople,
      name: customerInfo.name,
      email: customerInfo.email,
      phone: customerInfo.phone,
    });
    navigate("/thankyou");
  };

  return (
    <Background>
      {isLoading ? (
        <Loader />
      ) : (
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

                    <Label>Number of people</Label>
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
                  {sitting === 1 ? "6.00 pm" : "9.00 pm"}
                  <br />
                  {numberOfPeople} people
                </p>

                <Form onSubmit={completeBooking}>
                  <FlexDiv dir="column">
                    <Label>Name:</Label>
                    <input
                      required
                      onChange={handleChange}
                      type="text"
                      name="name"
                    />
                    <Label>Email:</Label>
                    <input
                      required
                      onChange={handleChange}
                      type="email"
                      name="email"
                    />
                    <Label>Phone number:</Label>
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
      )}
    </Background>
  );
};
