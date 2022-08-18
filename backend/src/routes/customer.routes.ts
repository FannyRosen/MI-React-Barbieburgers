import express, { Router } from "express";
import { get_customerController } from "../controllers/customer.controller";

const router: Router = express.Router();

router.get("/", get_customerController);

export default router;
