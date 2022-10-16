const router = require("express").Router();

const Internship = require("../models/Internship");
const Students = require("../models/Students");
const cloudinary = require("../utils/cloudinary");
// const fileUpload = require('express-fileupload')

// add internship data

router.post("/newInternship", async (req, res) => {
  const {
    company_name,
    start_date,
    end_date,
    duration,
    role,
    desc,
    offer_letter,
    student_id,
    student_name,
    student_div,
  } = req.body;
  try {
    const file = offer_letter;
    const studentup = await Students.findOne({ id: student_id });
    const result = await cloudinary.uploader.upload(file, {
      folder: studentup.fullname + student_id + "internship",
    });
    const newINternship = new Internship({
      company_name,
      start_date,
      end_date,
      duration,
      role,
      desc,
      offer_letter: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      student_id,
      student_name,
      student_div,
    });

    const internship = await newINternship.save();
    await Students.findByIdAndUpdate(
      { _id: internship.student_id },
      {
        $push: {
          intership_ids: {
            internship_id: internship.id,
          },
        },
      }
    );

    const student = await Students.findOne({ _id: internship.student_id });
    await student.updateOne({
      $push:{
        intership_ids:{
          internship_id: internship.id
        }
      }
    })
    res.status(200).json(student);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get all internship data

router.get("/getallInternships", async (req, res) => {
  try {
    const internships = await Internship.find();
    res.status(200).json(internships);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get internship by student id

router.get("/getallStudentInternships/:id", async (req, res) => {
  try {
    const internships = await Internship.find({ student_id: req.params.id });
    res.status(200).json(internships);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// update internship of a student by that student

router.put("/updateInternship/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const internship_data = await Internship.findOne({
      _id: id,
    });
    if (internship_data[0].student_id === req.body.student_id) {
      await Internship.findOneAndUpdate(
        {
          _id: id,
          student_id: req.body.student_id,
        },
        { $set: req.body }
      );
      const updated_internship_data = await Internship.findOne({
        _id: id,
        student_id: req.body.student_id,
      });
      res.status(200).json(updated_internship_data);
    } else {
      res.status(404).json("You are not allowed to update the data");
    }
    // res.status(200).json(internship_data[0].student_id === req.body.student_id);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete internship of a student by that student

router.delete("/deleteInternship/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const internship_data = await Internship.findOne({
      _id: id,
    });
    if (internship_data.student_id === req.body.student_id) {
      await Internship.findOneAndDelete({
        _id: id,
        student_id: req.body.student_id,
      });
      res.status(200).json("Internship data has been deleted successfully ");
    } else {
      res.status(404).json("You are not allowed to delete the data");
    }
    // res.status(200).json(internship_data.student_id === req.body.student_id);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
