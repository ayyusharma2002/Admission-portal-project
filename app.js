const express = require('express')
const app = express()
const port = 3000
const web=require('./routes/web')
const connectdb=require('./DB/connectdb')
const fileUpload= require("express-fileupload");

//temp file uploader
app.use(fileUpload({useTempFiles: true}));

app.use(express.urlencoded({ extended: true }));
//connect DB
connectdb()

// connect flash and session
const session = require('express-session')
const flash = require('connect-flash')

//cookies
const cookieParser = require('cookie-parser')
app.use(cookieParser())

//messages
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  }));
//Flash messages
app.use(flash());
//for static file
app.use(express.static('public'))

//ejs set (html)
app.set('view engine', 'ejs')

//router load
app.use('/',web)

//server start
app.listen(port, () => {
  console.log(`Server start on port localhost: ${port}`)
  //template string format to write
})

