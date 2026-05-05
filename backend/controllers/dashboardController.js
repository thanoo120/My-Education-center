const db =require('../models/db');
const Student = require('../models/student');
const Tutor   = require('../models/tutor');
const Payment = require('../models/payment');

exports.getSummary = async (req, res) => {
  try {
    const [students] = await Student.getAllStudents();  
    const [tutors]   = await Tutor.getAllTutors(); 

    const result     = await Payment.getMonthlyTotals();
    const pay        = Array.isArray(result) ? result[0]?.[0] : result;

    res.json({
      students : students.length,
      tutors   : tutors.length,
      payments : pay?.total || 0
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
