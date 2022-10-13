var mongoose = require("mongoose");

var StudentSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
      required: true,
    },
    collegeId: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    branch: {
      type: String,
    },
    div: {
      type: String,
    },
    rollno: {
      type: Number,
    },
    sem1Sgpa: {
      type: Number,
    },
    sem2Sgpa: {
      type: Number,
    },
    sem3Sgpa: {
      type: Number,
    },
    sem4Sgpa: {
      type: Number,
    },
    sem5Sgpa: {
      type: Number,
    },
    sem6Sgpa: {
      type: Number,
    },
    sem7Sgpa: {
      type: Number,
    },
    sem8Sgpa: {
      type: Number,
    },
    permenant_Address: {
      type: String,
    },
    temporary_address: {
      type: String,
    },
    parent_Details: {
      type: Array,
      default: [],
    },
    amcat:{
      type:Array,
      default:[],

    },
    DOB:{
      type: Date
    },
    mobile_no:{
      type: Number
    },
    gender:{
      type: String
    },
    category:{
      type: String
    },
    college_name:{
      type:String
    },
    pan:{
      type:String
    }
    ,
    intership_ids:{
      type:Array,
      default: []
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Students", StudentSchema);
