import mongoose from "mongoose";

const TeacherSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  department: { type: String, required: true },
  subject: { type: String, required: true },
  subjectCode: { type: String, required: true },
  joinedOn: { type: Date, default: Date.now },
});

export default mongoose.model("Teacher", TeacherSchema);
