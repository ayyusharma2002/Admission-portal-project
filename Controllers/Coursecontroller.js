const CourseModal = require('../modals/Course')
const nodemailer = require('nodemailer')

class Coursecontroller {

    static courseinsert = async (req, res) => {
        try {
            const { name, image, _id,email} = req.user
            //console.log(req,body)
            const course = req.body.course
            const data = new CourseModal({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                tenth: req.body.tenth,
                twelth: req.body.twelth,
                course: req.body.course,
                userid: _id
            })
            await data.save()
            this.SendEmail(course,email)
            res.redirect('/coursedisplay')
        } catch (error) {
            console.log(error)
        }
    }
    static display = async (req, res) => {
        try {
            const { image, name, _id } = req.user
            const data = await CourseModal.find({ userid: _id })
            // console.log(data)
            res.render('course/display', { d: data, n: name, i: image })
        } catch (error) {
            console.log(error)
        }

    }
    static view = async (req, res) => {
        try {
            const { image, name, _id } = req.user
            //console.log(req.params.id)
            const data = await CourseModal.findById(req.params.id)
            //console.log(data)
            res.render('course/view', { view: data, n: name, i: image })
        } catch (error) {
            console.log(error)
        }

    }
    static edit = async (req, res) => {
        try {
            const { image, name, _id } = req.user
            //console.log(req.params.id)
            const data = await CourseModal.findById(req.params.id)
            //console.log(data)
            res.render('course/edit', { edit: data, n: name, i: image })
        } catch (error) {
            console.log(error)
        }

    }

    static update = async (req, res) => {
        try {
            //console.log(req.params.id)
            //console.log(req.body)
            const data = await CourseModal.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                tenth: req.body.tenth,
                twelth: req.body.twelth,
                course: req.body.course,
            })
            res.redirect('/coursedisplay')//redirect route path ata hai
        } catch (error) {
            console.log(error)
        }

    }
    static delete = async (req, res) => {
        try {
            //console.log(req.params.id)
            const data = await CourseModal.findByIdAndDelete(req.params.id)
            //console.log(data)
            res.redirect('/coursedisplay')
        } catch (error) {
            console.log(error)
        }

    }
    static SendEmail = async (course, email) => {

        console.log(course)
        console.log(email)

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'ayushisharma1371@gmail.com',
                pass: 'ecjizegpmmkvjjlr'
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"ayushisharma1371@gmail.com" <ayushisharma1371@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `your course register successfully<b>${course}</b>`, // html body
        });


    }

}

module.exports = Coursecontroller