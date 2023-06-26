const mongoose=require('mongoose')

//define schema
const Teacherschema=new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    city: {
        type:String,
        required:true
    }
},{timestamps:true})
//create collection
const TeacherModal=mongoose.model('teacher',Teacherschema)
module.exports=TeacherModal