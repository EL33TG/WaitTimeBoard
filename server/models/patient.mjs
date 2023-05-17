import mongoose from "mongoose";
const Schema = mongoose.Schema;

const patient = new Schema({
  physician_id: { type: Schema.Types.ObjectId, ref: 'physician', required: true },
  first_name: { type: "String", required: true },
  last_name:  { type: "String", required: true },
});

export default mongoose.model("patient", patient, "patient");
