const express = require("express");
const app = express();
const mogoose = require("mongoose");
const dotenv = require("dotenv");
const studentsRoute = require("./routes/students");
const internshipRoute = require("./routes/internship");


//uploading files
const multer = require("multer");
const AWS = require('aws-sdk');
// const uuid = require('uuid/dist/v4')

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRETE
})

const storage = multer.memoryStorage({
  destination: function(req,file,callback){
    callback(null,'')
  }
})

const upload = multer({storage}).single('pdf');

app.post('/upload',upload,(req,res)=>{
  console.log(req.file);
  
})

dotenv.config();

try {
  mogoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
    console.log("Connect to MONGODB");
  });
} catch (err) {
  console.log(err);
}
app.use(express.json());
app.use("/api/students",studentsRoute);
app.use("/api/internships",internshipRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend is running!");
});
