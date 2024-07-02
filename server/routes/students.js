import express from "express";
import {
  addStudent,
  getAllstudents,
  getSingleStudentDetails,
  updateStudent,
  deleteStudent,
} from "../controllers/student.js";

const router = express.Router();

router.post("/add", addStudent);
router.get("/allStudents", getAllstudents);
router.get("/studentDetails/:id", getSingleStudentDetails);
router.put("/update/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
