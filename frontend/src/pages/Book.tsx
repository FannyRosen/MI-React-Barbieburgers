import { colors } from "../components/StyledComponents/mixins";
import { FlexDiv } from "../components/StyledComponents/Wrappers";
import { StyledButton } from "../components/StyledComponents/StyledButton";
import { FormEvent, useEffect, useState } from "react";
import { PageIndicator } from "../components/partials/PageIndicator";
import { useNavigate } from "react-router-dom";
import { IFormCustomer } from "../models/ICustomer";
import { postBooking } from "../services/handleBookingsFetch.service";
import { Loader } from "../components/partials/Loader";
import {
  StyledLabel,
  StyledSelect,
} from "../components/StyledComponents/TextElements";
import { Form, Input, Label } from "../components/StyledComponents/Form";
import { Background } from "../components/StyledComponents/Background";
import { MyModal } from "../components/partials/Modal";
import { MyCalendar } from "../components/partials/Calendar";
import { checkAvailableSittings, ISittings } from "../services/utils";

export const Book = () => {
  const [phase, setPhase] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState("");
  const [numberOfPeople, setNOP] = useState<number>(0);
  const [customerInfo, setCustomerInfo] = useState<IFormCustomer>({
    name: "",
    email: "",
    phone: "",
  });
  const [isAvailable, setIsAvailable] = useState<ISittings>();
  const [sitting, setSitting] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const checkDate = async () => {
      const isAvailableinDB = await checkAvailableSittings(new Date(date));
      setIsAvailable(isAvailableinDB);
    };
    checkDate().catch(console.error);
  }, [date]);

  const handleDateChange = async (e: Date) => {
    setDate(e.toLocaleDateString());
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

  const completeBooking = async (e: FormEvent) => {
    e.preventDefault();

    let booking = {
      date: new Date(date),
      sittingTime: sitting,
      email: customerInfo.email,
      numberOfPeople: numberOfPeople,
      name: customerInfo.name,
      phone: customerInfo.phone,
      id: "",
    };

    postBooking(booking)
      .then((data) => {
        booking.id = data.data._id;
        navigate("/thankyou", { state: booking });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Background>
      {isLoading ? (
        <Loader />
      ) : (
        <FlexDiv
          borderRadius='10px'
          background={colors.LightPink}
          width='80%'
          height='min-content'
          dir='column'
        >
          <FlexDiv dir='column' padding='40px'>
            {phase === 1 && (
              <>
                <h2>Book a table</h2>
                <Form
                  onSubmit={() => {
                    if (numberOfPeople != 0) {
                      setPhase(2);
                    } else {
                      console.log("error");
                    }
                  }}
                >
                  <FlexDiv dir='column' gap='10px'>
                    <StyledLabel>Choose a date</StyledLabel>
                    <MyCalendar handleDate={handleDateChange} />

                    <Label>Number of people</Label>
                    <StyledSelect
                      required
                      id='date'
                      name='date'
                      onChange={handleNOPChange}
                      defaultValue='0'
                    >
                      <option disabled value='0'>
                        0
                      </option>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      <option value='5'>5</option>
                      <option value='6'>6</option>
                      <option value='7'>7</option>
                      <option value='8'>8</option>
                      <option value='9'>9</option>
                      <option value='10'>10</option>
                      <option value='11'>11</option>
                      <option value='12'>12</option>
                    </StyledSelect>
                    <p>
                      Maximum per table: 6 <br />
                      If you are more than 6 people you will be divided between
                      tables
                    </p>
                    <Input type='submit' value={"Check availability"} />
                  </FlexDiv>
                </Form>
              </>
            )}
            {phase === 2 && (
              <>
                <h2>Available sittings</h2>
                <FlexDiv gap='10px' dir='column'>
                  {isAvailable?.firstSitting ? (
                    <StyledButton
                      color='white'
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
                  {isAvailable?.secondSitting ? (
                    <StyledButton
                      color='white'
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
                  {date} <br />
                  {sitting === 1 ? "6.00 pm" : "9.00 pm"}
                  <br />
                  {numberOfPeople} people
                </p>

                <Form onSubmit={completeBooking}>
                  <FlexDiv dir='column'>
                    <Label>Name:</Label>
                    <input
                      required
                      onChange={handleChange}
                      type='text'
                      name='name'
                    />
                    <Label>Email:</Label>
                    <input
                      required
                      onChange={handleChange}
                      type='email'
                      name='email'
                    />
                    <Label>Phone number:</Label>
                    <input
                      required
                      onChange={handleChange}
                      type='number'
                      name='phone'
                    />

                    <MyModal></MyModal>

                    <Input type='submit' value={"book"} />
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
