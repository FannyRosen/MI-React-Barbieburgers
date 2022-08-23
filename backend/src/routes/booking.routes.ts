import express, { Router } from "express";
import {
  get_bookingsController,
  post_newBookingsController,
  get_bookingByIdController,
  delete_bookingByIdController,
  put_bookingByIdController,
} from "../controllers/booking.controller";

const router: Router = express.Router();

router.get("/", get_bookingsController);
router.post("/new", post_newBookingsController);
router.get("/:id", get_bookingByIdController);
router.delete("/delete/:id", delete_bookingByIdController);
router.put("/edit/:id", put_bookingByIdController);
export default router;
