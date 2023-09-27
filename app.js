const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const school = require('./models/school')
const student = require('./models/student')
const admin = require('./models/admin')
// const multer = require('multer')
// const {storage} = require('./cloudinary')
// const upload = multer({storage})
// const {cloudinary} = require('./cloudinary')
// const passport = require('passport')
// const localStrategy = require('passport-local')
// const user = require('./models/user')
// const session = require('express-session')
// const flash = require('connect-flash')

mongoose.connect('mongodb://localhost:27017/analysissignup', {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=> {
    console.log('mongo connection open!')
})
.catch(err =>{
    console.log('mongo connection error!')
    console.log(err)
})

app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static( "public" ) )
app.use(express.static('images'))
// app.use(session({sessionConfig}))
// app.use(flash())
// app.use(passport.initialize())
// app.use(passport.session())
// passport.use(new localStrategy(user.authenticate()))
// passport.serializeUser(user.serializeUser())
// passport.deserializeUser(user.deserializeUser())

// app.use((req,res,next)=>{
//     res.locals.currentUser = req.user
//     res.locals.success = req.flash('success')
//     res.locals.error = req.flash('error')
//     next()
// })

//home page
app.get('/studentportal', (req,res)=>{
    res.render('home')
})

// app.get('/studentportal/school', async(req,res)=>{
//     const schools = await school.find({})
//     res.render('school/index', {schools})
// })

//reggistering new school
app.get('/studentportal/school/new', (req,res)=>{
    res.render('elements/school/new')
})

app.post('/studentportal/school', async(req,res)=>{
    const newSchool = new school(req.body)
    await newSchool.save()
    res.redirect('/studentportal')
})

//login school
app.get('/studentportal/school/login', (req,res)=>{
    res.render('elements/school/login')
})

app.post('/studentportal/school/login', async(req,res)=>{
    const user = await school.findOne({schoolid: req.body.schoolid})
    const id = user._id.valueOf()
    if(req.body.password == user.password)
    return res.redirect(`/studentportal/school/${id}`)
    else
    return res.redirect('/studentportal/school/login')
})

//showing school details
app.get('/studentportal/school/:id', async(req,res)=>{
    const {id} = req.params
    const foundSchool = await school.findById(id)
    res.render('elements/school/show', {foundSchool})
})


app.get('/studentportal/school/:id/edit', async(req,res)=>{
    const {id} = req.params
    const foundSchool = await school.findById(id)
    res.render('elements/school/edit', {foundSchool})
})

app.put('/studentportal/school/:id', async(req,res)=>{
    const updatedSchool=await  school.findOneAndUpdate({_id:req.params.id},{$set:{name:req.body.name
        }},{new:true})
    res.redirect('/school')
})

//showing all students
app.get('/studentportal/school/:id/student', async(req,res)=>{
    const {id} = req.params
    const foundSchool = await school.findById(id)
    const schoolid = foundSchool.schoolid
    const students = await student.find({schoolid})
    res.render('elements/student/index', {foundSchool,students})
})

//adding new student
app.get('/studentportal/school/:id/student/new', async(req,res)=>{
    const {id} = req.params
    const foundSchool = await school.findById(id)
    res.render('elements/student/new', {foundSchool})
})

app.post('/studentportal/school/:id/student', async(req,res)=>{
    const newStudent = new student(req.body)
    const {id} = req.params
    const foundSchool = await school.findById(id)
    newStudent.schoolid = foundSchool.schoolid
    const idd = foundSchool._id.valueOf()
    await newStudent.save()
    res.redirect(`/studentportal/school/${idd}/student`)
})

app.get('/studentportal/school/:id/student/:idd/edit', async(req,res)=>{
    const {idd} = req.params
    const foundStudent = await student.findById(idd)
    const {id} = req.params
    const foundSchool = await school.findById(id)
    res.render('elements/student/edit', {foundStudent, foundSchool})
})

app.put('/studentportal/school/:id/student/:idd',async(req,res)=>{
    const {idd} = req.params
    const {id} = req.params
    const foundSchool = await school.findById(id)
    const schoolid = foundSchool._id.valueOf()
    const updatedStudent = await student.findByIdAndUpdate(idd, {...req.body})
    res.redirect(`/studentportal/school/${schoolid}/student`)
})

//admin login
app.get('/studentportal/admin/login', (req,res)=>{
    res.render('elements/admin/login')
})

app.post('/studentportal/admin/login', async(req,res)=>{
    const adminLogin =  await admin.findOne({'username':req.body['username']},'password').exec();
    if(adminLogin.password == req.body.password)
    return res.redirect('/studentportal/admin')
    else
    return res.redirect('/studentportal/admin/login')
})

//admin page
app.get('/studentportal/admin', async(req,res)=>{
    const schools = await school.find({})
    res.render('elements/admin/index', {schools})
})



app.listen(3000, ()=>{
    console.log('Serving on port 3000')
})