require("dotenv").config;
import mongoose from "mongoose";

let DB = process.env.CONNECTION_STRING;

mongoose
  .connect(DB, {})
  .then(() => {
    console.log("Server running");
  })
  .catch((err) => {
    console.log(err);
  });
