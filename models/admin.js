const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
    username :{
        type:String,
        lowercase:true,
        required :true
    },
    password:{
        type:String,
        required:true,
        lowercase:true
    }
})

const admin = mongoose.model('admin', adminSchema)

module.exports = admin