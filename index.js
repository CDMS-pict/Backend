const express = require("express");
const app = express();
const mogoose = require("mongoose");
const dotenv = require("dotenv");
const studentsRoute = require("./routes/students");
const internshipRoute = require("./routes/internship");
const fileUpload = require('express-fileupload')


//uploading files
const multer = require("multer");


dotenv.config();

try {
  mogoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
    console.log("Connect to MONGODB");
  });
} catch (err) {
  console.log(err);
}
app.use(fileUpload({
  useTempFiles: true
}))
app.use(express.json());
app.use("/api/students",studentsRoute);
app.use("/api/internships",internshipRoute);


app.listen(process.env.PORT || 5000, () => {
  console.log("Backend is running!");
});
