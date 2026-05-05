const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/db");
const userRepository = require("../repositories/userRepository");
const Students = require("../models/student");
const Tutors = require("../models/tutor");
const Admins = require("../models/adminModel");
const Parents = require("../models/parentModel");
const { getNextId } = require("../services/idGeneratorService");
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userRepository.findUserByEmail(email);
   
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials (user not found)" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials (wrong password)" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "your-secret-key",
      { expiresIn: "1h" }
    );

    res.json({ token, role: user.role, name: user.name });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};

const register = async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();
    const { name, email, password, role, student_id } = req.body;
    // confirmPassword is validated by middleware; do not store it

    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Validate parent's student_id exists if provided
    if (role === "parent" && student_id) {
      const [studentRows] = await db.query("SELECT id FROM students WHERE id = ?", [student_id]);
      if (!studentRows || studentRows.length === 0) {
        return res.status(400).json({ message: "Invalid student ID. Student not found." });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await conn.beginTransaction();

    const newUser = await userRepository.createUser(
      { name, email, password: hashedPassword, role },
      conn
    );

    let roleId = null;
    switch (role) {
      case "student": {
        const student_code = await getNextId("student");
        roleId = student_code;
        await Students.create(
          {
            id: newUser.id,
            name,
            email,
            password: hashedPassword,
            student_code,
          },
          conn
        );
        break;
      }
      case "tutor": {
        const tutor_code = await getNextId("tutor");
        roleId = tutor_code;
        await Tutors.createTutor(
          {
            tutor_id: newUser.id,
            tutor_name: name,
            email,
            password: hashedPassword,
            tutor_code,
          },
          conn
        );
        break;
      }
      case "admin":
        await Admins.createAdmin(
          {
            admin_id: newUser.id,
            admin_name: name,
            email,
            password: hashedPassword,
          },
          conn
        );
        break;
      case "parent": {
        const parent_code = await getNextId("parent");
        roleId = parent_code;
        await Parents.createParent(
          {
            parent_id: newUser.id,
            parent_name: name,
            email,
            password: hashedPassword,
            student_id: student_id || null,
            parent_code,
          },
          conn
        );
        break;
      }
      default:
        await conn.rollback();
        return res.status(400).json({ message: "Invalid role" });
    }

    await conn.commit();
    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      ...(roleId && { roleId }),
    });
  } catch (err) {
    if (conn) await conn.rollback();
    console.error("Registration error:", err);
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Duplicate record (email or ID already exists)." });
    }
    res.status(500).json({ message: "Server error during registration" });
  } finally {
    if (conn) conn.release();
  }
};

module.exports = {
  login,
  register,
};
