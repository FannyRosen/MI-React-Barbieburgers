require("dotenv").config();
require("./db");

import cors from "cors";
import express from "express";
import helmet from "helmet";
import bookingRoute from "./routes/booking.routes";
import customerRoute from "./routes/customer.routes";

const app = express();
app.use(helmet());
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.disable("x-powered-by");

app.use("/bookings", bookingRoute);
app.use("/customers", customerRoute);

let PORT: string | number = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log("\x1b[33m%s\x1b[0m", `http://localhost:${PORT}/`)
);
