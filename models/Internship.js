var mongoose = require("mongoose");

var InternshipSchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: true,
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    duration: {
      type: String,
    },
    role: {
      type: String,
    },
    desc: {
      type: String,
    },
    student_id: {
      type: String,
      required: true,
    },
    offer_letter: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    letter_of_complition: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },

    student_name: {
      type: String,
      required: true,
    },
    student_div: {
      type: String,
      required: true,
    },
    student_branch:{
      type:String,
      required: true
    },
    student_year:{
      type:String,
      required: true
    },
    student_roll: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Internships_Data", InternshipSchema);
