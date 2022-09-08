import { colors } from "../components/StyledComponents/mixins";
import { FlexDiv } from "../components/StyledComponents/Wrappers";
import { StyledButton } from "../components/StyledComponents/StyledButton";
import { FormEvent, useState } from "react";
import { PageIndicator } from "../components/partials/PageIndicator";
import { useNavigate } from "react-router-dom";
import { IFormCustomer } from "../models/ICustomer";
import { postBooking } from "../services/handleBookingsFetch.service";
import { Loader } from "../components/partials/Loader";
import {
  StyledLabel,
  StyledP,
  StyledSelect,
} from "../components/StyledComponents/TextElements";
import { Form, Input, Label } from "../components/StyledComponents/Form";
import { Background } from "../components/StyledComponents/Background";
import { MyModal } from "../components/partials/Modal";
import { MyCalendar } from "../components/partials/Calendar";
import { checkAvailableSittings, ISittings } from "../services/utils";
/* import { useForm } from "react-hook-form";
 */
export const Book = () => {
  const [phase, setPhase] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [numberOfPeople, setNOP] = useState<number>(0);
  const [customerInfo, setCustomerInfo] = useState<IFormCustomer>({
    name: "",
    email: "",
    phone: "",
  });
  const [isAvailable, setIsAvailable] = useState<ISittings>();
  const [sitting, setSitting] = useState(0);
  const [error, setError] = useState("none");

  const navigate = useNavigate();
  /*   const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(); */

  const checkDate = async () => {
    if (numberOfPeople !== 0) {
      setIsLoading(true);
      const isAvailableinDB = await checkAvailableSittings(
        new Date(date),
        numberOfPeople
      );
      setIsAvailable(isAvailableinDB);
      setIsLoading(false);
      setPhase(2);
    } else {
      setError("block");
    }
  };

  const handleDateChange = async (e: Date) => {
    setDate(e);
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
    setIsLoading(true);
    postBooking(booking)
      .then((data) => {
        booking.id = data.data._id!;
        setIsLoading(false);
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
                  onSubmit={(e: FormEvent) => {
                    checkDate();
                    e.preventDefault();
                  }}
                >
                  <FlexDiv dir="column" gap="10px">
                    <StyledLabel>Choose a date</StyledLabel>
                    <MyCalendar handleDate={handleDateChange} />

                    <Label>Number of people</Label>

                    <StyledSelect
                      required
                      name="numberOfPeople"
                      onChange={handleNOPChange}
                      defaultValue="0"
                      className="nop"
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
                    </StyledSelect>

                    <FlexDiv width="200px" tabletwidth="400px" margin="0 30px">
                      <StyledP fontsize="15px">
                        Maximum per table: 6 <br />
                        If you are more than 6 people you will be divided
                        between tables
                      </StyledP>
                    </FlexDiv>
                    <Input
                      type="submit"
                      value={"Check availability"}
                      className="checkavailability"
                    />
                  </FlexDiv>
                </Form>
              </>
            )}
            {phase === 2 && (
              <>
                <h2 className="h2">Available sittings</h2>
                <FlexDiv dir="column" margin="0 0 20px 0">
                  <StyledP fontsize="15px">
                    Your booking: <br />
                    {date.toLocaleDateString()} <br />
                    {numberOfPeople} people
                  </StyledP>
                </FlexDiv>
                <FlexDiv gap="10px" dir="column">
                  {isAvailable?.firstSitting ? (
                    <StyledButton
                      className="sitting1"
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
                  {isAvailable?.secondSitting ? (
                    <StyledButton
                      className="sitting2"
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
                <FlexDiv dir="column" margin="0 0 30px 0">
                  <StyledP fontsize="15px">
                    Your booking: <br />
                    {date.toLocaleDateString()} <br />
                    {sitting === 1 ? "6.00 pm" : "9.00 pm"}
                    <br />
                    {numberOfPeople} people
                  </StyledP>
                </FlexDiv>

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

                    <MyModal></MyModal>

                    <Input type="submit" value={"book"} />
                  </FlexDiv>
                </Form>
              </>
            )}
            <FlexDiv dir="column" margin="40px 0 0 0 ">
              <PageIndicator phase={phase} />
              {phase == 1 ? (
                <></>
              ) : (
                <StyledButton width="90px" onClick={() => setPhase(1)}>
                  Start over
                </StyledButton>
              )}
            </FlexDiv>
          </FlexDiv>
        </FlexDiv>
      )}
    </Background>
  );
};
