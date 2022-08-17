import express, { Request, Response } from "express";

require("dotenv").config();

const app = express();

app.get("/", (_: Request, res: Response) => {
  res.status(200).send("hi");
});

let PORT: string | number = process.env.PORT_NR || 8000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));
