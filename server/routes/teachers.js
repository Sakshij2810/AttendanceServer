import express from "express";
import {
  addTeacher,
  getAllteachers,
  getSingleTeacherDetails,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacher.js";

const router = express.Router();

router.post("/add", addTeacher);
router.get("/allTeachers", getAllteachers);
router.get("/teacherDetails/:id", getSingleTeacherDetails);
router.put("/update/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

export default router;
