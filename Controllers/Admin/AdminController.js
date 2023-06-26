const CourseModal = require('../../modals/Course')
const nodemailer = require('nodemailer')

class AdminController {
    static display = async (req, res) => {
        try {
            const { name, image, _id } = req.user
            const data = await CourseModal.find()
            res.render('admin/display', { d: data, n: name, i: image })

        } catch (error) {
            console.log(error)

        }
    }


    static courseview = async (req, res) => {
        try {
            const { name, image, _id } = req.user
            const data = await CourseModal.findById(req.params.id)
            res.render('admin/view', { d: data, n: name, i: image })

        } catch (error) {
            console.log(error)

        }
    }

    static coursedelete = async (req, res) => {
        try {
            const { name, image, _id } = req.user
            const data = await CourseModal.findByIdAndDelete(req.params.id)
            res.render('/admin/display')

        } catch (error) {
            console.log(error)

        }
    }

    static updatestatus = async (req, res) => {
        try {
            const { name, image, _id } = req.user
            const {course,email,comment,status}= req.body
            const data = await CourseModal.findByIdAndUpdate(req.params.id, {
                comment: req.body.comment,
                status: req.body.status
            })
            this.SendEmail(comment,status,course,name,email)
            req.flash('success', ' status update successfully')
            res.render('/admin/display')

        } catch (error) {
            console.log(error)

        }
    }

    static SendEmail = async (comment, status, course, name, email) => {

        console.log(comment,status,course,name,email)
        //console.log(email)
        // 1RHfz85p4XfEue4Juv
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
            html: `${name} your ${course} course  ${status} successfully, <br><b>${comment}</b>`, // html body
        });


    }
}

module.exports = AdminController