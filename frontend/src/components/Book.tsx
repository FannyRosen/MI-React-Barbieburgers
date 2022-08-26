import { colors } from "./StyledComponents/mixins";
import { FlexDiv, ImageDiv } from "./StyledComponents/Wrappers";
import background from "../assets/background.png";
import { StyledButton } from "./StyledComponents/StyledButton";
import { saveBooking } from "../services/StorageServices";
import { useState } from "react";
import { PageIndicator } from "./partials/PageIndicator";
import { Link } from "react-router-dom";
import { fetchCustomers } from "../services/handleCustomersFetch.service";
import { IBooking } from "../models/IBooking";
import { ICustomer } from "../models/ICustomer";
import { fetchBookings } from "../services/handleBookingsFetch.service";
import { Loader } from "./partials/Loader";

export const Book = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [phase, setPhase] = useState(1);
  const [date, setDate] = useState<Date>(new Date());
  const [numberOfPeople, setNOP] = useState<number>(0);
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  const curr = new Date();
  curr.setDate(curr.getDate());
  const inputDate = curr.toISOString().substring(0, 10);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(e.target.value));
  };

  const handleNOPChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNOP(parseInt(e.target.value));
  };

  const checkDate = () => {
    //saveBooking({ date, numberOfPeople });
    fetchBookings()
      .then(async (response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setPhase(2);
  };

  return (
    <ImageDiv image={background} height='100vh' margin='0 50px 0 50px'>
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
              <form>
                <FlexDiv dir='column' gap='10px'>
                  <label>Choose a date</label>
                  <input
                    onChange={handleDateChange}
                    id='date'
                    type='date'
                    name='date'
                    defaultValue={""}
                    min={inputDate}
                    max={"2023-12-31"}
                  />

                  <label>Number of people</label>
                  <select
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
                  </select>
                  <p>
                    Maximum per table: 6 <br />
                    If you are more than 6 people you will be divided between
                    tables
                  </p>
                  <StyledButton
                    color='black'
                    onClick={() => {
                      if (numberOfPeople != 0) {
                        checkDate();
                      }
                    }}
                  >
                    Check availability
                  </StyledButton>
                </FlexDiv>
              </form>
            </>
          )}
          {phase === 2 && (
            <>
              <p>Här ska vi välja sittning</p>
              <StyledButton
                color='black'
                onClick={() => {
                  setPhase(3);
                }}
              >
                Check availability
              </StyledButton>
            </>
          )}
          {phase === 3 && (
            <>
              <p>Här ska vi ha inputs för customer info </p>
              <Link to='/thankyou'>
                <StyledButton>Book</StyledButton>
              </Link>
            </>
          )}
          <PageIndicator phase={phase} />
        </FlexDiv>
      </FlexDiv>
    </ImageDiv>
  );
};
