const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
    studentname :{
        type:String,
        lowercase:true,
        required :true
    },
    aadharuid:{
        type:Number,
        required:true,
        min:100000000000,
        max:999999999999,
        unique:true
    },
    status:{
        type:String,
        required:true,
        lowercase:true,
        enum:['active','inactive']
    },
    dob:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    class:{
        type:Number,
        required:true,
        min:1,
        max:12
    },
    gender:{
        type:String,
        required:true,
        lowercase:true,
        enum:['male','female']
    },
    religion:{
        type:String,
        required:true,
        lowercase:true,
        enum:['hindu','muslim','christian','sikh','buddhism']
    },
    caste:{
        type:String,
        required:true,
        lowercase:true,
        enum:["gen", "obc", "sc", "st"]
    },
    session:{
        type:Number,
        required:true
    },
    familyincome:{
        type:Number,
        required:true,
        min:36000
    },
    pwd:{
        type:String,
        required:true,
        lowercase:true,
        enum:['yes','no']
    },
    schoolid:{
        type:Number,
        required:true
    }
})

const student = mongoose.model('student', studentSchema)

module.exports = student