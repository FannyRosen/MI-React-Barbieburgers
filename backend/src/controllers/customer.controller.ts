import { Request, Response } from "express";
import { CustomerModel } from "../models/Customer.model";

export const get_customerController = async (req: Request, res: Response) => {
  const customer = await CustomerModel.find();
  console.log("hej");
  try {
    res.status(200).json({
      status: "Sucess",
      data: customer,
    });
  } catch (error) {
    console.log(error);
  }
  console.log(customer);
};
