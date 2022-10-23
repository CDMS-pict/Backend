const router = require("express").Router();
const Students = require("../models/Students");
const cloudinary = require("../utils/cloudinary");

// const bcrypt = require("bcrypt");
// const
// const jwt = require("jsonwebtoken");
const express = require("express");
const {
  signup,
  login,
  verifyToken,
  getUser,
  refreshToken,
  logout,
} = require("../controllers/Student_Controller");

// router.post("/signup", async (req, res) => {
//   try {
//     const { fullname, collegeId, password, rollno, div, branch } = req.body;
//     const emailRegex = /@ms.pict.edu/;
//     if (!emailRegex.test(collegeId)) throw "CollgeId is not valid";
//     if (password.length < 6) throw "Password must be of atleast 6 characters";
//     const user = await Students.findOne({ collegeId });
//     if (user) {
//       res.status(200).json("User if Already Exists");
//     }
//     const salt = await bcrypt.genSalt(10);
//     const hashedpass = await bcrypt.hash(password, salt);
//     const newStudent = new Students({
//       fullname,
//       collegeId,
//       password: hashedpass,
//       rollno,
//       div,
//       branch,
//     });
//     const student = await newStudent.save();
//     res.status(200).json(student);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// router.post("/login", async (req, res) => {
//   try {
//     const user = await Students.findOne({ collegeId: req.body.collegeId });
//     !user && res.status(404).send("User not found");
//     const validPassword = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     !validPassword && res.status(400).json("wrongpassword");

//     const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
//       expiresIn: "15hr",
//     });

//     // console.log("Generated Token\n", token);
//     // if (req.cookies[`${user._id}`]) {
//     //   req.cookies[`${user._id}`] = "";
//     // }
//     res.cookie(String(user._id), token, {
//       path: "/",
//       expires: new Date(Date.now() + 1000 * 35),
//       httpOnly: true,
//       sameSite: "lax",
//     });
//     console.log(token);
//     res.status(200).json({ user, token });
//   } catch (err) {
//     // res.status(500).json(err);
//     console.log(err);
//   }
// });

//logout

// router.post("/logout", async (req, res, next) => {
//   const cookies = req.headers.cookie;
//   const prevToken = cookies.split("=")[1];
//   if (!prevToken) {
//     return res.status(400).json({ message: "Couldn't find token" });
//   }
//   jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
//     if (err) {
//       console.log(err);
//       return res.status(403).json({ message: "Authentication failed" });
//     }
//     res.clearCookie(`${user.id}`);
//     req.cookies[`${user.id}`] = "";
//     return res.status(200).json({ message: "Successfully Logged Out" });
//   });
// });
//verify token
// router.get("/astudent", async (req, res) => {
//   const cookies = req.headers.cookie;
//   const token = cookies.split("=")[1];
//   console.log(token);

//   // const headers = req.headers[`authorization`];
//   // const token = headers.split(" ")[1];
//   if (!token) {
//     res.status(404).json({ message: "NO token found" });
//   }
//   jwt.verify(String(token), process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) {
//       res.status(400).json({ message: "Invalid Token" });
//     }
//     console.log(user.id);
//     req.id = user.id;
//   });

//   const userId = req.id;
//   let user;
//   try {
//     user = await Students.findById(userId, "-password");
//   } catch (err) {
//     return new Error(err);
//   }
//   if (!user) {
//     return res.status(404).json({ message: "Student Not found" });
//   }
//   return res.status(200).json({ user });
// });

// refresh token
// router.get("/refreshtoken", async (req, res, next) => {
//   const cookies = req.headers.cookie;
//   const prevtoken = cookies.split("=")[1];
//   if (!prevtoken) {
//     return res.status(400).json({ message: "Could'nt Find Token" });
//   }
//   jwt.verify(
//     (String(prevtoken), process.env.ACCESS_TOKEN_SECRET),
//     (err, user) => {
//       if (err) {
//         console.log(err);
//         return res.status(403).json({ message: "Authentication Failed" });
//       }
//       res.clearCookie(`${user.id}`);
//       req.cookies[`${user.id}`] = "";

//       const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
//         expiresIn: "15hr",
//       });
//       console.log("RE-Generated Token\n", token);
//       res.cookie(String(user.id), token, {
//         path: "/",
//         expires: new Date(Date.now() + 1000 * 30),
//         httpOnly: true,
//         sameSite: "lax",
//       });

//       req.id = user.id;
//     }
//   );

//   verifyToken();
//   getUser();
// });

// router.get("/refresh",)
router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
// router.get("/refresh", refreshToken, verifyToken, getUser);
router.post("/logout", verifyToken, logout);

router.get("/getstudent", async (req, res) => {
  const userId = req.id;
  let user;
  try {
    user = await Students.findById(userId, "-password");
  } catch (err) {
    return new Error(err);
  }
  if (!user) {
    return res.status(404).json({ message: "Student Not found" });
  }
  return res.status(200).json({ user });
});

router.put("/student/profile/update/:id", async (req, res) => {
  try {
    const student = await Students.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    // await student.update({ $set: req.body });
    const updatedstudent = await Students.findOne({
      _id: req.params.id,
    });
    console.log(updatedstudent);
    res.status(200).json(updatedstudent);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/student/profile/update_profile/:id", async (req, res) => {
  try {
    const student = await Students.findById({ _id: req.params.id });
    const { profile } = req.body;
    const file = profile;
    const result = await cloudinary.uploader.upload(file, {
      folder: "students/" + student.rollno + "_" + student.fullname,
    });
    const data = {};
    console.log(data);
    await student.updateOne({
      $set: {
        profile: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      },
    });
    const updatedstudent = await Students.findOne({
      _id: req.params.id,
    });
    res.status(200).json(updatedstudent);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// upload academic details
router.put(
  "/student/profile/academic_update/sem1/:year/:id",
  async (req, res) => {
    try {
      const student = await Students.findById({ _id: req.params.id });
      const year = req.params.year;
      if (year === "FE") {
        const { sem1Marksheet } = req.body;
        const file = sem1Marksheet;
        const result = await cloudinary.uploader.upload(file, {
          folder: "students/" + student.rollno + "_" + student.fullname,
        });
        await student.updateOne({
          $set: {
            sem1Marksheet: {
              public_id: result.public_id,
              url: result.secure_url,
            },
          },
        });
      } else if (year === "SE") {
        const { sem3Marksheet } = req.body;
        const file = sem3Marksheet;
        const result = await cloudinary.uploader.upload(file, {
          folder: "students/" + student.rollno + "_" + student.fullname,
        });
        await student.updateOne({
          $set: {
            sem3Marksheet: {
              public_id: result.public_id,
              url: result.secure_url,
            },
          },
        });
      } else if (year === "TE") {
        const { sem5Marksheet } = req.body;
        const file = sem5Marksheet;
        const result = await cloudinary.uploader.upload(file, {
          folder: "students/" + student.rollno + "_" + student.fullname,
        });
        await student.updateOne({
          $set: {
            sem5Marksheet: {
              public_id: result.public_id,
              url: result.secure_url,
            },
          },
        });
      } else if (year === "BE") {
        const { sem7Marksheet } = req.body;
        const file = sem7Marksheet;
        const result = await cloudinary.uploader.upload(file, {
          folder: "students/" + student.rollno + "_" + student.fullname,
        });
        await student.updateOne({
          $set: {
            sem7Marksheet: {
              public_id: result.public_id,
              url: result.secure_url,
            },
          },
        });
      }

      const updatedstudent = await Students.findOne({
        _id: req.params.id,
      });
      res.status(200).json(updatedstudent);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);


router.put(
  "/student/profile/academic_update/sem2/:year/:id",
  async (req, res) => {
    try {
      const student = await Students.findById({ _id: req.params.id });
      const year = req.params.year;
      if (year === "FE") {
        const { sem2Marksheet } = req.body;
        const file = sem2Marksheet;
        const result = await cloudinary.uploader.upload(file, {
          folder: "students/" + student.rollno + "_" + student.fullname,
        });
        await student.updateOne({
          $set: {
            sem2Marksheet: {
              public_id: result.public_id,
              url: result.secure_url,
            },
          },
        });
      } else if (year === "SE") {
        const { sem4Marksheet } = req.body;
        const file = sem4Marksheet;
        const result = await cloudinary.uploader.upload(file, {
          folder: "students/" + student.rollno + "_" + student.fullname,
        });
        await student.updateOne({
          $set: {
            sem4Marksheet: {
              public_id: result.public_id,
              url: result.secure_url,
            },
          },
        });
      } else if (year === "TE") {
        const { sem6Marksheet } = req.body;
        const file = sem6Marksheet;
        const result = await cloudinary.uploader.upload(file, {
          folder: "students/" + student.rollno + "_" + student.fullname,
        });
        await student.updateOne({
          $set: {
            sem6Marksheet: {
              public_id: result.public_id,
              url: result.secure_url,
            },
          },
        });
      } else if (year === "BE") {
        const { sem8Marksheet } = req.body;
        const file = sem8Marksheet;
        const result = await cloudinary.uploader.upload(file, {
          folder: "students/" + student.rollno + "_" + student.fullname,
        });
        await student.updateOne({
          $set: {
            sem8Marksheet: {
              public_id: result.public_id,
              url: result.secure_url,
            },
          },
        });
      }

      const updatedstudent = await Students.findOne({
        _id: req.params.id,
      });
      res.status(200).json(updatedstudent);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);



router.put("/student/profile/update_t_marks/:id", async (req, res) => {
  try {
    const student = await Students.findById({ _id: req.params.id });
    const { tenth_marksheet } = req.body;
    const file = tenth_marksheet;
    const result = await cloudinary.uploader.upload(file, {
      folder: "students/" + student.rollno + "_" + student.fullname,
    });
    const data = {};
    console.log(data);
    await student.updateOne({
      $set: {
        tenth_marksheet: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      },
    });
    const updatedstudent = await Students.findOne({
      _id: req.params.id,
    });
    res.status(200).json(updatedstudent);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/student/profile/update_tw_marks/:id", async (req, res) => {
  try {
    const student = await Students.findById({ _id: req.params.id });
    const { twelth_marksheet } = req.body;
    const file = twelth_marksheet;
    const result = await cloudinary.uploader.upload(file, {
      folder: "students/" + student.rollno + "_" + student.fullname,
    });
    // const data = {
    //   twelth_marksheet: {
    //     public_id: result.public_id,
    //     url: result.secure_url,
    //   },
    // };
    // console.log(data);
    await student.updateOne({
      $set: {
        twelth_marksheet: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      },
    });
    // await student.update({ $set: req.body });
    const updatedstudent = await Students.findOne({
      _id: req.params.id,
    });
    // console.log(updatedstudent);
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
