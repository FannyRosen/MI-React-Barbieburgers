import { Request, Response } from "express";
import { CustomerModel } from "../models/Customer.model";

export const get_customerController = async (req: Request, res: Response) => {
  const customer = await CustomerModel.find();

  try {
    res.status(200).json({
      status: "Sucess",
      data: customer,
    });
  } catch (error) {
    console.log(error);
  }
};

export const post_newCustomerController = async (
  req: Request,
  res: Response
) => {
  try {
    let { name, email, phone } = req.body;
    const postNewCustomer = new CustomerModel({
      name: name,
      email: email,
      phone: phone,
    });

    const saveCustomerToDB = await postNewCustomer.save();

    res.status(200).json({
      status: "statusSuccess",
      message: "working",
      data: saveCustomerToDB,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "Failed",
      message: error,
    });
  }
};
