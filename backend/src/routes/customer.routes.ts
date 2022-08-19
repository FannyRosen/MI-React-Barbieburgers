import express, { Router } from "express";
import {
  get_customerController,
  post_newCustomerController,
} from "../controllers/customer.controller";

const router: Router = express.Router();

router.get("/", get_customerController);
router.post("/new", post_newCustomerController);

export default router;
