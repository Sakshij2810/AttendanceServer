import Attendance from "../models/attendance.js";
import dayjs from "dayjs";

//add attendance
export const createOneStudentAttendance = async (req, res) => {
  try {
    const { studentId, status, date, attendanceType, subject } = req.body;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    // Convert the provided date to the start of the day in ISO format
    const attendanceDate = dayjs(date).startOf("day").toISOString();

    // Find any attendance record for the student with the same date
    const existingStudentRecord = await Attendance.findOne({
      student: studentId,
      date: attendanceDate,
      attendanceType: attendanceType,
      subject: subject,
    });

    if (existingStudentRecord) {
      existingStudentRecord.status = status;
      await existingStudentRecord.save();

      return res.status(200).json({
        message: `Attendance record updated for student with ID ${studentId}`,
        existingStudentRecord,
        success: true,
      });
    } else {
      const newStudentAttendanceRecord = new Attendance({
        student: studentId,
        status: status,
        attendanceType: attendanceType,
        date: attendanceDate,
        subject: subject,
      });
      await newStudentAttendanceRecord.save();

      return res.status(200).json({
        message: `Student attendance marked`,
        newStudentAttendanceRecord,
        success: true,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

//get all attendance
export const getAllAttendance = async (req, res) => {
  try {
    const allAttendance = await Attendance.find();
    res.status(200).json(allAttendance);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

//fetch attendance by date
export const fetchAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.body;
    const attendanceDate = dayjs(date).startOf("day").toISOString();

    const attendanceByDate = await Attendance.find({ date: attendanceDate });

    res.status(200).json(attendanceByDate);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

//fetch student by subject
export const fetchAttendanceBySubject = async (req, res) => {
  try {
    const { subject } = req.body;

    const attendanceBySubject = await Attendance.find({ subject: subject });

    res.status(200).json(attendanceBySubject);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

//get single student overall attendance
export const getSingleStudentAttendance = async (req, res) => {
  try {
    const studentId = req.params.id;

    const studentOverallAttendance = await Attendance.find({
      student: studentId,
    });
    res.status(200).json(studentOverallAttendance);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

//get single student subjectwise overall attendance
export const getStudentSubjectwiseAttendance = async (req, res) => {
  try {
    const { studentId, subject } = req.params;

    const studentSubjectwiseAttendance = await Attendance.find({
      student: studentId,
      subject: subject,
    });
    res.status(200).json(studentSubjectwiseAttendance);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

//get single student subjectwise and datewise overall attendance
export const getStudentSubjectDateAttendance = async (req, res) => {
  try {
    const { studentId, subject, date } = req.params;
    const attendanceDate = dayjs(date).startOf("day").toISOString();

    const studentSubjectwiseDateAttendance = await Attendance.find({
      date: attendanceDate,
      student: studentId,
      subject: subject,
    });
    res.status(200).json(studentSubjectwiseDateAttendance);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

//daily attendance for per student
export const dailyAttendance = async (req, res) => {
  try {
    const date = new Date();
    // Convert the provided date to the start of the day in ISO format
    const attendanceDate = dayjs(date).startOf("day").toISOString();
    // console.log(attendanceDate);
    const dailyAttendance = await Attendance.find({ date: attendanceDate });

    res.status(200).json(dailyAttendance);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
