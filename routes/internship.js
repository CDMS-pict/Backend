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
    student_roll,
    student_branch,
    student_year
  } = req.body;
  try {
    const file = offer_letter;
    const studentup = await Students.findOne({ _id: student_id });
    const result = await cloudinary.uploader.upload(file, {
      folder: "internships/" + studentup.fullname + student_id ,
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
      student_roll,
      student_branch,
      student_year
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
      $push: {
        intership_ids: {
          internship_id: internship.id,
        },
      },
    });
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

router.get("/getbydiv",async(req,res)=>{
  try{
    const div = req.body.div;
    const internships = await Internship.find({student_div: div});
    res.status(200).json(internships);
  }
  catch(err){
    console.log(err);
    res.status(500).json("Unable To Fetch");
  }
})
router.get("/getbyyear",async(req,res)=>{
  try{
    const year = req.body.year;
    const internships = await Internship.find({student_year: year});
    res.status(200).json(internships);
  }
  catch(err){
    console.log(err);
    res.status(500).json("Unable To Fetch");
  }
})


// get internships by name
router.get("/getbyname",async(req,res)=>{
  try{
    const studentName = req.body.fullname;
    const internships = await Internship.find({student_name: studentName});
    res.status(200).json(internships);
  }
  catch(err){
    console.log(err);
    res.status(500).json("Somenthing Went's Wrong");
  }
})


// get by branch
router.get("/getbybranch",async(req,res)=>{
  try{
    const branch = req.body.branch;
    const internships = await Internship.find({student_branch: branch});
    res.status(200).json(internships);
  }
  catch(err){
    console.log(err);
    res.status(500).json("Somenthing Went's Wrong");
  }
})


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
router.put("/updateInternshipInfo/:id",async(req,res)=>{
  try{
    const id = req.params.id;
    await Internship.findByIdAndUpdate({
      _id: id,
    },
    { $set: req.body }
    );
res.status(200).json("Updated Successfully");
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
})

router.put("/updateInternship/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const internship_data = await Internship.findOne({
      _id: id,
    });

    const sid = req.body.student_id;
    const { letter_of_complition } = req.body;
    const file = letter_of_complition;
    const studentup = await Students.findOne({ _id: sid });
    const result = await cloudinary.uploader.upload(file, {
      folder: "internships/" + studentup.rollno+"_"+studentup.fullname
    });
    const data = {
      letter_of_complition: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    };

    console.log(data);
    if (internship_data.student_id === sid) {
      const intern = await Internship.findOneAndUpdate(
        {
          _id: id,
        },
        { $set: data }
      );

      // await intern.update({ data });
      const updated_internship_data = await Internship.findOne({
        _id: id,
      });
      console.log(intern);
      res.status(200).json(updated_internship_data);
    } else {
      res.status(404).json("You are not allowed to update the data");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});




// delete internship of a student by that student

router.delete("/deleteInternship/:stid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const internship_data = await Internship.findOne({
      _id: id,
    });
    const sti= req.params.stid;
    if (internship_data.student_id === sti) {
      await internship_data.deleteOne();
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
