import { fetchBookings } from "./handleBookingsFetch.service";

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

    if (dbDate.getTime() == date.getTime()) {
      if (response.data[i].sittingTime == 1) {
        if (i >= 1) {
          isAvailable.firstSitting = false;
        } else {
          isAvailable.firstSitting = true;
        }
      }
      if (response.data[i].sittingTime == 2) {
        if (i >= 1) {
          isAvailable.secondSitting = false;
        } else {
          isAvailable.secondSitting = true;
        }
      }
    }
  }

  return isAvailable;
};
