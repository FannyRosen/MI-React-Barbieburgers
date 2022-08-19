import express, { Router } from "express";
import {
  get_bookingsController,
  post_newBookingsController,
} from "../controllers/booking.controller";

const router: Router = express.Router();

router.get("/", get_bookingsController);
router.post("/new", post_newBookingsController);
export default router;
