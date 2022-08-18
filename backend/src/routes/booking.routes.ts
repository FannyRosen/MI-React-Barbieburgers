import express, { Router } from "express";
import { get_bookingsController } from "../controllers/booking.controller";

const router: Router = express.Router();

router.get("/bookings", get_bookingsController);

export default router;
