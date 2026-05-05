const express = require("express");
const router = express.Router();
const parentController = require("../controllers/parentController");

router.post("/student-profile", parentController.getStudentProfile);

module.exports = router;
