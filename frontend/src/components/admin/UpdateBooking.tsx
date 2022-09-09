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
  const [isAvailable, setIsAvailable] = useState<ISittings>({
    firstSitting: true,
    secondSitting: true,
  });
  const [isLoading, setIsLoading] = useState(true);

  let params = useParams();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  //Hämtar bokning
  useEffect(() => {
    const getBooking = async () => {
      await fetchBookingByID(params.id!).then((booking) => {
        setExistingBooking(booking.data);
      });
    };
    getBooking();
  }, []);

  // sätter defaultvärde i formuläret enligt existerande bokning
  useEffect(() => {
    if (
      existingBooking.numberOfPeople !== 0 &&
      existingBooking.sittingTime !== 0
    ) {
      reset([
        { date: new Date(existingBooking.date) },
        { sittingTime: existingBooking.sittingTime },
        { numberOfPeple: existingBooking.numberOfPeople },
      ]);
      setIsLoading(false);
    }
  }, [existingBooking]);

  // Sparar ny bokning med eventuella ändringar
  const onSubmit = (data: any) => {
    setIsLoading(true);
    let isTheSame = false;
    const checkAvailable = async () => {
      if (existingBooking.date === data.date && existingBooking.sittingTime) {
        isTheSame = true;
        console.log("true");
      }

      const isAvailableinDB = await checkAvailableSittings(
        isTheSame,
        data.date as Date,
        data.numberOfPeople as number
      );
      console.log(isAvailableinDB);

      if (
        (data.sittingTime === "1" && isAvailableinDB.firstSitting === true) ||
        (data.sittingTime === "2" && isAvailableinDB.secondSitting === true)
      ) {
        console.log("här är vi");

        let newBooking: IBooking = {
          date: data.date,
          sittingTime: data.sittingTime,
          numberOfPeople: data.numberOfPeople,
        };
        editBooking(params.id!, newBooking).then(() => {
          props.onClick();
        });
      } else {
        setIsAvailable(isAvailableinDB);
        setIsLoading(false);
      }
    };
    checkAvailable();
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)} className="bookingform">
          <FlexDiv dir="column" gap="10px">
            <StyledLabel>Choose a date</StyledLabel>
            <FlexDiv width="300px" tabletwidth="500px">
              <Controller
                control={control}
                name="date"
                render={({ field: { onChange } }) => (
                  <Calendar
                    onChange={onChange}
                    maxDate={new Date("2023-12-31")}
                    defaultValue={new Date(existingBooking.date)}
                  />
                )}
              />
            </FlexDiv>

            {errors.date && (
              <StyledP fontsize="24px" color="red">
                Pick a date &#11105;
              </StyledP>
            )}

            <Label>Number of people</Label>
            <StyledSelect
              className="nop"
              {...register("numberOfPeople", {
                min: 1,
                max: 12,
              })}
              defaultValue={existingBooking.numberOfPeople}
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
              <StyledP fontsize="24px" color="red">
                Pick number of people &#11105;
              </StyledP>
            )}
            <Label>Sitting time:</Label>
            <StyledSelect
              className="updateSitting"
              {...register("sittingTime")}
              defaultValue={existingBooking.sittingTime}
            >
              <option value={1}>6.00 pm</option>
              <option value={2}>9.00 pm</option>
            </StyledSelect>
            {errors.sittingTime && (
              <StyledP color="red" fontsize="24px">
                Choose a sitting time &#11105;
              </StyledP>
            )}

            <Input
              type="submit"
              value={"Update booking"}
              className="updateBooking"
            />
            {isAvailable?.firstSitting ? (
              <></>
            ) : (
              <StyledP>The time you have chosen is not available</StyledP>
            )}
            {isAvailable?.secondSitting ? (
              <></>
            ) : (
              <StyledP>The time you have chosen is not available</StyledP>
            )}
          </FlexDiv>
        </Form>
      )}
    </>
  );
};
