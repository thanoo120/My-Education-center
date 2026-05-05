const db = require("../models/db");

const getStudentProfile = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Parent email is required" });
    }

    const [rows] = await db.query(
      `SELECT
        p.parent_id,
        p.parent_name,
        p.parent_code,
        p.email AS parent_email,
        p.student_id,
        s.id AS student_id_ref,
        s.name AS student_name,
        s.email AS student_email,
        s.profile_image_url
      FROM parent p
      LEFT JOIN students s ON s.id = p.student_id
      WHERE p.email = ?
      LIMIT 1`,
      [email]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "Parent not found" });
    }

    return res.json(rows[0]);
  } catch (error) {
    console.error("Parent profile fetch error:", error);
    return res.status(500).json({ message: "Failed to fetch student profile" });
  }
};

module.exports = {
  getStudentProfile,
};
