import { useState } from "react";
import { colors } from "../components/StyledComponents/mixins";
import { FlexDiv } from "../components/StyledComponents/Wrappers";
import { StyledButton } from "../components/StyledComponents/StyledButton";
import { PageIndicator } from "../components/PageIndicator";
import { useNavigate } from "react-router-dom";
import { postBooking } from "../services/handleBookingsFetch.service";
import { Loader } from "../components/partials/Loader";
import {
  StyledLabel,
  StyledP,
  StyledSelect,
} from "../components/StyledComponents/TextElements";
import { Form, Input, Label } from "../components/StyledComponents/Form";
import { Background } from "../components/StyledComponents/Background";
import { MyModal } from "../components/Modal";
import { checkAvailableSittings, ISittings } from "../services/utils";
import { Controller, useForm } from "react-hook-form";
import Calendar from "react-calendar";

export const Book = () => {
  const [phase, setPhase] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState<ISittings>();
  const [sitting, setSitting] = useState(0);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const [date, numberOfPeople] = watch(["date", "numberOfPeople"]);

  // Kontrollerar valt datum och sittning i Databasen
  const onFirstSubmit = (data: any) => {
    setIsLoading(true);
    const checkAvailable = async () => {
      const isAvailableinDB = await checkAvailableSittings(
        false,
        data.date,
        data.numberOfPeople
      );
      setIsAvailable(isAvailableinDB);
    };
    checkAvailable();
    setPhase(2);
    setIsLoading(false);
  };

  // Genomför bokning
  const onSecondSubmit = async (data: any) => {
    let booking = {
      date: new Date(date),
      sittingTime: sitting,
      email: data.email,
      numberOfPeople: numberOfPeople,
      name: data.name,
      phone: data.phone,
      id: "",
    };
    setIsLoading(true);
    postBooking(booking)
      .then((resData) => {
        booking.id = resData.data._id!;
        setIsLoading(false);
        navigate("/thankyou", { state: booking });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Background>
      <FlexDiv
        borderRadius='10px'
        background={colors.LightPink}
        width='80%'
        height='min-content'
        dir='column'
      >
        {isLoading ? (
          <FlexDiv height='300px'>
            <Loader />
          </FlexDiv>
        ) : (
          <FlexDiv dir='column' padding='40px'>
            {phase === 1 && (
              <>
                <h2>Book a table</h2>
                <Form onSubmit={handleSubmit(onFirstSubmit)}>
                  <FlexDiv dir='column' gap='10px'>
                    <StyledLabel>Choose a date</StyledLabel>
                    <FlexDiv width='300px' tabletwidth='500px'>
                      <Controller
                        control={control}
                        name='date'
                        rules={{ required: true }}
                        render={({ field: { onChange } }) => (
                          <Calendar
                            onChange={onChange}
                            minDate={new Date()}
                            maxDate={new Date("2023-12-31")}
                          />
                        )}
                      />
                    </FlexDiv>

                    {errors.date && (
                      <StyledP fontsize='18px' color='red'>
                        Pick a date &#11105;
                      </StyledP>
                    )}

                    <Label>Number of people</Label>
                    <StyledSelect
                      {...register("numberOfPeople", {
                        required: true,
                        min: 1,
                        max: 12,
                      })}
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
                    {errors.numberOfPeople && (
                      <StyledP fontsize='18px' color='red'>
                        Pick number of people &#11105;
                      </StyledP>
                    )}
                    <FlexDiv width='200px' tabletwidth='400px' margin='0 30px'>
                      <StyledP fontsize='15px'>
                        Maximum per table: 6 <br />
                        If you are more than 6 people you will be divided
                        between tables
                      </StyledP>
                    </FlexDiv>
                    <Input type='submit' value={"Check availability"} />
                  </FlexDiv>
                </Form>
              </>
            )}
            {phase === 2 && (
              <>
                <h2>Available sittings</h2>
                <FlexDiv dir='column' margin='0 0 20px 0'>
                  <StyledP fontsize='15px'>
                    Your booking: <br />
                    {date.toLocaleDateString()} <br />
                    {numberOfPeople} people
                  </StyledP>
                </FlexDiv>
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
                <FlexDiv dir='column' margin='0 0 30px 0'>
                  <StyledP fontsize='15px'>
                    Your booking: <br />
                    {date.toLocaleDateString()} <br />
                    {sitting === 1 ? "6.00 pm" : "9.00 pm"}
                    <br />
                    {numberOfPeople} people
                  </StyledP>
                </FlexDiv>

                <Form onSubmit={handleSubmit(onSecondSubmit)}>
                  <FlexDiv dir='column'>
                    <Label>Name:</Label>
                    <input
                      {...register("name", {
                        required: true,
                        minLength: 1,
                        maxLength: 40,
                      })}
                      type='text'
                    />{" "}
                    {errors.name && (
                      <StyledP fontsize='18px' color='red'>
                        Submit your name &#11105;
                      </StyledP>
                    )}
                    <Label>Email:</Label>
                    <input
                      {...register("email", {
                        required: true,
                      })}
                      type='email'
                    />
                    {errors.email && (
                      <StyledP fontsize='18px' color='red'>
                        Submit your email &#11105;
                      </StyledP>
                    )}
                    <Label>Phone number:</Label>
                    <input
                      type='number'
                      {...register("phone", {
                        required: true,
                        minLength: 9,
                        maxLength: 12,
                      })}
                    />
                    {errors.phone && (
                      <StyledP fontsize='18px' color='red'>
                        Submit your phone number &#11105;
                      </StyledP>
                    )}
                    <FlexDiv margin='10px'>
                      <Label>
                        <StyledP fontsize='18px'>Accept our&nbsp;</StyledP>
                        <StyledP
                          hover='pointer'
                          decor='underline'
                          fontsize='18px'
                          onClick={() => setOpen(true)}
                        >
                          {" "}
                          GDPR policy
                        </StyledP>
                        <input
                          type='checkbox'
                          {...register("checkbox", {
                            required: true,
                            minLength: 9,
                            maxLength: 12,
                          })}
                        />
                      </Label>
                    </FlexDiv>
                    {errors.checkbox && (
                      <StyledP fontsize='18px' color='red'>
                        Accept the terms to continue &#11105;
                      </StyledP>
                    )}
                    <MyModal
                      open={open}
                      setOpen={() => setOpen(false)}
                    ></MyModal>
                    <Input type='submit' value={"book"} />
                  </FlexDiv>
                </Form>
              </>
            )}
            <FlexDiv dir='column' margin='40px 0 0 0 '>
              <PageIndicator phase={phase} />
              {phase === 1 ? (
                <></>
              ) : (
                <StyledButton width='90px' onClick={() => setPhase(1)}>
                  Start over
                </StyledButton>
              )}
            </FlexDiv>
          </FlexDiv>
        )}
      </FlexDiv>
    </Background>
  );
};
