const express = require('express')
const route = express.Router()
const FrontController=require('../Controllers/frontcontroller')
const Coursecontroller = require('../Controllers/Coursecontroller')
// const route=express.Router()
const CheckUserAuth=require('../Middleware/auth')
const AdminController = require('../Controllers/Admin/AdminController')


// router
//frontcontroller
route.get('/',FrontController.login)
route.get('/registration',FrontController.registration)
route.get('/dashboard',CheckUserAuth,FrontController.dashboard)
route.get('/about',CheckUserAuth,FrontController.about)
route.get('/contact',CheckUserAuth,FrontController.contact)
route.get('/home',CheckUserAuth,FrontController.home)
route.post('/verifylogin',FrontController.verifylogin)
route.get('/logout',FrontController.logout)
route.get('/profile',CheckUserAuth,FrontController.profile)
route.post('/changepassword',CheckUserAuth,FrontController.changepassword)
route.post('/updateprofile',CheckUserAuth,FrontController.updateprofile)

//route
route.post('/userinsert',FrontController.userinsert)

//coursecontroller
route.post('/courseinsert',CheckUserAuth,Coursecontroller.courseinsert)
route.get('/coursedisplay',CheckUserAuth,Coursecontroller.display)
route.get('/view/:id',CheckUserAuth,Coursecontroller.view)
route.get('/edit/:id',CheckUserAuth,Coursecontroller.edit)
route.post('/courseupdate/:id',CheckUserAuth,Coursecontroller.update)
route.get('/delete/:id',CheckUserAuth,Coursecontroller.delete)


//ADMIN CONTROLLER
route.get('/admin/display',CheckUserAuth,AdminController.display)
route.get('/admin/course/view/:id',CheckUserAuth,AdminController.courseview)
route.get('/admin/course/delete/:id',CheckUserAuth,AdminController.coursedelete)
route.post('/updatestatus/:id',CheckUserAuth,AdminController.updatestatus)
module.exports= route