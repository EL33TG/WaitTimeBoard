import mongoose from "mongoose";
const Schema = mongoose.Schema;

const waitingtime = new Schema({
  clinic_id: {type:"String", required:true},
  nurse_id: {type:"String", required:true},
  physician_id: {type:"String", required:true},
  timestamp: {type:"Date", required:true},
  waittime: {type:"Number", required:true},
});

export default mongoose.model("waitingtime", waitingtime, "waitingtime");
