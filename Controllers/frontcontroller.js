const UserModal = require('../modals/User')
const CourseModal = require('../modals/Course')
const bcrypt = require("bcrypt")
const cloudinary = require("cloudinary").v2;
const jwt = require('jsonwebtoken')
cloudinary.config({
    cloud_name: "dgx1ntq5k",
    api_key: "997755939126466",
    api_secret: "7dJL8YaV3mZeHrqFLwqKepGLGkY",
    secure: false,
});
class FrontController {

    static login = async (req, res) => {
        // console.log(req.body)
        try {
            res.render("login", { message: req.flash('error') })
        } catch (error) {
            console.log(error)
        }
    }

    static registration = async (req, res) => {
        try {
            res.render("registration", { message: req.flash('error') })
        } catch (error) {
            console.log(error)
        }
    }

    static dashboard = async (req, res) => {
        try {
            const { name, email, image, _id } = req.user
            const btech = await CourseModal.findOne({ userid: _id, course: 'Btech' })
            const bca = await CourseModal.findOne({ userid: _id, course: 'Bca' })
            const mca = await CourseModal.findOne({ userid: _id, course: 'Mca' })
            res.render("dashboard", { n: name, i: image, e: email, b: btech, bca: bca, mca: mca })
        } catch (error) {
            console.log(error)
        }
    }

    static about = async (req, res) => {
        try {
            const { name, image, _id } = req.user
            res.render("about", { n: name, i: image })
        } catch (error) {
            console.log(error)
        }
    }
    static contact = async (req, res) => {
        try {
            const { name, image, _id } = req.user
            res.render("contact", { n: name, i: image })
        } catch (error) {
            console.log(error)
        }
    }
    static home = async (req, res) => {
        try {
            const { name, image, _id } = req.user
            res.render("dashboard", { n: name, i: image })
        } catch (error) {
            console.log(error)
        }
    }
    // static userinsert = async (req, res) => {
    //     try {
    //         //console.log(req.body)
    //         const result = new UserModal({
    //             name: req.body.name,
    //             email: req.body.email,
    //             password: req.body.password
    //         })
    //         await result.save()
    //         res.redirect('/')

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    static userinsert = async (req, res) => {
        //console.log(req.files.image)
        const imagefile = req.files.image
        const imageupload = await cloudinary.uploader.upload(imagefile.tempFilePath, {
            folder: 'profileimage'
        })
        // console.log(imageupload)
        const { name, email, password, confirm_password } = req.body
        const user = await UserModal.findOne({ email: email })
        //     console.log(user)
        if (user) {
            req.flash('error', 'Email already exist')
            res.redirect('/registration')
        }
        else {
            if (name && email && password && confirm_password) {
                if (password == confirm_password) {
                    try {
                        const hashpassword = await bcrypt.hash(password, 10)
                        // console.log(req.body)
                        const result = new UserModal({
                            name: name,
                            email: email,
                            password: hashpassword,
                            image: {
                                public_id: imageupload.public_id,
                                url: imageupload.secure_url
                            }

                        })
                        await result.save()
                        res.redirect('/')
                    }
                    catch (error) {
                        console.log(error)
                    }
                }
                else {
                    req.flash('error', 'Password and confirm password does not match')
                    res.redirect('/registration')
                }
            }
            else {
                req.flash('error', 'all field are required')
                res.redirect('/registration')
            }
        }



    }
    static verifylogin = async (req, res) => {
        try {
            // console.log(req.body)
            const { email, password } = req.body
            if (email && password) {
                const user = await UserModal.findOne({ email: email })
                if (user != null) {
                    const ismatched = await bcrypt.compare(password, user.password)
                    if (ismatched) {
                        if (user.role == 'user') {
                            //generate token
                            const token = jwt.sign({ id: user._id }, 'ayushisharma123')
                            //    console.log(token)
                            res.cookie('token', token)
                            res.redirect('/dashboard')
                        }
                        if (user.role == 'admin') {
                            //generate token
                            const token = jwt.sign({ id: user._id }, 'ayushisharma123')
                            //    console.log(token)
                            res.cookie('token', token)
                            res.redirect('/admin/display')
                        }

                    } else {
                        req.flash('error', 'Email and password is not valid')
                        res.redirect('/')

                    }

                } else {
                    req.flash('error', 'you are not a registered user')
                    res.redirect('/')

                }

            } else {
                req.flash('error', 'All field are required')
                res.redirect('/')
            }
        }
        catch (error) {
            console.log(error)

        }
    }

    static logout = async (req, res) => {
        try {
            res.clearCookie('token')
            res.redirect('/')
        }
        catch (error) {
            console.log(error)

        }
    }




    static profile = async (req, res) => {
        try {
            const { name, image, _id, email } = req.user
            res.render('profile', { n: name, i: image, e: email, message: req.flash('error'), message2: req.flash('success') })

        } catch (error) {
            console.log(error)

        }
    }

    static changepassword = async (req, res) => {
        try {
            const { name, image, _id, email } = req.user
            const { oldpassword, newpassword, cpassword } = req.body
            if (oldpassword && newpassword && cpassword) {
                const user = await UserModal.findById(_id)
                const ismatch = await bcrypt.compare(oldpassword, user.password)
                if (!ismatch) {
                    req.flash('error', 'Old Password is not match')
                    res.redirect('/profile')
                } else {
                    if (newpassword !== cpassword) {
                        req.flash('error', 'Password and confirm password does not match')
                        res.redirect('/profile')
                    } else {
                        const newHashPassword = await bcrypt.hash(newpassword, 10)
                        await UserModal.findByIdAndUpdate(_id, {
                            $set: { password: newHashPassword },
                        });
                        req.flash('success', 'Password changed successfully')
                        res.redirect('/profile')

                    }
                }

            } else {
                req.flash('error', 'all field are required')
                res.redirect('/profile')
            }

            // console.log(req.body)
        }
        catch (error) {
            console.log(error)

        }
    }

    // static updateprofile = async (req, res) => {
    //     try {
    //         const { name, image, _id, email } = req.user
    //         console.log(req.files.image)
    //     }
    //     catch (error) {
    //         console.log(error)

    //     }
    // }

    static updateprofile = async (req, res) => {
        try {
            //console.log(req.files.image)
            if (req.files) {
                const user = await UserModal.findById(req.user.id);
                const image_id = user.image.public_id;
                await cloudinary.uploader.destroy(image_id);

                const file = req.files.image;
                const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: "studentimage",

                });
                var data = {
                    name: req.body.name,
                    email: req.body.email,
                    image: {
                        public_id: myimage.public_id,
                        url: myimage.secure_url,
                    },
                };
            } else {
                var data = {
                    name: req.body.name,
                    email: req.body.email,

                }
            }
            const updateprofile = await UserModal.findByIdAndUpdate(req.user.id, data)
            res.redirect('/profile')
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = FrontController