import mongoose from "mongoose";
const Schema = mongoose.Schema;

const clinic = new Schema({
  physician_id: { type: Schema.Types.ObjectId, ref: 'physician', required: true },
  nurse_id:     { type: Schema.Types.ObjectId, ref: 'nurse', required: true },
  waittime:     { type: Number, required: true },
});

export default mongoose.model("clinic", clinic, "clinic");
