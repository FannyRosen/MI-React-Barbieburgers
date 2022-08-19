import { Request, Response } from "express";
import { CustomerModel } from "../models/Customer.model";

const statusSuccess = "Success";
const statusFailed = "Failed";

export const get_customerController = async (req: Request, res: Response) => {
  const customer = await CustomerModel.find();

  try {
    res.status(200).json({
      status: statusSuccess,
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      status: statusFailed,
      message: error,
    });
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
    await postNewCustomer.save();
    /* res.status(200).json({
      status: statusSuccess,
      message: "working",
      data: saveCustomerToDB,
    }); */
  } catch (error: any) {
    /*   res.status(500).json({
      status: statusFailed,
      message: error,
    }); */
  }
};
