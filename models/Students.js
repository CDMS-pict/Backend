var mongoose = require("mongoose");

var StudentSchema = new mongoose.Schema(
  {
    profile: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
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
      default: "",
    },
    div: {
      type: String,
      default: "",
    },
    rollno: {
      type: Number,
      default: "",
    },
    sem1Sgpa: {
      type: Number,
      default: 0,
    },
    sem1Marksheet: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    sem2Sgpa: {
      type: Number,
      default: 0,
    },
    sem2Marksheet: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    sem3Sgpa: {
      type: Number,
      default: 0,
    },
    sem3Marksheet: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    sem4Sgpa: {
      type: Number,
      default: 0,
    },
    sem4Marksheet: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    sem5Sgpa: {
      type: Number,
      default: 0,
    },
    sem5Marksheet: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    sem6Sgpa: {
      type: Number,
      default: 0,
    },
    sem6Marksheet: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    sem7Sgpa: {
      type: Number,
      default: 0,
    },
    sem7Marksheet: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    sem8Sgpa: {
      type: Number,
      default: 0,
    },
    sem8Marksheet: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    permenant_Address: {
      type: String,
      default: "",
    },
    temporary_address: {
      type: String,
      default: "",
    },
    parent_Details: {
      type: Array,
      default: [],
    },
    amcat: {
      type: Array,
      default: [],
    },
    mail: {
      type: String,
      default: "",
    },
    DOB: {
      type: Date,
      default: "",
    },
    blood_grp: {
      type: String,
      default: "",
    },
    mobile_no: {
      type: Number,
      default: 0,
    },
    gender: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
    pan: {
      type: String,
      default: "",
    },
    aadhar: {
      type: String,
      default: "",
    },
    PWD: {
      type: String,
      default: "",
    },
    intership_ids: {
      type: Array,
      default: [],
    },

    father_name: {
      type: String,
      default: "",
    },
    father_occupation: {
      type: String,
      default: "",
    },
    father_contact: {
      type: String,
      default: "",
    },
    father_mail: {
      type: String,
      default: "",
    },

    mother_name: {
      type: String,
      default: "",
    },
    mother_occupation: {
      type: String,
      default: "",
    },
    mother_contact: {
      type: String,
      default: "",
    },
    mother_mail: {
      type: String,
      default: "",
    },

    tenth_marksheet: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    twelth_marksheet: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    tenth_p_c: {
      type: String,
      default: "",
    },
    twelth_p_c: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Students", StudentSchema);
