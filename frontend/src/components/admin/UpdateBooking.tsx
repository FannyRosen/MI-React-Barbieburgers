import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bookingsDefaultValue, IBooking } from "../../models/IBooking";
import {
  editBooking,
  fetchBookingByID,
} from "../../services/handleBookingsFetch.service";
import { checkAvailableSittings, ISittings } from "../../services/utils";
import { Form, Input, Label } from "../StyledComponents/Form";
import {
  StyledLabel,
  StyledP,
  StyledSelect,
} from "../StyledComponents/TextElements";
import { FlexDiv } from "../StyledComponents/Wrappers";
import { Controller, useForm } from "react-hook-form";
import Calendar from "react-calendar";

interface IProps {
  onClick(): void;
}

export const UpdateBooking = (props: IProps) => {
  const [existingBooking, setExistingBooking] =
    useState<IBooking>(bookingsDefaultValue);
  const [isLoading, setIsLoading] = useState(true);

  let params = useParams();

  //Hämtar bokning
  useEffect(() => {
    const getBooking = async () => {
      await fetchBookingByID(params.id!).then((booking) => {
        setExistingBooking(booking.data);
      });
    };
    getBooking();
    setIsLoading(false);
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: existingBooking.date,
      numberOfPeople: existingBooking.numberOfPeople,
      sittingTime: existingBooking.sittingTime,
    },
  });

  // Sparar ny bokning med eventuella ändringar
  const onSubmit = (data: any) => {
    setIsLoading(true);
    const checkAvailable = async () => {
      const isAvailableinDB = await checkAvailableSittings(
        data.date,
        data.numberOfPeople
      );
      if (
        (data.sittingTime === "1" && isAvailableinDB.firstSitting === true) ||
        (data.sittingTime === "2" && isAvailableinDB.secondSitting === true)
      ) {
        editBooking(params.id!, data).then(() => {
          props.onClick();
          setIsLoading(false);
        });
      } else {
        console.log("tiden va inte ledig");
      }
    };
    checkAvailable();
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FlexDiv dir='column' gap='10px'>
            <StyledLabel>Choose a date</StyledLabel>
            <Controller
              control={control}
              name='date'
              render={({ field: { onChange, ref } }) => (
                <Calendar
                  onChange={onChange}
                  maxDate={new Date("2023-12-31")}
                  defaultValue={new Date(existingBooking.date)}
                />
              )}
            />

            {errors.date && (
              <StyledP fontsize='24px' color='red'>
                Pick a date &#11105;
              </StyledP>
            )}

            <Label>Number of people</Label>
            <StyledSelect
              defaultValue={existingBooking.numberOfPeople}
              {...register("numberOfPeople", {
                required: true,
                min: 1,
                max: 12,
              })}
            >
              <option disabled value={0}>
                0
              </option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
            </StyledSelect>
            {errors.numberOfPeople && (
              <StyledP fontsize='24px' color='red'>
                Pick number of people &#11105;
              </StyledP>
            )}
            <Label>Sitting time:</Label>
            <StyledSelect
              {...register("sittingTime", { required: true })}
              defaultValue={existingBooking.sittingTime}
            >
              <option value={1}>6.00 pm</option>
              <option value={2}>9.00 pm</option>
            </StyledSelect>
            {errors.sittingTime && (
              <StyledP color='red' fontsize='24px'>
                Choose a sitting time &#11105;
              </StyledP>
            )}

            <Input type='submit' value={"Update booking"} />
          </FlexDiv>
        </Form>
      )}
    </>
  );
};
