import { IBooking } from "../models/IBooking";

const SESSIONSTORAGE_KEY_BOOKING = "newBooking";

export const saveBooking = (data: IBooking): void => {
  sessionStorage.setItem(SESSIONSTORAGE_KEY_BOOKING, JSON.stringify(data));
};
