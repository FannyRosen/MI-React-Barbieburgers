import express, { Router } from "express";
import {
  get_customerController,
  post_newCustomerController,
  get_customerByIdController,
  delete_customerByIdController,
  put_customerByIdController,
} from "../controllers/customer.controller";

const router: Router = express.Router();

router.get("/", get_customerController);
router.post("/new", post_newCustomerController);
router.get("/:id", get_customerByIdController);
router.post("/delete/:id", delete_customerByIdController);
router.put("/edit/:id", put_customerByIdController);

export default router;
