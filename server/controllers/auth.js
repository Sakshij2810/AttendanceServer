import users from "../models/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//signup controller
export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  const { year, batch, contactNo, department, subject, subjectCode } = req.body;

  try {
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(404).json({ message: "User already Exist." }); // Add return statement here
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    if (role === "Student") {
      const studentNewUser = await users.create({
        name,
        email,
        password: hashedPassword,
        role,
        year,
        batch,
        contactNo,
      });

      const token = jwt.sign(
        { email: studentNewUser.email, id: studentNewUser._id },
        "test",
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({ result: studentNewUser, token }); // Add return statement here
    } else if (role === "Teacher") {
      const teacherNewUser = await users.create({
        name,
        email,
        password: hashedPassword,
        role,
        department,
        subject,
        subjectCode,
      });

      const token = jwt.sign(
        { email: teacherNewUser.email, id: teacherNewUser._id },
        "test",
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({ result: teacherNewUser, token });
    } else {
      const newUser = await users.create({
        name,
        email,
        password: hashedPassword,
        role,
      });

      const token = jwt.sign(
        { email: newUser.email, id: newUser._id },
        "test",
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({ result: newUser, token }); // Add return statement here
    }
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
};

//login controller
export const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const existingUser = await users.findOne({ email, role });

    if (!existingUser) {
      return res.status(404).json({ message: "User don't Exist." }); // Add return statement here
    }

    const isPasswordCrt = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid Credentials" }); // Add return statement here
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      result: existingUser,
      token,
      message: "Logged In successfully!",
    }); // Add return statement here
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
};
