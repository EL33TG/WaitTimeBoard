import mongoose from "mongoose";
const Schema = mongoose.Schema;

const physician = new Schema({
  name: { type: "String", required: true },
});

export default mongoose.model("physician", physician, "physician");
