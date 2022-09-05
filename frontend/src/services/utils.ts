import { fetchBookings } from "./handleBookingsFetch.service";

interface IArrayOfSittings {
  date: Date;
}

export interface ISittings {
  firstSitting: boolean;
  secondSitting: boolean;
}

export const checkAvailableSittings = async (date: Date) => {
  let isAvailable: ISittings = {
    firstSitting: true,
    secondSitting: true,
  };

  let response = await fetchBookings();
  for (let i = 0; i < response.data.length; i++) {
    let dbDate = new Date(response.data[i].date);
    console.log("jap");

    if (dbDate.getTime() == date.getTime()) {
      if (response.data[i].sittingTime == 1) {
        console.log("körs");

        if (i >= 1) {
          console.log("hej 1 false");

          isAvailable.firstSitting = false;
        } else {
          console.log("hej 1 true");
          isAvailable.firstSitting = true;
        }
      }
      if (response.data[i].sittingTime == 2) {
        if (i >= 1) {
          console.log("hej 2 false");
          isAvailable.secondSitting = false;
        } else {
          console.log("hej 2 true");
          isAvailable.secondSitting = true;
        }
      }
    }
  }

  return isAvailable;
};
