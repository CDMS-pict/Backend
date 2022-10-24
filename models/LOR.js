var mongoose = require("mongoose");

var LORSchema = new mongoose.Schema({
    student_mail:{
        type:String,
        required: true
    },
    apply_date:{
        type:Date,
        required: true
    },
    student_name:{
        type:String,
        required: true
    },
    student_roll:{
        type:String,
        required: true
    },
    student_div:{
        type:String,
        required: true
    },
    year_of_passing:{
        type: String,
        required: true
    },
    student_PRN:{
        type:String,
        required: true
    },
    student_contact:{
        type:String,
        required: true
    },
    parent_email:{
        type:String,
        required: true
    }
    ,
    parent_mobile:{
        type:String,
        required: true
    },
    correspondence_Address:{
        type:String
    },
    passport_size_photo:{
        public_id:{
            type:String,
            required: true
        },
        url:{
            type:String,
            required: true
        }
    }
})

module.exports = mongoose.model("LOR",LORSchema);