import express from "express";
import {
  createOneStudentAttendance,
  dailyAttendance,
  fetchAttendanceByDate,
  fetchAttendanceBySubject,
  getAllAttendance,
  getSingleStudentAttendance,
  getStudentSubjectDateAttendance,
  getStudentSubjectwiseAttendance,
} from "../controllers/attendance.js";

const router = express.Router();

router.post("/add", createOneStudentAttendance);
router.get("/allAttendance", getAllAttendance);
router.get("/daily", dailyAttendance);
// router.post("/attendanceByDate", fetchAttendanceByDate);
router.post("/attendanceByDate", fetchAttendanceByDate);

router.get("/attendanceBySubject", fetchAttendanceBySubject);

router.get("/subjectwise/:studentId/:subject", getStudentSubjectwiseAttendance);
router.get(
  "/subjectDatewise/:studentId/:subject/:date",
  getStudentSubjectDateAttendance
);
router.get("/:id", getSingleStudentAttendance);

export default router;
