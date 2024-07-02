import users from "../models/auth.js";

import bcrypt from "bcryptjs";
import Student from "../models/student.js";

// add student
export const addStudent = async (req, res) => {
  const { name, email, password, year, batch, contactNo } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const newStudent = await Student.create({
      name,
      email,
      password: hashedPassword,
      year,
      batch,
      contactNo,
    });

    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
      role: "Student",
      year,
      batch,
      contactNo,
    });

    res.status(200).json({
      message: "Student added successfully",
      newStudent,
      success: true,
    });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong", message: error });
  }
};

// get all students
export const getAllstudents = async (req, res) => {
  try {
    const allStudents = await Student.find();

    res.status(200).json(allStudents);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

//get single student
export const getSingleStudentDetails = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res
        .status(404)
        .json({ message: `Studebt with ID ${req.params.id} does not exists` });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

//update student
export const updateStudent = async (req, res) => {
  try {
    let studentToBeUpdate = await Student.findById(req.params.id);

    if (!studentToBeUpdate) {
      return res
        .status(404)
        .json({ message: `Student with ID ${req.params.id} does not exists` });
    }

    studentToBeUpdate = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true, useFindAndModify: false }
    );

    res.status(200).json({
      message: "Student Updated Successfully",
      studentToBeUpdate,
      success: true,
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

//delete student
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    const deleteStudentUser = await users.findOneAndDelete({
      email: student.email,
    });

    if (!student) {
      return res
        .status(404)
        .json({ message: `Student with ID ${req.params.id} does not exists` });
    }

    res.status(200).json({
      message: "Student and associated user deleted successfully",
      success: true,
      student,
      user: deleteStudentUser,
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
