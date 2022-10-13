const router = require("express").Router();
const Students = require("../models/Students");
const bcrypt = require("bcrypt");
// const

router.post("/signup", async (req, res) => {
  try {
    const { fullname, collegeId, password, rollno, div, branch } = req.body;
    const emailRegex = /@ms.pict.edu/;
    if (!emailRegex.test(collegeId)) throw "CollgeId is not valid";
    if (password.length < 6) throw "Password must be of atleast 6 characters";

    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(password, salt);
    const newStudent = new Students({
      fullname,
      collegeId,
      password: hashedpass,
      rollno,
      div,
      branch,
    });
    const student = await newStudent.save();
    res.status(200).json(student);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/student/profile/update", async (req, res) => {
  try {
    const student = await Students.findOne({ collegeId: req.body.collegeId });
    await student.updateOne({ $set: req.body });
    const updatedstudent = await Students.findOne({
      collegeId: req.body.collegeId,
    });
    console.log("Profile has been updated successfully");
    res.status(200).json(updatedstudent);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/student/profile/updateAmcat", async (req, res) => {
  try {
    const student = await Students.findOne({ collegeId: req.body.collegeId });
    await student.updateOne({
      $push: {
        amcat: {
          url: req.body.url,
          attempt: req.body.attempt,
        },
      },
    });
    const updatedstudent = await Students.findOne({
      collegeId: req.body.collegeId,
    });
    res.status(200).json(updatedstudent);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get all students

router.get("/getallStudents", async (req, res) => {
  try {
    const students_data = await Students.find();
    res.status(200).json(students_data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
