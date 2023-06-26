const mongoose = require('mongoose')

//define schema
const Courseschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    tenth: {
        type: String,
        required: true
    },
    twelth: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default:'Pending'
    },
    comment: {
        type: String,
    }
}, { timestamps: true })
//create collection
const CourseModal = mongoose.model('course', Courseschema)
module.exports = CourseModal