import { Request, Response } from "express";
import { CustomerModel } from "../models/Customer.model";
import { post_newBookingsController } from "./booking.controller";

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

    res.status(200).json({
      status: statusSuccess,
      message: "working",
      data: saveCustomerToDB,
    });
  } catch (error: any) {
    res.status(500).json({
      status: statusFailed,
      message: error,
    });
  }
};

export const get_customerByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const customerById = await CustomerModel.findById(req.params.id);

    res.status(200).json({
      status: "Successful",
      message: "Get customer id works",
      data: customerById,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "Get customer id failed",
      message: error,
    });
  }
};

export const delete_customerByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const deleteById = await CustomerModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "Successful",
      message: "Delete id works",
      data: deleteById,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "Delete id failed",
      message: error,
    });
  }
};

export const put_customerByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const editById = await CustomerModel.findByIdAndUpdate(req.params.id);

    editById.name = req.body.name;
    editById.email = req.body.email;
    editById.phone = req.body.phone;

    res.status(200).json({
      status: "Successful",
      message: "Edit id works",
      data: editById,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "Edit id failed",
      message: error,
    });
  }
};
