import express, { Request, Response } from "express";

require("dotenv").config();

const app = express();

app.get("/", (_: Request, res: Response) => {
  res.status(200).send("hi");
});

const message: string = "Hi, the server is running on ";

let PORT: string | number = process.env.PORT_NR || 8000;
app.listen(PORT, () =>
  console.log(message + "\x1b[33m%s\x1b[0m", `http://localhost:${PORT}/`)
);
