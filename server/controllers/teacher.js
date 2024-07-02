import Teacher from "../models/teacher.js";
import users from "../models/auth.js";

import bcrypt from "bcryptjs";

// add teacher
export const addTeacher = async (req, res) => {
  const { name, email, password, department, subject, subjectCode } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const newTeacher = await Teacher.create({
      name,
      email,
      password: hashedPassword,
      department,
      subject,
      subjectCode,
    });

    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
      role: "Teacher",
      department,
      subject,
      subjectCode,
    });

    res.status(200).json({
      message: "Teacher added successfully",
      newTeacher,
      success: true,
    });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong", message: error });
  }
};

// get all teachers
export const getAllteachers = async (req, res) => {
  try {
    const allTeachers = await Teacher.find();

    res.status(200).json(allTeachers);
  } catch (error) {
    res.status(200).json({ message: error });
  }
};

//get single teacher
export const getSingleTeacherDetails = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res
        .status(404)
        .json({ message: `Teacher with ID ${req.params.id} does not exists` });
    }

    res.status(200).json(teacher);
  } catch (error) {
    res.status(200).json({ message: error });
  }
};

//update teacher
export const updateTeacher = async (req, res) => {
  try {
    let teacherToBeUpdate = await Teacher.findById(req.params.id);

    if (!teacherToBeUpdate) {
      return res
        .status(404)
        .json({ message: `Teacher with ID ${req.params.id} does not exists` });
    }

    teacherToBeUpdate = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true, useFindAndModify: false }
    );

    res.status(200).json({
      message: "Teacher Updated Successfully",
      teacherToBeUpdate,
      success: true,
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

//delete teacher
export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);

    const deleteTeacherUser = await users.findOneAndDelete({
      email: teacher.email,
    });

    if (!teacher) {
      return res
        .status(404)
        .json({ message: `Teacher with ID ${req.params.id} does not exists` });
    }

    res.status(200).json({
      message: "Teacher and associated User Deleted Successfully",
      success: true,
      teacher,
      user: deleteTeacherUser,
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
