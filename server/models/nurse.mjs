import mongoose from "mongoose";
const Schema = mongoose.Schema;

const nurse = new Schema({
  name: { type: "String", required: true },
});

export default mongoose.model("nurse", nurse, "nurse");
