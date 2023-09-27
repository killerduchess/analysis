const mongoose = require('mongoose')
const schoolSchema = new mongoose.Schema({
    schoolname :{
        type:String,
        lowercase:true,
        required :true
    },
    schoolid:{
        type:Number,
        required:true,
        min:100000,
        max:999999,
        unique: true
    },
    password:{
        type:String,
        required:true,
        lowercase:true
    },
    pincode:{
        type:Number,
        required:true,
        min:100000,
        max:999999
    },
    schooltype:{
        type:String,
        required:true,
        lowercase:true,
        enum:['government','private']
    },
    schoolmedium:{
        type:String,
        required:true,
        lowercase:true,
        enum:['english','hindi','gujarati']
    },
    schoolboard:{
        type:String,
        required:true,
        lowercase:true,
        enum:['cbse','icse','stateboard']
    },
    schoolcity:{
        type:String,
        required:true,
        lowercase:true
    }
})

const school = mongoose.model('school', schoolSchema)

module.exports = school