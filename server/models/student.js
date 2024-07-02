import mongoose from "mongoose";

const StudentSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  year: { type: String, required: true },
  batch: { type: String, required: true },
  contactNo: { type: String },
  joinedOn: { type: Date, default: Date.now },
});

export default mongoose.model("Student", StudentSchema);
