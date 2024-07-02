import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  year: { type: String },
  batch: { type: String },
  contactNo: { type: String },
  department: { type: String },
  subject: { type: String },
  subjectCode: { type: String },

  joinedOn: { type: Date, default: Date.now },
});

export default mongoose.model("User", UserSchema);
