import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import nurseController from "./controllers/nurseController.mjs";
import patientController from "./controllers/patientController.mjs";
import physicianController from "./controllers/physicianController.mjs";
import waitingTimeController from "./controllers/waitingtimeController.mjs";
import clinicController from "./controllers/clinicController.mjs";

dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors());

mongoose.connect(process.env.MDB_CONNECT_STRING, (error) => {
  if (error) {
    console.error("Please make sure Mongodb is installed and running!");
    throw error;
  }
  console.log("Connected to mongoDB");
});

app.use(express.json());
app.use("/", nurseController);
app.use("/", patientController);
app.use("/", physicianController);
app.use("/", waitingTimeController);
app.use("/", clinicController);

app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});
