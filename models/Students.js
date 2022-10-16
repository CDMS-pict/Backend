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
    blood_grp:{
      type:String
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
    pan:{
      type:String
    },
    aadhar:{
      type:String
    }
    ,
    PWD:{
      type:String,
    },
    intership_ids:{
      type:Array,
      default: []
    },

    father_name:{
      type:String,
    },
    father_occupation:{
      type:String
    },
    father_contact:{
      type:String
    },
    father_mail:{
      type:String
    },

    mother_name:{
      type:String,
    },
    mother_occupation:{
      type:String
    },
    mother_contact:{
      type:String
    },
    mother_mail:{
      type:String
    },

    tenth_p_c:{
      type:String
    },
    twelth_p_c:{
      type:String
    },
    tenth_p_c_url:{
      type:String
    },
    twelth_p_c_url:{
      type:String
    }

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Students", StudentSchema);
